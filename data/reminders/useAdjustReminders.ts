import { useReminders } from "./useReminders";
import { useCallback } from "react";
import { DateTime, Duration } from "luxon";
import { scheduleReminderNotification } from "./scheduleReminderNotification";
import { cancelScheduledNotificationAsync } from "expo-notifications";
import { useEntries } from "../entries/useEntries";

export function useAdjustReminders() {
  const [reminders, setReminders] = useReminders();
  const [entries] = useEntries();

  return useCallback(
    async (ids: number[], adjustDuration: Duration) => {
      const newReminders = await Promise.all(
        reminders.map(async (reminder) => {
          if (ids.includes(reminder.id)) {
            const adjustedDateTime = DateTime.fromISO(reminder.datetime).plus(
              adjustDuration
            );
            await cancelScheduledNotificationAsync(reminder.notificationId);
            const entry = entries.find((d) => d.id === reminder.entryId);
            if (!entry) return reminder;
            const notificationId = await scheduleReminderNotification(
              adjustedDateTime.toISO(),
              entry
            );
            return {
              ...reminder,
              datetime: adjustedDateTime.toISO(),
              notificationId,
            };
          }
          return reminder;
        })
      );
      setReminders(newReminders);
    },
    [reminders, setReminders]
  );
}
