import { DateTime } from "luxon";
import { Priority } from "../Priority.type";
import { CreateableReminder } from "../reminders/Reminder.type";
import { Entry } from "./Entry.type";

const HOUR = 1000 * 3600;
const DAY = HOUR * 24;

export function getDefaultReminders(entry: Entry): CreateableReminder[] {
  const datetimes =
    entry.type === "deadline"
      ? deadlineReminderDateTimes(
          DateTime.fromISO(entry.datetime),
          entry.priority
        )
      : eventReminderDateTimes(DateTime.fromISO(entry.datetime));
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

function deadlineReminderDateTimes(
  deadlineDateTime: DateTime,
  priority: Priority
): DateTime[] {
  const diff = deadlineDateTime.toMillis() - Date.now();
  const res = [deadlineDateTime.minus({ minute: 15 })];
  if (diff >= HOUR) {
    if (priority !== Priority.LOW) {
      res.push(deadlineDateTime.minus({ hour: 1 }));
    }
    if (priority === Priority.HIGH) {
      res.push(deadlineDateTime.minus({ hour: 3 }));
    }
  }
  if (diff >= DAY) {
    res.push(deadlineDateTime.minus({ day: 1 }));
    if (priority === Priority.HIGH) {
      res.push(deadlineDateTime.minus({ day: 3 }));
    }
  }
  if (diff >= DAY * 7) {
    res.push(deadlineDateTime.minus({ day: 7 }));
    if (priority === Priority.HIGH) {
      res.push(deadlineDateTime.minus({ day: 14 }));
    }
  }
  return res;
}

function eventReminderDateTimes(eventDateTime: DateTime): DateTime[] {
  return [
    eventDateTime.minus({ hour: 1 }),
    eventDateTime.minus({ day: 1 }),
    eventDateTime.minus({ week: 1 }),
  ];
}
