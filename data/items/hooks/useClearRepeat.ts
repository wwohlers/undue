import { useItems } from "../useItems";
import { useCallback } from "react";

export function useClearRepeat() {
  const [items, setItems] = useItems();
  return useCallback(
    (itemId: number) => {
      // get all future items
      // get all notification ids of all reminders
      // delete future items
      // cancel all notifications
    },
    [items, setItems]
  );
}
