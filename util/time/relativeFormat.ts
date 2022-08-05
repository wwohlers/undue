import { DateTime, Duration } from "luxon";

/**
 * Returns a string that represents when a DateTime is relative to now, like "3 hours ago" or "in 5d"
 * @param datetime
 * @param abbreviated whether to abbreviate units (e.g. "month" vs "mo")
 * @returns
 */
export function relativeFormat(datetime: DateTime, abbreviated = false) {
  const diff = datetime.diff(DateTime.now(), [
    "years",
    "months",
    "weeks",
    "days",
    "hours",
    "minutes",
  ]);
  const str = relativeDiffStr(diff, abbreviated);
  if (str === "now") {
    return str;
  } else if (datetime > DateTime.now()) {
    return `in ${str}`;
  } else {
    return `${str} ago`;
  }
}

function relativeDiffStr(diff: Duration, abbreviated = false): string {
  diff = diff.normalize();
  if (diff.years > 0) {
    return diff.years + (abbreviated ? "y" : pluralize(" year", diff.years));
  } else if (diff.months > 0) {
    return (
      diff.months + (abbreviated ? "mo" : pluralize(" month", diff.months))
    );
  } else if (diff.weeks > 0) {
    return diff.weeks + (abbreviated ? "wk" : pluralize(" week", diff.weeks));
  } else if (diff.days > 0) {
    return diff.days + (abbreviated ? "d" : pluralize(" day", diff.days));
  } else if (diff.hours > 0) {
    return diff.hours + (abbreviated ? "h" : pluralize(" hour", diff.months));
  } else if (diff.minutes > 0) {
    return (
      Math.floor(diff.minutes) + (abbreviated ? "m" : pluralize(" minute", diff.minutes))
    );
  } else {
    return "now";
  }
}

function pluralize(unit: string, amt: number) {
  return amt === 1 ? unit : `${unit}s`;
}
