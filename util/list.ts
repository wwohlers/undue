import { Item } from "../data/items/Item.type";
import { DateTime, Interval } from "luxon";

export function intersperseDates(items: Item[]): (string | Item)[] {
  if (items.length === 0) return []; // necessary to avoid out of bounds in for loop

  const nextWeek = [7].includes(DateTime.now().weekday)
    ? DateTime.now().plus({ week: 2 }).startOf("week")
    : DateTime.now().plus({ week: 1 }).startOf("week");

  const latestDate = Math.min(
    Math.max(...items.map((i) => DateTime.fromISO(i.datetime).toMillis())),
    DateTime.now().plus({ year: 1 }).toMillis()
  );

  const intervals: [string, Interval][] = [
    [
      "past",
      Interval.fromDateTimes(DateTime.now().minus({ year: 1 }), DateTime.now()),
    ],
    [
      "today",
      Interval.fromDateTimes(DateTime.now(), DateTime.now().endOf("day")),
    ],
    [
      "tomorrow",
      Interval.fromDateTimes(
        DateTime.now().plus({ day: 1 }).startOf("day"),
        DateTime.now().plus({ day: 1 }).endOf("day")
      ),
    ],
  ];

  let currentDate = DateTime.now().plus({ day: 2 }).startOf("day");
  while (currentDate.toMillis() < latestDate) {
    if (currentDate < nextWeek) {
      intervals.push([
        currentDate.toFormat("cccc"),
        Interval.fromDateTimes(
          currentDate.startOf("day"),
          currentDate.endOf("day")
        ),
      ]);
      currentDate = currentDate.plus({ day: 1 });
    } else {
      intervals.push([
        `week of ${currentDate.toFormat("LLLL d")}`,
        Interval.fromDateTimes(
          currentDate.startOf("day"),
          currentDate.endOf("week")
        ),
      ]);
      currentDate = currentDate.plus({ week: 1 });
    }
  }

  const res: (string | Item)[] = [];
  let i = 0;
  for (const [text, interval] of intervals) {
    const firstDate = DateTime.fromISO(items[i].datetime);
    console.log(interval, firstDate);
    if (interval.contains(firstDate)) {
      res.push(text, items[i]);
      i++;
      if (i > items.length - 1) break;
      while (DateTime.fromISO(items[i].datetime) < interval.end) {
        res.push(items[i]);
        i++;
        if (i > items.length - 1) break;
      }
    }
  }
  res.push(...items.slice(i));

  return res;
}
