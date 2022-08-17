import {useAtom} from "jotai";
import {atomWithStorage} from "jotai/utils";
import {asyncStorage} from "../persist";
import {ReminderPicker} from "./ReminderPicker.type";

/**
 * This piece of state is used by the calendar picker and the useCalendarPicker hook
 * to know when a user has picked a DateTime.
 */
const reminderPickerAtom = atomWithStorage<ReminderPicker>(
  "reminderPicker",
  { selectedValue: undefined, confirmed: false, cancelled: false },
  asyncStorage
);

export function useReminderPicker() {
  return useAtom(reminderPickerAtom);
}
