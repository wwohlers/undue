import { cancelScheduledNotificationAsync } from "expo-notifications";
import { useCallback } from "react";
import { useReminders } from "./useReminders";

export function useRemoveReminder() {
  const [reminders, setReminders] = useReminders();
  return useCallback(
    async (id: number) => {
      const reminder = reminders.find(r => r.id === id);
      if (!reminder) return;
      await cancelScheduledNotificationAsync(reminder?.notificationId);
      const newReminders = reminders.filter((d) => d.id !== id);
      setReminders(newReminders);
      return newReminders.length < reminders.length;
    },
    [reminders, setReminders]
  );
}
