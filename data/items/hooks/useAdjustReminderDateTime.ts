import { useItems } from "../useItems";
import { useCallback } from "react";
import { DateTime } from "luxon";
import {
  cancelNotifications,
  createNotifications,
} from "../helpers/notifications";
import { ItemReminder } from "../types/ItemReminder.type";
import { modifyItem } from "../helpers/modifyItem";

export function useAdjustReminderDateTime() {
  const [items, setItems] = useItems();
  return useCallback(
    async (itemId: number, reminderIndex: number, newDateTime: DateTime) => {
      const item = items.find((item) => item.id === itemId);
      if (!item) return;
      if (item.reminders.length <= reminderIndex) return;
      const newReminders = await Promise.all<ItemReminder>(
        item.reminders.map(async (reminder, index) => {
          if (index !== reminderIndex) return reminder;
          await cancelNotifications([reminder.systemNotificationId]);
          const [newId] = await createNotifications([
            {
              datetime: newDateTime,
              title: item.metadata.title,
              itemDt: DateTime.fromISO(item.datetime),
              itemId: item.id,
            },
          ]);
          return {
            datetime: newDateTime.toISO(),
            systemNotificationId: newId,
          } as ItemReminder;
        })
      );
      setItems(
        items.map((item) => {
          if (item.id !== itemId) return item;
          return modifyItem(item, {
            reminders: newReminders,
          });
        })
      );
    },
    [items, setItems]
  );
}
