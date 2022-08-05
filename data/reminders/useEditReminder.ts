import { cancelScheduledNotificationAsync, scheduleNotificationAsync } from "expo-notifications";
import { useCallback } from "react";
import { useEntries } from "../deadlines/useEntries";
import { Reminder } from "./Reminder.type";
import { useReminders } from "./useReminders";

export function useEditReminder() {
  const [reminders, setReminders] = useReminders();
  const [entries] = useEntries();
  return useCallback(
    async (id: number, partial: Partial<Reminder>) => {
      let modified = false;
      const reminder = { ...reminders.find(r => r.id === id) } as Reminder;
      if (!reminder) return;
      let notificationId = reminder.notificationId;
      if (partial.datetime || partial.entryId) {
        await cancelScheduledNotificationAsync(notificationId);
        const entry = entries.find(d => d.id === reminder.entryId);
        if (!entry) return;
        notificationId = await scheduleNotificationAsync({
          content: {
            title: entry.title,
            body: entry.description,
          },
          trigger: new Date(partial.datetime ?? reminder.datetime),
        });
      }
      const newReminders = reminders.map((d) => {
        if (d.id === id) {
          modified = true;
          return {
            ...d,
            ...partial,
            notificationId,
          };
        }
        return d;
      });
      setReminders(newReminders);
      return modified;
    },
    [reminders, setReminders]
  );
}
