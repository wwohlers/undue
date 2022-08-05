import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { useMemo } from "react";
import { Reminder } from "./Reminder.type";

const remindersStorage = createJSONStorage<Reminder[]>(() => AsyncStorage);
const remindersAtom = atomWithStorage<Reminder[]>(
  "reminders",
  [],
  remindersStorage
);

export function useReminders() {
  return useAtom(remindersAtom);
}

export function useReminder(id: number) {
  const [reminders] = useReminders();
  return useMemo(() => {
    return reminders.find((r) => r.id === id);
  }, [reminders, id]);
}

export function useEntryReminders(entryId: number) {
  const [reminders] = useReminders();
  return useMemo(() => {
    return reminders.filter((r) => r.entryId === entryId);
  }, [reminders, entryId]);
}
