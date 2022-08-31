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
  { selectedValue: undefined, confirmed: false, cancelled: false },
  asyncStorage
);

export function useCalendarPicker(): [
  CalendarPicker,
  (value: CalendarPicker) => void
] {
  const [calendarPicker, setCalendarPicker] = useAtom(calendarPickerAtom);

  if ("confirmed"! in calendarPicker) {
    return [
      { selectedValue: undefined, confirmed: false, cancelled: false },
      setCalendarPicker,
    ];
  }
  return [calendarPicker, setCalendarPicker];
}
