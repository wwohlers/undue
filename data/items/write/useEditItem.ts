import { useItems } from "../useItems";
import { useCallback } from "react";
import { Item } from "../Item.type";

export function useEditItem() {
  const [items, setItems] = useItems();

  return useCallback(
    (
      id: number,
      partial: Partial<
        Omit<Item, "id" | "datetime" | "type" | "repeatSchedule" | "masterId">
      >
    ) => {
      const item = items.find((i) => i.id === id);
      if (!item) {
        return;
      }
      const newItem = { ...item, ...partial };
      setItems(items.map((i) => (i.id === newItem.id ? newItem : i)));
    },
    [items, setItems]
  );
}
