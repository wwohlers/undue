import { useItems } from "../useItems";
import { useCallback } from "react";
import { DateTime } from "luxon";
import { Item } from "../types/Item.type";
import { useNextItemIds } from "../useItemId";
import { getDefaultReminders } from "../helpers/defaultReminders";
import { createNotifications } from "../helpers/notifications";
import { ItemReminder } from "../types/ItemReminder.type";
import { Priority } from "../../Priority.type";

export function useCreateItem() {
  const [items, setItems] = useItems();
  const nextIds = useNextItemIds();
  return useCallback(
    async (type: Item["type"], datetime: DateTime, title: string) => {
      const [id] = nextIds(1);
      const defaultCreatables = getDefaultReminders(datetime).map((dt) => {
        return {
          datetime: dt,
          title,
          itemDt: datetime,
          itemId: id,
        };
      });
      const notificationIds = await createNotifications(defaultCreatables);
      const reminders: ItemReminder[] = defaultCreatables.map((c, i) => ({
        datetime: c.datetime.toISO(),
        systemNotificationId: notificationIds[i],
      }));
      setItems([
        ...items,
        {
          id,
          type,
          datetime: datetime.toISO(),
          reminders,
          repeatData: {
            repeats: false,
          },
          completed: false,
          metadata: {
            title,
            priority: Priority.LOW,
          },
        },
      ]);
    },
    [items, setItems]
  );
}
