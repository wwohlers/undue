import { useCallback } from "react";
import { useCreateReminder } from "../reminders/useCreateReminder";
import { CreateableEntry } from "./Entry.type";
import { getDefaultReminders } from "./defaultReminders";
import { useEntries } from "./useEntries";

export function useCreateEntry() {
  const [entries, setEntries] = useEntries();
  const createReminder = useCreateReminder();
  return useCallback(
    (entry: CreateableEntry) => {
      const maxId = Math.max(...entries.map((d) => d.id));
      const newEntry = {
        ...entry,
        id: maxId + 1,
      };
      setEntries([...entries, newEntry]);
      const defaultReminders = getDefaultReminders(newEntry);
      defaultReminders.forEach(createReminder);
      return newEntry;
    },
    [entries, setEntries, createReminder]
  );
}
