import { DateTime } from "luxon";
import { Item } from "../data/items/Item.type";

export function getTimeOfDay(time: DateTime) {
  if (time.hour < 12) {
    return "morning";
  } else if (time.hour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

export function getRemainingItemsStr(time: DateTime, dayItems: Item[]): string {
  const numRemainingEvents = dayItems
    .filter((i) => i.type === "event")
    .filter((e) => {
      return DateTime.fromISO(e.datetime) > time;
    }).length;
  const numRemainingEventsStr = `${numRemainingEvents} more ${pluralize(
    "event",
    numRemainingEvents
  )}`;
  const numOverdueDeadlines = dayItems
    .filter((i) => i.type === "deadline")
    .filter((d) => {
      return DateTime.fromISO(d.datetime) < time && !d.completed;
    }).length;
  const numOverdueDeadlinesStr = `${numOverdueDeadlines} overdue ${pluralize(
    "deadline",
    numOverdueDeadlines
  )}`;
  const numRemainingDeadlines = dayItems
    .filter((i) => i.type === "deadline")
    .filter((d) => {
      return DateTime.fromISO(d.datetime) > time && !d.completed;
    }).length;
  const numRemainingDeadlinesStr = `${numRemainingDeadlines} more ${pluralize(
    "deadline",
    numRemainingDeadlines
  )} due`;
  const nums = [numRemainingEvents, numRemainingDeadlines, numOverdueDeadlines];
  const strs = [
    numRemainingEventsStr,
    numRemainingDeadlinesStr,
    numOverdueDeadlinesStr,
  ];
  const numPositives = nums.filter((n) => n > 0).length;
  if (numPositives === 0) {
    return "";
  } else if (numPositives === 1) {
    return "You have " + strs[nums.findIndex((n) => !!n)] + " today.";
  } else if (numPositives === 2) {
    return (
      "You have " + strs.filter((_, i) => !!nums[i]).join(" and ") + " today."
    );
  } else {
    return `You have ${numRemainingEventsStr}, ${numRemainingDeadlinesStr}, and ${numOverdueDeadlinesStr} today.`;
  }
}

function pluralize(unit: string, amt: number) {
  return amt === 1 ? unit : `${unit}s`;
}
