import { useEntries } from "./useEntries";
import { useCallback } from "react";
import { useRemoveEntryReminders } from "../reminders/useRemoveEntryReminders";

export function useRemoveEntries() {
  const [entries, setEntries] = useEntries();
  const removeEntryReminders = useRemoveEntryReminders();

  return useCallback(
    (ids: number[]) => {
      const newEntries = entries.filter((entry) => !ids.includes(entry.id));
      setEntries(newEntries);
      ids.forEach(removeEntryReminders);
    },
    [entries, setEntries]
  );
}
