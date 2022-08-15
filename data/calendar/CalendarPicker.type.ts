import { DateTime } from "luxon";

export type CalendarPicker = {
  selectedValue: DateTime | undefined;
  confirmed: boolean;
  cancelled: boolean;
};
