import { useCallback } from "react";
import { CreatableReminder, Reminder } from "../Reminder.type";
import { useReminders } from "../useReminders";

export function useCreateReminders() {
  const [reminders, setReminders] = useReminders();
  return useCallback(
    async (remindersToAdd: CreatableReminder[]) => {
      const maxId = Math.max(...reminders.map((reminder) => reminder.id), 1);
      const fulfilled = await Promise.all<Reminder>(
        remindersToAdd.map(async (reminder, i) => ({
          ...reminder,
          id: maxId + 1 + i,
          notificationId: "",
        }))
      );
      setReminders([...reminders, ...fulfilled]);
    },
    [reminders, setReminders]
  );
}
