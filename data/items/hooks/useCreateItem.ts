import { useItems } from "../useItems";
import { useCallback } from "react";
import { DateTime } from "luxon";
import { Item } from "../types/Item.type";

export function useCreateItem() {
  const [items, setItems] = useItems();
  return useCallback(
    (type: Item["type"], datetime: DateTime, title?: string) => {
      // get next item id
      // get default reminders
      // schedule notifications
      // create and add entry
    },
    [items, setItems]
  );
}
