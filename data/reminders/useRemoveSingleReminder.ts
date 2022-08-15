import { useReminders } from "./useReminders";
import { useCallback } from "react";
import { cancelScheduledNotificationAsync } from "expo-notifications";

export function useRemoveSingleReminder() {
  const [reminders, setReminders] = useReminders();

  return useCallback(
    (reminderId: number) => {
      const newReminders = reminders.filter((reminder) => {
        if (reminder.id === reminderId) {
          cancelScheduledNotificationAsync(reminder.notificationId);
          return false;
        }
        return true;
      });
      setReminders(newReminders);
    },
    [reminders, setReminders]
  );
}
