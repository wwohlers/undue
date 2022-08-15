import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../persist";
import { Item } from "./types/Item.type";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { itemIdAtom } from "./useItemId";

const itemsAtom = atomWithStorage<Item[]>("items", [], asyncStorage);

export function useItems() {
  const [items, setItems] = useAtom(itemsAtom);
  const [itemId, setItemId] = useAtom(itemIdAtom);

  const _setItems = useCallback((items: Item[]) => {
    const maxId = Math.max(...items.map((i) => i.id));
    if (itemId <= maxId) {
      setItemId(maxId + 1);
    }
    setItems(items);
  }, []);

  return [items, _setItems];
}
