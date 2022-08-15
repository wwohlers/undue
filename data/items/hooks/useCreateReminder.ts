import { useItems } from "../useItems";
import { useCallback } from "react";

export function useCreateReminder() {
  const [items, setItems] = useItems();
  return useCallback(() => {}, [items, setItems]);
}
