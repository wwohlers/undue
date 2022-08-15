import { useCallback } from "react";
import { getDefaultReminders } from "../entries/defaultReminders";
import { Entry } from "../entries/Entry.type";
import { Reminder } from "./Reminder.type";
import { scheduleReminderNotification } from "./scheduleReminderNotification";
import { useReminders } from "./useReminders";

export function useCreateDefaultReminders() {
  const [reminders, setReminders] = useReminders();

  return useCallback(
    async (entry: Entry) => {
      const defaultReminders = getDefaultReminders(entry);
      const firstId = 1 + Math.max(...reminders.map((d) => d.id));
      const newReminders = await Promise.all<Reminder>(
        defaultReminders.map(async (reminder, i) => {
          const notificationId = await scheduleReminderNotification(
            reminder.datetime,
            entry
          );
          return {
            ...reminder,
            id: firstId + i,
            notificationId,
          };
        })
      );
      setReminders([...reminders, ...newReminders]);
    },
    [reminders, setReminders]
  );
}
