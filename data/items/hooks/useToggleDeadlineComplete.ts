import { useItems } from "../useItems";
import { useCallback } from "react";

export function useToggleDeadlineComplete() {
  const [items, setItems] = useItems();
  return useCallback((itemId: number, value: boolean) => {}, [items, setItems]);
}
