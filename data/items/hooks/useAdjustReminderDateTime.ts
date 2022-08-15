import { useItems } from "../useItems";
import { useCallback } from "react";

export function useAdjustReminderDateTime() {
  const [items, setItems] = useItems();
  return useCallback(() => {}, [items, setItems]);
}
