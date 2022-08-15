import { DateTime } from "luxon";
import { CreateableReminder } from "../reminders/Reminder.type";
import { Entry } from "./Entry.type";

export function getDefaultReminders(entry: Entry): CreateableReminder[] {
  const dt = DateTime.fromISO(entry.datetime);
  const datetimes = [
    dt.minus({ minutes: 15 }),
    dt.hour > 9
      ? dt.set({ hour: 9 }).startOf("hour")
      : dt.minus({ day: 1 }).set({ hour: 21 }).startOf("hour"),
  ];
  return datetimes
    .concat([DateTime.fromISO(entry.datetime)])
    .filter((dt) => {
      return dt > DateTime.now();
    })
    .map((dt) => ({
      entryId: entry.id,
      datetime: dt.toISO(),
    }));
}
