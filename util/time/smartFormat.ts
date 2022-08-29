import { DateTime } from "luxon";

export function smartFormat(dt: DateTime) {
  const thisWeekEnd = DateTime.now().endOf("week");
  const nextWeekEnd = thisWeekEnd.plus({ week: 1 });
  if (dt < DateTime.now()) {
    return dt.toFormat("cccc, LLLL d 'at' t");
  } else if (dt < DateTime.now().endOf("day")) {
    return dt.toFormat("'today at' t");
  } else if (dt < DateTime.now().plus({ day: 1 }).endOf("day")) {
    return dt.toFormat("'tomorrow at' t");
  } else if (dt < thisWeekEnd) {
    return dt.toFormat("cccc 'at' t");
  } else if (dt < nextWeekEnd) {
    return dt.toFormat("'next' cccc 'at' t");
  } else {
    return dt.toFormat("cccc, LLLL d 'at' t");
  }
}
