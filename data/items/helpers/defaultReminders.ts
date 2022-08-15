import { DateTime } from "luxon";

export function getDefaultReminders(datetime: DateTime): DateTime[] {
  const datetimes = [
    datetime.minus({ minutes: 15 }),
    datetime.hour > 9
      ? datetime.set({ hour: 9 }).startOf("hour")
      : datetime.minus({ day: 1 }).set({ hour: 21 }).startOf("hour"),
  ];
  return datetimes.filter((dt) => {
    return dt > DateTime.now();
  });
}
