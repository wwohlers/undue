import { scheduleNotificationAsync } from "expo-notifications";
import { DateTime } from "luxon";
import { capitalize } from "../../util/text";
import { absoluteFormat } from "../../util/time/absoluteFormat";
import { relativeFormat } from "../../util/time/relativeFormat";
import { Entry } from "../entries/Entry.type";

export function scheduleReminderNotification(
  dateTime: string,
  entry: Entry
): Promise<string> {
  const entryDt = DateTime.fromISO(entry.datetime);
  const remDt = DateTime.fromISO(dateTime);
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
      data: {
        entryId: entry.id,
      },
    },
    trigger: new Date(dateTime),
  });
}
