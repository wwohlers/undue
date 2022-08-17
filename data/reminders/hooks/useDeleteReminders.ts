import { useCallback } from "react";
import { cancelNotification } from "../helpers/notifications";
import { useReminders } from "../useReminders";

export function useDeleteReminders() {
  const [reminders, setReminders] = useReminders();
  return useCallback(
    async (ids: number[]) => {
      await Promise.all(
        reminders.map(async (reminder) => {
          if (ids.includes(reminder.id)) {
            await cancelNotification(reminder);
          }
        })
      );
      setReminders(reminders.filter((r) => !ids.includes(r.id)));
    },
    [reminders, setReminders]
  );
}
