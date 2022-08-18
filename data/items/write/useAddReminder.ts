import { useItems } from "../useItems";
import { useCallback } from "react";
import { useDuplicateReminders } from "../../reminders/hooks/useDuplicateReminders";
import { CreatableReminder } from "../../reminders/Reminder.type";
import { DateTime } from "luxon";
import { useYesOrNo } from "../../../hooks/alerts/useYesOrNo";
import { sameMaster } from "../helpers/sameMaster";

export function useAddReminder() {
  const [items, setItems] = useItems();
  const duplicateReminders = useDuplicateReminders();
  const yesNo = useYesOrNo();

  return useCallback(
    async (itemId: number, dt: DateTime) => {
      const item = items.find((item) => item.id === itemId);
      if (!item) return;
      const baseReminder: CreatableReminder = {
        datetime: dt.toISO(),
        itemId,
        itemTitle: item.title,
        itemDateTime: item.datetime,
      };
      const itemsToAddTo = [item];
      if (
        item.repeatSchedule &&
        (await yesNo(
          "Also add to repeats?",
          `Would you also like to add a corresponding reminder for repeated ${item.type}s?`
        ))
      ) {
        itemsToAddTo.push(
          ...items.filter(
            (i) =>
              sameMaster(item, i) &&
              DateTime.fromISO(i.datetime) > DateTime.fromISO(item.datetime)
          )
        );
      }
      duplicateReminders(item, [baseReminder], itemsToAddTo);
    },
    [items, setItems, duplicateReminders, yesNo]
  );
}
