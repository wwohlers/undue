import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../persist";
import { useAtom } from "jotai";
import { useCallback } from "react";

export const itemIdAtom = atomWithStorage<number>("itemId", 1, asyncStorage);

export function useNextItemIds() {
  const [itemId, setItemId] = useAtom(itemIdAtom);

  return useCallback(
    (numIds = 1) => {
      const curr = itemId;
      setItemId(curr + numIds);
      return Array.from({ length: numIds }, (_, i) => curr + i);
    },
    [itemId, setItemId]
  );
}
