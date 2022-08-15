import { useItems } from "../useItems";
import { useCallback } from "react";

export function useRemoveItem() {
  const [items, setItems] = useItems();
  return useCallback(
    (itemId: number) => {
      // if repeating, ask about future items
      // get all notification ids
      // delete all notifications
      // delete items
    },
    [items, setItems]
  );
}
