import { DateTime, Duration, DurationUnit } from "luxon";

const diffUnitSingular: DurationUnit[] = [
  "year",
  "month",
  "week",
  "day",
  "hour",
  "minute",
];

const diffUnitPlural = ["years", "months", "weeks", "days", "hours", "minutes"];

/**
 * Returns a string that represents when a DateTime is relative to now, like "3 hours ago" or "in 5d"
 * @param datetime
 * @param abbreviated whether to abbreviate units (e.g. "month" vs "mo")
 * @returns
 */
export function relativeFormat(
  datetime: DateTime,
  abbreviated = false,
  currentDateTime: DateTime = DateTime.now()
) {
  const diff = datetime.diff(currentDateTime, diffUnitSingular);
  const str = relativeDiffStr(diff, abbreviated);
  if (str === "now") {
    return str;
  } else if (datetime > DateTime.now()) {
    return `in ${str}`;
  } else {
    return `${str} ago`;
  }
}

export function relativeDiffStr(diff: Duration, abbreviated = false): string {
  diff = diff.normalize();
  if (diff.as("milliseconds") < 0) diff = diff.negate();
  for (let i = 0; i < diffUnitPlural.length - 1; i++) {
    const first = diff[diffUnitPlural[i] as keyof Duration] as number;
    if (first >= 1) {
      const firstUnit = pluralize(diffUnitSingular[i], first);
      const second = diff[diffUnitPlural[i + 1] as keyof Duration] as number;
      const firstPart = `${Math.round(first)} ${firstUnit}`;
      if (second === 0) return firstPart;
      const secondUnit = pluralize(diffUnitSingular[i + 1], second);
      return `${firstPart}, ${Math.round(second)} ${secondUnit}`;
    }
  }
  if (diff.as("minutes") > 0) {
    const mins = Math.ceil(diff.as("minutes"));
    return `${mins} ${pluralize("minute", mins)}`;
  }
  return "now";
}

function pluralize(unit: string, amt: number) {
  return amt === 1 ? unit : `${unit}s`;
}
