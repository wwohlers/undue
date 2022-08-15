import { useItems } from "../useItems";
import { useCallback } from "react";
import { RepeatData } from "../../entries/Entry.type";

export function useSetRepeat() {
  const [items, setItems] = useItems();
  return useCallback(
    (itemId: number, repeatData: RepeatData) => {
      // get stake dates
      // get all reminders based on current reminders and stake dates
      // get all notification ids of all reminders
      // get all items hydrated by first three items (this year + next two years)
      // add all staked + hydrated items
    },
    [items, setItems]
  );
}
