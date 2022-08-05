import { scheduleNotificationAsync } from "expo-notifications";
import { useCallback } from "react";
import { useEntries } from "../deadlines/useEntries";
import { CreateableReminder } from "./Reminder.type";
import { useReminders } from "./useReminders";

export function useCreateReminder() {
  const [reminders, setReminders] = useReminders();
  const [entries] = useEntries();

  return useCallback(
    async (reminder: CreateableReminder) => {
      const entry = entries.find((d) => d.id === reminder.entryId);
      if (!entry) return;
      const notificationId = await scheduleNotificationAsync({
        content: {
          title: entry.title,
          body: entry.description,
        },
        trigger: new Date(reminder.datetime),
      });
      const id = 1 + Math.max(...reminders.map((d) => d.id));
      const newReminder = {
        ...reminder,
        id,
        notificationId,
      };
      setReminders([...reminders, newReminder]);
      return newReminder;
    },
    [reminders, setReminders, entries]
  );
}
