import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../../persist";
import { useAtom } from "jotai";
import { useItems } from "../useItems";
import { useCallback, useEffect } from "react";
import { DateTime } from "luxon";

const latestHydratedAtom = atomWithStorage<number>(
  "latestHydrated",
  DateTime.now().year + 2,
  asyncStorage
);

export function useHydrateOnLoad() {
  const [latestHydrated, setLatestHydrated] = useAtom(latestHydratedAtom);
  const [items, setItems] = useItems();

  useEffect(() => {
    if (DateTime.now().year + 2 > latestHydrated) {
      const years = Array.from(
        { length: DateTime.now().year + 2 - latestHydrated },
        (_, i) => DateTime.now().year + 2 + i
      );
    }
  }, [latestHydrated, setLatestHydrated]);

  const hydrate = useCallback(async (years: number[]) => {}, [items, setItems]);
}
