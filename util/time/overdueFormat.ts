import { DateTime } from "luxon";
import { pluralize } from "../intro";

export function overdueFormat(dt: DateTime) {
  const now = DateTime.now();
  const diff = now.diff(dt, ["days", "hours", "minutes"]);
  if (diff.days > 0) {
    const numDays = Math.round(diff.days);
    return `${numDays} ${pluralize("day", numDays)} overdue`;
  } else if (diff.hours > 0) {
    const numHours = Math.round(diff.hours);
    return `${numHours} ${pluralize("hour", numHours)} overdue`;
  } else {
    const numMinutes = Math.round(diff.minutes);
    return `${numMinutes} ${pluralize("minute", numMinutes)} overdue`;
  }
}
