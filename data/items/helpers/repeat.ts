import { DateTime, DateTimeUnit } from "luxon";
import { capitalize } from "../../../util/text";

export type RepeatSchedule = {
  endDate: string; // ISO 8601
} & (
  | {
      readonly interval: "daily" | "monthly" | "yearly";
    }
  | {
      readonly interval: "weekly";
      readonly days: number[];
    }
);

export function getRepeatDates(
  date: DateTime,
  repeat: RepeatSchedule
): DateTime[] {
  switch (repeat.interval) {
    case "daily":
      return getUnitRepeatDates(date, DateTime.fromISO(repeat.endDate), "day");
    case "weekly":
      return getWeeklyRepeatDates(
        date,
        DateTime.fromISO(repeat.endDate),
        repeat.days
      );
    case "monthly":
      return getUnitRepeatDates(
        date,
        DateTime.fromISO(repeat.endDate),
        "month"
      );
    case "yearly":
      return getUnitRepeatDates(date, DateTime.fromISO(repeat.endDate), "year");
  }
}

function getUnitRepeatDates(
  startDate: DateTime,
  endDate: DateTime,
  unit: DateTimeUnit
): DateTime[] {
  const numDates = Math.floor(endDate.diff(startDate, unit).as(unit));
  return Array.from({ length: numDates }, (_, i) =>
    startDate.plus({ [unit]: i + 1 })
  );
}

function getWeeklyRepeatDates(
  startDate: DateTime,
  endDate: DateTime,
  days: number[]
): DateTime[] {
  const startWeek = startDate.startOf("week");
  const endWeek = endDate.endOf("week");
  const numWeeks = Math.ceil(endWeek.diff(startWeek, "week").as("week"));
  const res = [];
  for (let i = 0; i < numWeeks; i++) {
    for (const day of days) {
      const dt = startWeek.plus({ weeks: i, days: day - 1 });
      if (dt >= startDate && dt <= endDate) {
        res.push(dt);
      }
    }
  }
  return res;
}

export function getRepeatText(schedule: RepeatSchedule): string {
  let start;
  if (schedule.interval === "weekly") {
    start = `Every ${schedule.days.join(", ")}`;
  } else {
    start = capitalize(schedule.interval);
  }
  return `${start} until ${DateTime.fromISO(schedule.endDate).toFormat(
    "DDDD"
  )}`;
}
