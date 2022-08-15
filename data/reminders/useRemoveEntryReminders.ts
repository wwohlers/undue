import { useCallback } from "react";
import { useReminders } from "./useReminders";
import { cancelScheduledNotificationAsync } from "expo-notifications";

export function useRemoveEntryReminders() {
  const [reminders, setReminders] = useReminders();

  return useCallback(
    (entryId: number) => {
      const removeNotificationPromises: Promise<void>[] = [];
      const newReminders = reminders.filter((reminder) => {
        if (reminder.entryId === entryId) {
          removeNotificationPromises.push(
            cancelScheduledNotificationAsync(reminder.notificationId)
          );
          return false;
        }
        return true;
      });
      setReminders(newReminders);
      Promise.all(removeNotificationPromises);
    },
    [reminders, setReminders]
  );
}
