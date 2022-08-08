import { DateTime } from "luxon";

export function absoluteFormat(datetime: DateTime, currentDateTime = DateTime.now()): string {
  if (datetime < currentDateTime) {
    return absoluteFormatPast(datetime, currentDateTime);
  } else {
    return absoluteFormatFuture(datetime, currentDateTime);
  }
}

function absoluteFormatFuture(datetime: DateTime, currentDateTime: DateTime): string {
  if (datetime <= currentDateTime.endOf("day")) {
    return "today at " + datetime.toFormat("h:mm a");
  } else if (datetime <= currentDateTime.plus({ day: 1 }).endOf("day")) {
    return "tomorrow at " + datetime.toFormat("h:mm a");
  } else if (datetime <= currentDateTime.endOf("week")) {
    return datetime.toFormat("cccc 'at' h:mm a");
  } else if (datetime <= currentDateTime.plus({ day: 1 }).endOf("week")) {
    return datetime.toFormat("'next' cccc 'at' h:mm a");
  } else if (datetime <= currentDateTime.endOf("year")) {
    return datetime.toFormat("cccc, LLLL d");
  } else {
    return datetime.toFormat("LLLL d, kkkk");
  }
}

function absoluteFormatPast(datetime: DateTime, currentDateTime: DateTime): string {
  if (datetime > currentDateTime.startOf("day")) {
    return "today at " + datetime.toFormat("h:mm a");
  } else if (datetime > currentDateTime.minus({ day: 1 }).startOf("day")) {
    return "yesterday at " + datetime.toFormat("h:mm a");
  } else if (datetime < currentDateTime.startOf("week")) {
    return datetime.toFormat("cccc 'at' h:mm a");
  } else if (datetime < currentDateTime.minus({ day: 1 }).startOf("week")) {
    return datetime.toFormat("'next' cccc 'at' h:mm a");
  } else if (datetime < currentDateTime.startOf("year")) {
    return datetime.toFormat("cccc, LLLL d");
  } else {
    return datetime.toFormat("LLLL d, kkkk");
  }
}
