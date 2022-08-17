import { useReminders } from "../useReminders";
import { useCallback } from "react";
import { Item } from "../../items/Item.type";
import { CreatableReminder } from "../Reminder.type";
import { DateTime } from "luxon";
import { useCreateReminders } from "./useCreateReminders";

export function useDuplicateReminders() {
  const [reminders, setReminders] = useReminders();
  const createReminders = useCreateReminders();
  return useCallback(
    async (
      baseItem: Item,
      baseReminder: CreatableReminder,
      itemsToAddTo: Item[]
    ) => {
      const reminderDiff = DateTime.fromISO(baseItem.datetime).diff(
        DateTime.fromISO(baseReminder.datetime)
      );
      const creatables: CreatableReminder[] = itemsToAddTo.map((item) => ({
        datetime: DateTime.fromISO(item.datetime).plus(reminderDiff).toISO(),
        itemId: item.id,
        itemTitle: item.title,
        itemDateTime: item.datetime,
      }));
      await createReminders(creatables);
    },
    [reminders, setReminders, createReminders]
  );
}
