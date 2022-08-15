import {DateTime} from "luxon";

/**
 * Returns the name of the US federal holiday on the given date, or undefined if there is no holiday.
 * @param day
 */
export function getUSHoliday(day: DateTime): string | undefined {
  if (day.month === 1) {
    if (day.day === 1) return "New Year's Day";
    if (day.weekday === 1 && day.day >= 15 && day.day < 22)
      return "Martin Luther King, Jr. Day";
  } else if (day.month === 2) {
    if (day.day === 18) return "Washington's Birthday";
  } else if (day.month === 5) {
    if (day.weekday === 1 && day.plus({ week: 1 }).month !== day.month)
      return "Memorial Day";
  } else if (day.month === 6) {
    if (day.day === 19) return "Juneteenth";
  } else if (day.month === 7) {
    if (day.day === 4) return "Independence Day";
  } else if (day.month === 9) {
    if (day.weekday === 1 && day.day < 8) return "Labor Day";
  } else if (day.month === 10) {
    if (day.weekday === 1 && day.day >= 8 && day.day < 15)
      return "Columbus Day";
  } else if (day.month === 11) {
    if (day.day === 11) return "Veterans Day";
    if (day.weekday === 4 && day.day >= 22 && day.day < 29)
      return "Thanksgiving";
  } else if (day.month === 12) {
    if (day.day === 25) return "Christmas Day";
  }
  return undefined;
}
