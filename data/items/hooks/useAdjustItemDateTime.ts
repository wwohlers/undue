import { useItems } from "../useItems";
import { useCallback } from "react";

export function useAdjustItemDateTime() {
  const [items, setItems] = useItems();
  return useCallback(() => {
    // ask about future items, if any
    // get all notification ids from all reminders
    // cancel all notifications
    // adjust all reminders
    // schedule new notifications
  }, [items, setItems]);
}
