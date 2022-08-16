import { useItems } from "../useItems";
import { useCallback } from "react";
import { DateTime } from "luxon";
import { useYesOrNo } from "../../../hooks/alerts/useYesOrNo";
import { sameMaster } from "../helpers/sameMaster";
import {
  createNotifications,
  NotificationCreatable,
} from "../helpers/notifications";
import { modifyItem } from "../helpers/modifyItem";

export function useCreateReminder() {
  const [items, setItems] = useItems();
  const yesNo = useYesOrNo();

  return useCallback(
    async (itemId: number, datetime: DateTime) => {
      const item = items.find((item) => item.id === itemId);
      if (!item) return;
      const addForRepeats =
        item.repeatData.repeats &&
        (await yesNo(
          "Add reminder for all repeats?",
          `Do you want to also add a corresponding reminder for all repeated ${item.type}s?`
        ));
      const dt = DateTime.fromISO(item.datetime);
      const reminderDiff = dt.diff(datetime);
      const itemsToModify = [
        item,
        ...items.filter(
          (i) => sameMaster(i, item) && DateTime.fromISO(i.datetime) > dt
        ),
      ];
      const creatableNotifications: NotificationCreatable[] = itemsToModify.map(
        (i) => ({
          datetime: DateTime.fromISO(i.datetime).minus(reminderDiff),
          title: i.metadata.title,
          itemDt: DateTime.fromISO(i.datetime),
          itemId: i.id,
        })
      );
      const notificationIds = await createNotifications(creatableNotifications);
      const modifiedItems = itemsToModify.map((_item, i) => {
        return modifyItem(_item, {
          reminders: [
            ..._item.reminders,
            {
              datetime: DateTime.fromISO(_item.datetime)
                .minus(reminderDiff)
                .toISO(),
              systemNotificationId: notificationIds[i],
            },
          ],
        });
      });
      setItems(
        items.map((i) => {
          return modifiedItems.find((_i) => _i.id === i.id) ?? i;
        })
      );
    },
    [items, setItems]
  );
}
