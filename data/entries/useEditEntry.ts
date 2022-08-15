import { useCallback } from "react";
import { useEditReminder } from "../reminders/useEditReminder";
import { useReminders } from "../reminders/useReminders";
import { Entry } from "./Entry.type";
import { useEntries } from "./useEntries";
import { useRemoveReminder } from "../reminders/useRemoveReminder";
import { DateTime } from "luxon";

export function useEditEntry() {
  const [entries, setEntries] = useEntries();
  const [reminders] = useReminders();
  const editReminder = useEditReminder();
  const removeReminder = useRemoveReminder();

  return useCallback(
    (id: number, partial: Partial<Entry>, adjustReminders = true) => {
      const existing = entries.find((d) => d.id === id);
      if (!existing) return false;
      const newEntry = {
        ...existing,
        ...partial,
      } as Entry;
      const newEntries = entries.map((d) => {
        if (d.id === id) return newEntry;
        return d;
      });
      setEntries(newEntries);
      if (partial.datetime && adjustReminders) {
        const diff =
          new Date(newEntry.datetime).getTime() -
          new Date(existing.datetime).getTime();
        reminders
          .filter((r) => r.entryId === id)
          .forEach((r) => {
            const newTimestamp = new Date(r.datetime).getTime() + diff;
            if (newTimestamp < Date.now() + 60000) {
              removeReminder(r.id);
            } else {
              editReminder(r.id, {
                datetime: DateTime.fromMillis(newTimestamp).toISO(),
              });
            }
          });
      }
      return newEntry;
    },
    [entries, setEntries]
  );
}
