import { DateTime, DateTimeUnit } from "luxon";

export type RepeatSchedule = {
  endDate: DateTime;
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
      return getUnitRepeatDates(date, repeat.endDate, "day");
    case "weekly":
      return getWeeklyRepeatDates(date, repeat.endDate, repeat.days);
    case "monthly":
      return getUnitRepeatDates(date, repeat.endDate, "month");
    case "yearly":
      return getUnitRepeatDates(date, repeat.endDate, "year");
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
      const dt = startWeek.plus({ weeks: i, days: day });
      if (dt >= startDate && dt <= endDate) {
        res.push(dt);
      }
    }
  }
  return res;
}
