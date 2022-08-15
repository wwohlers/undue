import { useReminders } from "./useReminders";
import { useCallback } from "react";
import { CreateableReminder, Reminder } from "./Reminder.type";
import { Entry } from "../entries/Entry.type";
import { DateTime } from "luxon";
import { scheduleReminderNotification } from "./scheduleReminderNotification";

export function useCreateReminders() {
  const [reminders, setReminders] = useReminders();

  return useCallback(
    async (entries: Entry[], createableReminders: CreateableReminder[]) => {
      // createableReminders are the reminders for the first entry in entries;
      // all other entries will have the same reminders, but adjusted based on their time
      const firstId = 1 + Math.max(...reminders.map((d) => d.id));
      const newReminders = await Promise.all(
        entries
          .map((entry, entryI) => {
            const adjustDuration = DateTime.fromISO(entry.datetime).diff(
              DateTime.fromISO(entries[0].datetime)
            );
            return createableReminders.map(
              async (reminder, reminderI): Promise<Reminder> => {
                const id =
                  firstId + entryI * createableReminders.length + reminderI;
                const adjustedDateTime = DateTime.fromISO(
                  reminder.datetime
                ).plus(adjustDuration);
                const notificationId = await scheduleReminderNotification(
                  adjustedDateTime.toISO(),
                  entry
                );
                return {
                  id,
                  entryId: entry.id,
                  datetime: adjustedDateTime.toISO(),
                  notificationId,
                };
              }
            );
          })
          .flat(1)
      );
      setReminders([...reminders, ...newReminders]);
    },
    [reminders, setReminders]
  );
}
