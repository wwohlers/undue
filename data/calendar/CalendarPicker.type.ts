import { DateTime } from "luxon";

export type CalendarPicker = {
  selectedValue: DateTime | undefined;
  completed: boolean;
}