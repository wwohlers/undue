import { useEntries } from "./useEntries";
import { useCallback } from "react";
import { RepeatData } from "./Entry.type";
import { useLastHydratedYear } from "../hydration/useLastHydratedYear";
import { DateTime } from "luxon";
import { useRemoveEntries } from "./useRemoveEntries";

export function useSetRepeat() {
  const [entries, setEntries] = useEntries();
  const [lastHydratedYear] = useLastHydratedYear();
  const removeEntries = useRemoveEntries();

  return useCallback(
    async (entryId: number, repeat: RepeatData) => {
      const entry = entries.find((e) => e.id === entryId);
      if (!entry) return;
      const dt = DateTime.fromISO(entry.datetime);
      if (!repeat.repeats && entry.repeat.repeats) {
        const masterId = entry.repeat.masterId;
        const entriesToDelete = entries
          .filter((e) => e.repeat.repeats && e.repeat.masterId === masterId)
          .filter((e) => DateTime.fromISO(e.datetime) > dt)
          .map((e) => e.id);
        removeEntries(entriesToDelete);
      } else {
      }
    },
    [entries, setEntries, lastHydratedYear]
  );
}
