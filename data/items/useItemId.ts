import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../persist";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const itemIdAtom = atomWithStorage<number>("itemId", 1, asyncStorage);

export function useNextItemId() {
  const [itemId, setItemId] = useAtom(itemIdAtom);

  return useCallback(() => {
    const curr = itemId;
    setItemId(curr + 1);
    return curr;
  }, [itemId, setItemId]);
}
