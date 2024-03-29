import {DateTime} from "luxon";
import {Item} from "../../data/items/Item.type";

/**
 * Calendars in this app are based on weeks. A week index, which can be negative,
 * represents the week of a calendar's state relative to this week. In other
 * words, this week has an index of 0, next week 1, and last week -1.
 */

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

export function getWeekIndexOfDateTime(dt: DateTime): number {
  const absDiff = Math.abs(
    Math.floor(DateTime.now().diff(dt.startOf("week"), "week").weeks)
  );
  return dt >= DateTime.now() ? absDiff : 0 - absDiff;
}

export function getWeekIndexOfMonthYear(monthYear: [number, number]) {
  const dt = DateTime.fromObject({
    year: monthYear[1],
    month: monthYear[0],
  });
  return getWeekIndexOfDateTime(dt);
}

export function isInWeek(dt: DateTime, weekStart: DateTime) {
  return dt >= weekStart && dt < weekStart.endOf("week");
}

const MS_IN_DAY = 24 * 60 * 60 * 1000;

export function getDayFactorOfDateTime(dt: DateTime) {
  return (dt.toMillis() - dt.startOf("day").toMillis()) / MS_IN_DAY;
}

export function getDateTimeOfDayFactor(
  dayFactor: number,
  dt: DateTime
): DateTime {
  return dt.startOf("day").plus({ milliseconds: dayFactor * MS_IN_DAY });
}

/**
 * Returns a map of heights (px) to lines, where a line consists of
 * items that are at the exact same time. Lines must be separated
 * by at least the given lineHeight, but are otherwise positioned
 * proportionally to their time in the day.
 * @param items items on the day
 */
export function buildDayViewList(
  items: Item[],
  totalHeight: number,
  lineHeight: number
): Record<number, Item[]> {
  if (items.length === 0) return [];
  const sortedItems = items.sort((a, b) => {
    const aDate = new Date(a.datetime);
    const bDate = new Date(b.datetime);
    return aDate < bDate ? -1 : 1;
  });
  const lines: Item[][] = [];
  let currentStartTime;
  for (const item of sortedItems) {
    if (item.datetime === currentStartTime) {
      lines[lines.length - 1].push(item);
    } else {
      lines.push([item]);
    }
  }
  const res: Record<number, Item[]> = {};
  let lastPos = 0 - lineHeight;
  for (const line of lines) {
    const dt = DateTime.fromISO(line[0].datetime);
    let pos = Math.round(totalHeight * getDayFactorOfDateTime(dt));
    if (pos - lineHeight <= lastPos) {
      pos = lastPos + lineHeight;
    }
    res[pos] = line;
    lastPos = pos;
  }
  return res;
}
