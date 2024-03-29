import { useCallback } from "react";
import { CreatableReminder, Reminder } from "../Reminder.type";
import { useReminders } from "../useReminders";
import { createNotification } from "../helpers/notifications";
import { DateTime } from "luxon";

export function useCreateReminders() {
  const [reminders, setReminders] = useReminders();
  return useCallback(
    async (remindersToAdd: CreatableReminder[]) => {
      const maxId = Math.max(...reminders.map((reminder) => reminder.id), 1);
      const fulfilled = await Promise.all<Reminder>(
        remindersToAdd
          .filter(
            (reminder) => DateTime.fromISO(reminder.datetime) > DateTime.now()
          )
          .map(async (reminder, i) => ({
            ...reminder,
            id: maxId + 1 + i,
            notificationId: await createNotification(reminder),
          }))
      );
      setReminders((reminders) => [...reminders, ...fulfilled]);
    },
    [reminders, setReminders]
  );
}
