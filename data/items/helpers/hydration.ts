import {Item} from "../types/Item.type";
import {DateTime} from "luxon";
import {ItemRepeatData} from "../types/ItemRepeatData.type";

/**
 * It's impractical and inefficient to create all repeated items at once.
 * Instead, repeated items are created in two phases:
 *
 * 1. First, the base item (from which all items are repeated) is *staked*.
 *     Staking involves creating the first item in each year until the
 *     repetition ends. For example, if an item is set to repeat every
 *     Tuesday, an item will be created on the first Tuesday of 2023, 2024,
 *     etc. The one for this year will be the next Tuesday instead of the
 *     first Tuesday in the year.
 *
 * 2. Next is *hydration*, the process of creating all the repeated items for
 *     a particular year, based on the staked item for that year. When an item
 *     is first set to repeat, only its first three years are hydrated. For example,
 *     if a repeated item is created in 2023, the years 2023, 2024, and 2025 will
 *     be hydrated. 2026 won't be hydrated until 2024, when the useHydrateOnLoad
 *     hook will detect a new year and hydrate all items for the year + 2.
 */

/**
 * Returns staked items until the repetition ends.
 * @param baseItem
 */
export function getStakedItems(baseItem: Item): DateTime[] {
  if (!baseItem.repeatData.repeats) return [];
  const res = [];
  let yearStart = DateTime.fromISO(baseItem.datetime)
    .plus({ years: 1 })
    .startOf("year");
  while (yearStart < DateTime.fromISO(baseItem.repeatData.endDate)) {
    res.push(
      getNextRepetitionDate(
        DateTime.fromISO(baseItem.datetime),
        yearStart,
        baseItem.repeatData
      )
    );
    yearStart = yearStart.plus({ years: 1 });
  }
  return res;
}

/**
 * Gets the dates for all the repeated items for the year of the base item.
 * @param baseItem
 */
export function getHydratedItemsForYear(baseItem: Item): DateTime[] {
  if (!baseItem.repeatData.repeats) return [];
  const res = [];
  const dt = DateTime.fromISO(baseItem.datetime);
  let start = dt;
  while (start < dt.endOf("year")) {
    start = getNextRepetitionDate(dt, start, baseItem.repeatData);
    res.push(start);
  }
  return res;
}

/**
 * Returns the next date of repetition for an item.
 * @param originalDateTime the date time of the original (base) item
 * @param fromDate the date on which to start looking for the next date of repetition (inclusive). MUST be the start of a day
 * @param repeatData
 */
function getNextRepetitionDate(
  originalDateTime: DateTime,
  fromDate: DateTime,
  repeatData: ItemRepeatData
): DateTime {
  if (!repeatData.repeats) return fromDate;
  const sameMinute = fromDate.set({
    hour: originalDateTime.hour,
    minute: originalDateTime.minute,
  });
  switch (repeatData.interval) {
    case "daily":
      return sameMinute;
    case "weekly":
      if (repeatData.days.some((d) => d >= fromDate.weekday)) {
        return sameMinute.set({
          weekday: Math.min(
            ...repeatData.days.filter((d) => d >= fromDate.weekday)
          ),
        });
      } else {
        return sameMinute.plus({ weeks: 1 }).set({
          weekday: Math.min(...repeatData.days),
        });
      }
    case "monthly":
      if (originalDateTime.day >= fromDate.day) {
        return sameMinute.set({
          day: originalDateTime.day,
        });
      } else {
        return sameMinute.plus({ months: 1 }).set({
          day: originalDateTime.day,
        });
      }
    case "yearly":
      if (
        originalDateTime.month >= fromDate.month &&
        originalDateTime.day >= fromDate.day
      ) {
        return sameMinute.set({
          month: originalDateTime.month,
          day: originalDateTime.day,
        });
      } else {
        return sameMinute.plus({ years: 1 }).set({
          month: originalDateTime.month,
          day: originalDateTime.day,
        });
      }
  }
}
