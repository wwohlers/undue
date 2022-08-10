import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../persist";
import { CalendarPicker } from "./CalendarPicker.type";

/**
 * This piece of state is used by the calendar picker and the useCalendarPicker hook
 * to know when a user has picked a DateTime.
 */
const calendarPickerAtom = atomWithStorage<CalendarPicker>(
  "calendarPicker",
  { selectedValue: undefined, completed: true },
  asyncStorage
);

export function useCalendarPicker() {
  return useAtom(calendarPickerAtom);
}
