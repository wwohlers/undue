import { useCallback } from "react";
import { useCreateDefaultReminders } from "../reminders/useCreateDefaultReminders";
import { CreateableEntry, Entry } from "./Entry.type";
import { useEntries } from "./useEntries";
import Toast from "react-native-toast-message";

export function useCreateEntry() {
  const [entries, setEntries] = useEntries();
  const createDefaultReminders = useCreateDefaultReminders();
  return useCallback(
    (entry: CreateableEntry) => {
      const maxId = Math.max(...entries.map((d) => d.id));
      const newEntry = {
        ...entry,
        id: maxId + 1,
      } as Entry;
      setEntries([...entries, newEntry]);
      createDefaultReminders(newEntry);
      Toast.show({
        type: "success",
        text1: `Your ${newEntry.type} was created`,
      });
      return newEntry;
    },
    [entries, setEntries, createDefaultReminders]
  );
}
