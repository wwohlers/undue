import { useItems } from "../useItems";
import { useCallback } from "react";
import { useYesOrNo } from "../../../hooks/alerts/useYesOrNo";
import { sameMaster } from "../helpers/sameMaster";
import { DateTime } from "luxon";
import { useDeleteReminders } from "../../reminders/hooks/useDeleteReminders";
import { useReminders } from "../../reminders/useReminders";
import { itemTypeName } from "../../../util/text";

export function useDeleteItem() {
  const [items, setItems] = useItems();
  const [reminders] = useReminders();
  const yesNo = useYesOrNo();
  const deleteReminders = useDeleteReminders();

  return useCallback(
    async (id: number) => {
      const item = items.find((item) => item.id === id);
      if (!item) return;
      const itemsToRemove = [item.id];
      if (
        item.repeatSchedule &&
        (await yesNo(
          `Delete repeated ${itemTypeName(item.type)}s?`,
          `Do you also want to delete all future ${itemTypeName(item.type)}s?`
        ))
      ) {
        itemsToRemove.push(
          ...items
            .filter(
              (i) =>
                sameMaster(item, i) &&
                DateTime.fromISO(i.datetime) > DateTime.fromISO(item.datetime)
            )
            .map((i) => i.id)
        );
      }
      setItems(items.filter((i) => !itemsToRemove.includes(i.id)));
      const remindersToRemove = reminders.filter((reminder) =>
        itemsToRemove.includes(reminder.itemId)
      );
      deleteReminders(remindersToRemove.map((r) => r.id));
    },
    [items, setItems, reminders, deleteReminders]
  );
}
