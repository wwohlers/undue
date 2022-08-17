import { useItems } from "../useItems";
import { useCallback } from "react";
import { sameMaster } from "../helpers/sameMaster";
import { DateTime } from "luxon";
import { useReminders } from "../../reminders/useReminders";
import { useDeleteReminders } from "../../reminders/hooks/useDeleteReminders";

export function useDisableRepeat() {
  const [items, setItems] = useItems();
  const [reminders] = useReminders();
  const deleteReminders = useDeleteReminders();

  return useCallback(
    (id: number) => {
      const item = items.find((item) => item.id === id);
      if (!item) return;
      const itemsToDelete = items
        .filter(
          (i) =>
            sameMaster(item, i) &&
            DateTime.fromISO(i.datetime) > DateTime.fromISO(item.datetime)
        )
        .map((i) => i.id);
      setItems(items.filter((i) => !itemsToDelete.includes(i.id)));
      const remindersToDelete = reminders.filter((reminder) => {
        return itemsToDelete.includes(reminder.itemId);
      });
      deleteReminders(remindersToDelete.map((reminder) => reminder.id));
    },
    [items, setItems, reminders, deleteReminders]
  );
}
