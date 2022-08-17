import { useCallback } from "react";
import { DateTime, Duration } from "luxon";
import {
  cancelNotification,
  createNotification,
} from "../helpers/notifications";
import { useReminders } from "../useReminders";

export function useMoveReminder() {
  const moveReminders = useMoveReminders();
  const [reminders] = useReminders();

  return useCallback(
    (id: number, newDt: DateTime) => {
      const reminder = reminders.find((reminder) => reminder.id === id);
      if (!reminder) return;
      const diff = newDt.diff(DateTime.fromISO(reminder.datetime));
      moveReminders([id], diff);
    },
    [reminders, moveReminders]
  );
}

export function useMoveReminders() {
  const [reminders, setReminders] = useReminders();
  return useCallback(
    async (ids: number[], diff: Duration) => {
      const newReminders = await Promise.all(
        reminders.map(async (reminder) => {
          if (!ids.includes(reminder.id)) return reminder;
          await cancelNotification(reminder);
          const newDt = DateTime.fromISO(reminder.datetime).plus(diff);
          const notificationId = await createNotification({
            ...reminder,
            datetime: newDt.toISO(),
          });
          return {
            ...reminder,
            datetime: newDt.toISO(),
            notificationId,
          };
        })
      );
      setReminders(newReminders);
    },
    [reminders, setReminders]
  );
}
