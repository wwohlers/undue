import { capitalize } from "../../../util/text";
import { relativeFormat } from "../../../util/time/relativeFormat";
import { absoluteFormat } from "../../../util/time/absoluteFormat";
import {
  cancelScheduledNotificationAsync,
  scheduleNotificationAsync,
} from "expo-notifications";
import { CreatableReminder, Reminder } from "../Reminder.type";
import { DateTime } from "luxon";

export async function createNotification(
  reminder: CreatableReminder
): Promise<string> {
  const remDt = DateTime.fromISO(reminder.datetime);
  const itemDt = DateTime.fromISO(reminder.itemDateTime);
  const body = capitalize(
    `${relativeFormat(itemDt, false, remDt)} (${absoluteFormat(itemDt, remDt)})`
  );
  if (remDt <= DateTime.now()) {
    return "";
  }
  return scheduleNotificationAsync({
    content: {
      title: reminder.itemTitle,
      body,
      data: {
        itemId: reminder.itemId,
      },
    },
    trigger: remDt.toMillis(),
  });
}

export async function cancelNotification(reminder: Reminder): Promise<void> {
  if (reminder.notificationId === "") return;
  return cancelScheduledNotificationAsync(reminder.notificationId);
}
