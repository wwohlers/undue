import { useItems } from "../useItems";
import { useCallback } from "react";

export function useRemoveReminder() {
  const [items, setItems] = useItems();
  return useCallback(
    (itemId: number) => {
      // if repeating, ask about future items
      //  get diff between event start and reminder datetime
      //  find all future reminders with that same diff
      // get all notification ids
      // cancel all notifications
      // delete reminders
    },
    [items, setItems]
  );
}
