/**
 * Calendars in this app are based on weeks. A week index, which can be negative,
 * represents the week of a calendar's state relative to this week. In other
 * words, this week has an index of 0, next week 1, and last week -1.
 */

import { DateTime } from "luxon";

/**
 * Gets the DateTime at the beginning of the week represented by this index.
 */
export function getDateTimeOfWeekIndex(index: number) {
  return DateTime.now().startOf("week").plus({ weeks: index });
}

/**
 * Gets what month the given week index is in. Because a week can span up
 * to two different months, we choose what month it is at the end of the week.
 */
export function getMonthYearOfWeekIndex(index: number): [number, number] {
  const dt = getDateTimeOfWeekIndex(index);
  const endOfWeek = dt.endOf("week");
  return [endOfWeek.get("month"), endOfWeek.get("year")];
}

export function getWeekIndexOfMonthYear(monthYear: [number, number]) {
  const dt = DateTime.fromObject({
    year: monthYear[1],
    month: monthYear[0],
  }).startOf("week");
  const absDiff = Math.abs(Math.round(DateTime.now().diff(dt, "week").weeks));
  return dt >= DateTime.now() ? absDiff : 0 - absDiff;
}
