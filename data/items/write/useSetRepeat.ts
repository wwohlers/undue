import { useCallback } from "react";
import { useItems } from "../useItems";
import { getRepeatDates, RepeatSchedule } from "../helpers/repeat";
import { DateTime } from "luxon";
import { useReminders } from "../../reminders/useReminders";
import { useDuplicateReminders } from "../../reminders/hooks/useDuplicateReminders";
import { useYesOrNo } from "../../../hooks/alerts/useYesOrNo";
import { useCreateItems } from "./useCreateItem";
import { itemTypeName } from "../../../util/text";

export function useSetRepeat() {
  const [items, setItems] = useItems();
  const [reminders] = useReminders();
  const createItems = useCreateItems();
  const duplicateReminders = useDuplicateReminders();
  const yesNo = useYesOrNo();

  return useCallback(
    async (id: number, schedule: RepeatSchedule) => {
      const item = items.find((item) => item.id === id);
      if (!item) return;
      const dates = getRepeatDates(DateTime.fromISO(item.datetime), schedule);
      const duplicatedItems = createItems(
        dates.map((date) => ({
          ...item,
          datetime: date.toISO(),
          completed: false,
          repeatSchedule: schedule,
        }))
      );
      setItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, repeatSchedule: schedule } : item
        )
      );
      const remindersToDuplicate = reminders.filter(
        (reminder) => reminder.itemId === id
      );
      if (!remindersToDuplicate) return;
      const proceed = await yesNo(
        "Repeat reminders?",
        `Do you also want to create corresponding reminders for each ${itemTypeName(
          item.type
        )}?`
      );
      if (!proceed) return;
      duplicateReminders(item, remindersToDuplicate, duplicatedItems);
    },
    [items, setItems, createItems, reminders, duplicateReminders, yesNo]
  );
}
