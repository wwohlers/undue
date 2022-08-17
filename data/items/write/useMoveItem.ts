import { useCallback } from "react";
import { useItems } from "../useItems";
import { DateTime } from "luxon";
import { useYesOrNo } from "../../../hooks/alerts/useYesOrNo";
import { useReminders } from "../../reminders/useReminders";
import { useMoveReminders } from "../../reminders/hooks/useMoveReminders";

export function useMoveItem() {
  const [items, setItems] = useItems();
  const [reminders] = useReminders();
  const moveReminders = useMoveReminders();
  const yesNo = useYesOrNo();

  return useCallback(
    async (itemId: number, newDt: DateTime) => {
      const item = items.find((item) => item.id === itemId);
      if (!item) return;
      const alsoRemoveReminders = await yesNo(
        "Move reminders?",
        `Do you also want to move reminders for this ${item.type}?`
      );
      setItems(
        items.map((item) =>
          item.id === itemId ? { ...item, datetime: newDt.toISO() } : item
        )
      );
      if (alsoRemoveReminders) {
        const diff = newDt.diff(DateTime.fromISO(item.datetime));
        const remindersToMove = reminders.filter((reminder) => {
          return reminder.itemId === itemId;
        });
        moveReminders(
          remindersToMove.map((reminder) => reminder.id),
          diff
        );
      }
    },
    [items, setItems, yesNo, reminders, moveReminders]
  );
}
