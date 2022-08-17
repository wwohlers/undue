import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../persist";
import { Reminder } from "./Reminder.type";
import { useAtom } from "jotai";
import { useMemo } from "react";

const remindersAtom = atomWithStorage<Reminder[]>(
  "reminders",
  [],
  asyncStorage
);

export function useReminders() {
  return useAtom(remindersAtom);
}

export function useReminder(id: number) {
  const [reminders] = useReminders();
  return useMemo(
    () => reminders.find((reminder) => reminder.id === id),
    [reminders, id]
  );
}

export function useItemReminders(id: number) {
  const [reminders] = useReminders();
  return useMemo(() => {
    return reminders.filter((reminder) => reminder.itemId === id);
  }, [reminders, id]);
}
