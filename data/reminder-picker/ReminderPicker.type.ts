import { DateTime } from "luxon";

export type ReminderPicker = {
  selectedValue: DateTime | undefined;
  confirmed: boolean;
  cancelled: boolean;
};
