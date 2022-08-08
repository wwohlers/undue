import { useCallback } from "react";
import { useEntries } from "../entries/useEntries";
import { CreateableReminder } from "./Reminder.type";
import { scheduleReminderNotification } from "./scheduleReminderNotification";
import { useReminders } from "./useReminders";

export function useCreateReminder() {
  const [reminders, setReminders] = useReminders();
  const [entries] = useEntries();

  return useCallback(
    async (reminder: CreateableReminder) => {
      const entry = entries.find((d) => d.id === reminder.entryId);
      if (!entry) return;
      const notificationId = await scheduleReminderNotification(
        reminder,
        entry
      );
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
