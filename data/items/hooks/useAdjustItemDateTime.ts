import { useItems } from "../useItems";
import { useCallback } from "react";
import { useYesOrNo } from "../../../hooks/alerts/useYesOrNo";
import { DateTime } from "luxon";
import {
  cancelNotifications,
  createNotifications,
} from "../helpers/notifications";
import { Item } from "../types/Item.type";
import { modifyItem } from "../helpers/modifyItem";
import { sameMaster } from "../helpers/sameMaster";

export function useAdjustItemDateTime() {
  const [items, setItems] = useItems();
  const yesNo = useYesOrNo();

  return useCallback(
    async (itemId: number, newDateTime: DateTime) => {
      const item = items.find((item) => item.id === itemId);
      if (!item) {
        return;
      }
      const adjustReminders =
        item.reminders.length &&
        (await yesNo(
          "Adjust reminders?",
          `Do you want to adjust the reminders for this ${item.type}? If you select "No", the ${item.type}'s date and time will still be changed, but reminders will stay put.`
        ));
      const itemsToAdjust = [item];
      const dt = DateTime.fromISO(item.datetime);
      if (
        item.repeatData.repeats &&
        (await yesNo(
          `Also adjust repeated ${item.type}s?`,
          `This ${item.type} is repeated. Do you want to also adjust all of the repeated ${item.type}s?`
        ))
      ) {
        itemsToAdjust.push(
          ...items.filter(
            (i) => sameMaster(i, item) && DateTime.fromISO(i.datetime) > dt
          )
        );
      }
      const adjustDur = newDateTime.diff(dt);
      const newItems = await Promise.all<Item>(
        itemsToAdjust.map(async (item) => {
          const newDt = DateTime.fromISO(item.datetime).plus(adjustDur);
          if (adjustReminders) {
            const toCancel = item.reminders.map(
              (reminder) => reminder.systemNotificationId
            );
            await cancelNotifications(toCancel);
            const notificationIds = await createNotifications(
              item.reminders.map((reminder) => ({
                datetime: DateTime.fromISO(reminder.datetime).plus(adjustDur),
                title: item.metadata.title,
                itemDt: newDt,
                itemId: item.id,
              }))
            );
            return modifyItem(item, {
              datetime: newDt.toISO(),
              reminders: item.reminders.map((reminder, i) => ({
                datetime: DateTime.fromISO(reminder.datetime)
                  .plus(adjustDur)
                  .toISO(),
                systemNotificationId: notificationIds[i],
              })),
            });
          }
          return modifyItem(item, {
            datetime: newDt.toISO(),
          });
        })
      );
      setItems(
        items.map((item) => {
          const newItem = newItems.find((newItem) => newItem.id === item.id);
          return newItem ?? item;
        })
      );
    },
    [items, setItems]
  );
}
