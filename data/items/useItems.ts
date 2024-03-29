import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../persist";
import { Item } from "./Item.type";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

const itemsAtom = atomWithStorage<Item[]>("items", [], asyncStorage);

export function useItems(): [Item[], (items: Item[]) => void] {
  const [items, setItems] = useAtom(itemsAtom);

  if (!Array.isArray(items)) {
    return [[], setItems];
  }
  return [items, setItems];
}

export function useItem(id: number): Item | undefined {
  const [items] = useItems();
  return useMemo(() => {
    return items.find((i) => i.id === id);
  }, [items]);
}

export function useItemsByType(type: Item["type"]) {
  const [items] = useItems();
  return useMemo(() => {
    return items.filter((i) => i.type === type);
  }, [items]);
}
