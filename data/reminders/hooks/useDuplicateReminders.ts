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
      baseReminders: CreatableReminder[],
      itemsToAddTo: Item[]
    ) => {
      const creatables = baseReminders.map((reminder) => {
        const reminderDiff = DateTime.fromISO(baseItem.datetime).diff(
          DateTime.fromISO(reminder.datetime)
        );
        return itemsToAddTo.map((item) => ({
          datetime: DateTime.fromISO(item.datetime).minus(reminderDiff).toISO(),
          itemId: item.id,
          itemTitle: item.title,
          itemDateTime: item.datetime,
        }));
      });
      await createReminders(creatables.flat(1));
    },
    [reminders, setReminders, createReminders]
  );
}
