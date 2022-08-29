import { useCallback } from "react";
import { useItems } from "../useItems";
import { DateTime } from "luxon";
import { useYesOrNo } from "../../../hooks/alerts/useYesOrNo";
import { useReminders } from "../../reminders/useReminders";
import { useMoveReminders } from "../../reminders/hooks/useMoveReminders";
import { itemTypeName } from "../../../util/text";

export function useMoveItem() {
  const [items, setItems] = useItems();
  const [reminders] = useReminders();
  const moveReminders = useMoveReminders();
  const yesNo = useYesOrNo();

  return useCallback(
    async (itemId: number, newDt: DateTime) => {
      const item = items.find((item) => item.id === itemId);
      if (!item) return;
      const itemReminders = reminders.filter((reminder) => {
        return reminder.itemId === itemId;
      });
      const alsoRemoveReminders =
        itemReminders.length &&
        (await yesNo(
          "Move reminders?",
          `Do you also want to move reminders for this ${itemTypeName(
            item.type
          )}?`
        ));
      setItems(
        items.map((item) =>
          item.id === itemId ? { ...item, datetime: newDt.toISO() } : item
        )
      );
      if (alsoRemoveReminders) {
        const diff = newDt.diff(DateTime.fromISO(item.datetime));
        moveReminders(
          itemReminders.map((reminder) => reminder.id),
          diff
        );
      }
    },
    [items, setItems, yesNo, reminders, moveReminders]
  );
}
