import { DateTime } from "luxon";

export function absoluteFormat(datetime: DateTime): string {
  if (datetime < DateTime.now()) {
    return absoluteFormatPast(datetime);
  } else {
    return absoluteFormatFuture(datetime);
  }
}

function absoluteFormatFuture(datetime: DateTime): string {
  if (datetime <= DateTime.now().endOf("day")) {
    return "today at " + datetime.toFormat("h:mm a");
  } else if (datetime <= DateTime.now().plus({ day: 1 }).endOf("day")) {
    return "tomorrow at " + datetime.toFormat("h:mm a");
  } else if (datetime <= DateTime.now().endOf("week")) {
    return datetime.toFormat("cccc 'at' h:mm a");
  } else if (datetime <= DateTime.now().plus({ day: 1 }).endOf("week")) {
    return datetime.toFormat("'next' cccc 'at' h:mm a");
  } else if (datetime <= DateTime.now().endOf("year")) {
    return datetime.toFormat("cccc, LLLL d");
  } else {
    return datetime.toFormat("LLLL d, kkkk");
  }
}

function absoluteFormatPast(datetime: DateTime): string {
  if (datetime > DateTime.now().startOf("day")) {
    return "today at " + datetime.toFormat("h:mm a");
  } else if (datetime > DateTime.now().minus({ day: 1 }).startOf("day")) {
    return "yesterday at " + datetime.toFormat("h:mm a");
  } else if (datetime < DateTime.now().startOf("week")) {
    return datetime.toFormat("cccc 'at' h:mm a");
  } else if (datetime < DateTime.now().minus({ day: 1 }).startOf("week")) {
    return datetime.toFormat("'next' cccc 'at' h:mm a");
  } else if (datetime < DateTime.now().startOf("year")) {
    return datetime.toFormat("cccc, LLLL d");
  } else {
    return datetime.toFormat("LLLL d, kkkk");
  }
}
