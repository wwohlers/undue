import { DateTime } from "luxon";
import { pluralize } from "../intro";

export function weekFormat(dt: DateTime): string {
  const today = DateTime.now().endOf("day");
  const tomorrow = today.plus({ day: 1 });
  const sevenDays = DateTime.now().plus({ days: 7 });

  if (dt < today) {
    return `today at ${dt.toFormat("t")}`;
  } else if (dt < tomorrow) {
    return `tomorrow at ${dt.toFormat("t")}`;
  } else if (dt < sevenDays) {
    return dt.toFormat("cccc 'at' t");
  } else {
    const numWeeks = Math.ceil(dt.diff(sevenDays).as("days") / 7);
    return `${numWeeks} ${pluralize("week", numWeeks)} from ${dt.toFormat(
      "cccc"
    )}`;
  }
}
