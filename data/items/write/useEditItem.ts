import { useItems } from "../useItems";
import { useCallback } from "react";
import { Item } from "../Item.type";
import { useReminders } from "../../reminders/useReminders";
import { useDeleteReminders } from "../../reminders/hooks/useDeleteReminders";

export function useEditItem() {
  const [items, setItems] = useItems();
  const [reminders] = useReminders();
  const deleteReminders = useDeleteReminders();

  return useCallback(
    (
      id: number,
      partial: Partial<
        Omit<Item, "id" | "datetime" | "type" | "repeatSchedule" | "masterId">
      >
    ) => {
      const item = items.find((i) => i.id === id);
      if (!item) {
        return;
      }
      const newItem = { ...item, ...partial };
      setItems(items.map((i) => (i.id === newItem.id ? newItem : i)));
      if (partial.completed) {
        const remindersToDelete = reminders
          .filter((r) => r.itemId === id)
          .map((r) => r.id);
        deleteReminders(remindersToDelete);
      }
    },
    [items, setItems, reminders, deleteReminders]
  );
}
