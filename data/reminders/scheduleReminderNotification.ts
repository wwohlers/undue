import { scheduleNotificationAsync } from "expo-notifications";
import { DateTime } from "luxon";
import { capitalize } from "../../util/capitalize";
import { absoluteFormat } from "../../util/time/absoluteFormat";
import { relativeFormat } from "../../util/time/relativeFormat";
import { Entry } from "../entries/Entry.type";
import { CreateableReminder } from "./Reminder.type";

export function scheduleReminderNotification(
  reminder: CreateableReminder,
  entry: Entry
): Promise<string> {
  const entryDt = DateTime.fromISO(entry.datetime);
  const remDt = DateTime.fromISO(reminder.datetime);
  const body = capitalize(
    `${relativeFormat(entryDt, false, remDt)} (${absoluteFormat(
      entryDt,
      remDt
    )})`
  );
  return scheduleNotificationAsync({
    content: {
      title: entry.title,
      body,
    },
    trigger: new Date(reminder.datetime),
  });
}
