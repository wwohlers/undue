import { useItems } from "../useItems";
import { useCallback } from "react";
import { Item } from "../types/Item.type";

export function useEditItemMetadata() {
  const [items, setItems] = useItems();
  return useCallback(
    (itemId: number, partial: Partial<Item["metadata"]>) => {
      // set metadata
      // if repeating, ask about future events and change those too
    },
    [items, setItems]
  );
}
