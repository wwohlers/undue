import {DateTime, Interval} from "luxon";
import {Entry} from "../../data/entries/Entry.type";

/**
 * To help users easily set a date between a range, we offer a slider that can
 * modify a date range factor, which is just a value in the range [0, 1] that
 * proportionally relates a DateTime to how far along it is between two
 * given dates.
 *
 * For example, let's say we have a date range between 12AM Sunday and 12AM Tuesday.
 * In this case, a date range factor of 0 would represent 12AM Sunday;
 *               a date range factor of 0.5 would represent 12AM Monday;
 *               a date range factor of 1 would represent 12AM Tuesday.
 *
 * The functions below are used to convert both ways.
 */

export function getDateRangeFactor(interval: Interval, dt: DateTime): number {
  if (!interval.isValid) {
    console.error("Invalid interval", interval, interval.invalidExplanation);
    return 0;
  }
  const len = interval.length("millisecond");
  const dist = dt.toMillis() - interval.start.toMillis();
  if (dist < 0 || dist > len || len === 0) {
    console.error("Invalid inputs", interval, dt, len, dist);
    return 0;
  }
  return dist / len;
}

export function getDateFromFactor(
  interval: Interval,
  factor: number
): DateTime {
  if (!interval.isValid) {
    console.error("Invalid interval", interval, interval.invalidExplanation);
    return interval.start;
  }
  if (factor < 0 || factor > 1) {
    console.error("Invalid factor", factor);
    return interval.start;
  }
  const len = interval.length("millisecond");
  const dist = len * factor;
  const fiveMins = 5 * 60 * 1000;
  const resultMs = interval.start.toMillis() + dist;
  return DateTime.fromMillis(fiveMins * Math.round(resultMs / fiveMins));
}

export function getInterval(entry: Entry): Interval {
  const start = DateTime.now();
  const end = DateTime.fromISO(entry.datetime);
  return Interval.fromDateTimes(start, end);
}
