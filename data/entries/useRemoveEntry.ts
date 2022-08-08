import { useCallback } from "react";
import { useReminders } from "../reminders/useReminders";
import { useEntries } from "./useEntries";

export function useRemoveEntry() {
  const [entries, setEntries] = useEntries();
  const [reminders, setReminders] = useReminders();
  return useCallback(
    (id: number) => {
      const newEntries = entries.filter((d) => d.id !== id);
      setEntries(newEntries);
      const newReminders = reminders.filter((r) => r.entryId !== id);
      setReminders(newReminders);
      return newEntries.length < entries.length;
    },
    [entries, setEntries]
  );
}
