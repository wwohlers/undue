import { useItems } from "../useItems";
import { useCallback } from "react";
import { CreatableItem } from "../Item.type";
import { getDefaultReminders } from "../helpers/defaultReminders";
import { DateTime } from "luxon";
import { useCreateReminders } from "../../reminders/hooks/useCreateReminders";

export function useCreateItem() {
  const [items, setItems] = useItems();
  const createItems = useCreateItems();
  const createReminders = useCreateReminders();

  return useCallback(
    (item: CreatableItem) => {
      const [created] = createItems([item]);
      const defaultReminders = getDefaultReminders(
        DateTime.fromISO(item.datetime)
      );
      createReminders(
        defaultReminders.map((dt) => ({
          datetime: dt.toISO(),
          itemId: created.id,
          itemTitle: item.title,
          itemDateTime: item.datetime,
        }))
      );
      return created;
    },
    [items, setItems, createItems]
  );
}

export function useCreateItems() {
  const [items, setItems] = useItems();
  return useCallback(
    (itemsToAdd: CreatableItem[]) => {
      const maxId = Math.max(...items.map((item) => item.id), 1);
      const newItems = itemsToAdd.map((item, i) => ({
        ...item,
        id: maxId + 1 + i,
      }));
      setItems([...items, ...newItems]);
      return newItems;
    },
    [items, setItems]
  );
}
