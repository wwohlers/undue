import { useItems } from "../useItems";
import { useCallback } from "react";
import { cancelNotifications } from "../helpers/notifications";
import { sameMaster } from "../helpers/sameMaster";

export function useClearRepeat() {
  const [items, setItems] = useItems();
  return useCallback(
    async (itemId: number) => {
      const item = items.find((item) => item.id === itemId);
      if (!item) return;
      const repeatItems = items.filter((i) => sameMaster(item, i));
      await Promise.all(
        repeatItems.map(async (i) => {
          await cancelNotifications(
            i.reminders.map((r) => r.systemNotificationId)
          );
        })
      );
      setItems(
        items
          .filter((item) => {
            return !repeatItems.some((i) => i.id === item.id);
          })
          .map((i) => {
            if (i.id !== itemId) return i;
            return {
              ...i,
              repeatData: {
                ...i.repeatData,
                repeats: false,
              },
            };
          })
      );
    },
    [items, setItems]
  );
}
