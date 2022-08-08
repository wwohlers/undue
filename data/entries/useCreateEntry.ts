import { useCallback } from "react";
import { useCreateDefaultReminders } from "../reminders/useCreateDefaultReminders";
import { CreateableEntry } from "./Entry.type";
import { useEntries } from "./useEntries";

export function useCreateEntry() {
  const [entries, setEntries] = useEntries();
  const createDefaultReminders = useCreateDefaultReminders();
  return useCallback(
    (entry: CreateableEntry) => {
      const maxId = Math.max(...entries.map((d) => d.id));
      const newEntry = {
        ...entry,
        id: maxId + 1,
      };
      setEntries([...entries, newEntry]);
      createDefaultReminders(newEntry);
      return newEntry;
    },
    [entries, setEntries, createDefaultReminders]
  );
}
