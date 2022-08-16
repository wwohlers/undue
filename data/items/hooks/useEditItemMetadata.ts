import { useItems } from "../useItems";
import { useCallback } from "react";
import { Item } from "../types/Item.type";
import { useYesOrNo } from "../../../hooks/alerts/useYesOrNo";
import { sameMaster } from "../helpers/sameMaster";
import { DateTime } from "luxon";
import { modifyItem } from "../helpers/modifyItem";

export function useEditItemMetadata() {
  const [items, setItems] = useItems();
  const yesNo = useYesOrNo();

  return useCallback(
    async (itemId: number, partial: Partial<Item["metadata"]>) => {
      const item = items.find((item) => item.id === itemId);
      if (!item) return;
      const editRepeats =
        item.repeatData.repeats &&
        (await yesNo(
          "Edit repeats?",
          `Do you also want to modify all future ${item.type}?`
        ));
      setItems(
        items.map((i) => {
          const isRepeat =
            editRepeats &&
            sameMaster(i, item) &&
            DateTime.fromISO(i.datetime) > DateTime.fromISO(item.datetime);
          if (i.id === itemId || isRepeat) {
            return modifyItem(i, {
              metadata: {
                ...i.metadata,
                ...partial,
              },
            });
          }
          return i;
        })
      );
    },
    [items, setItems]
  );
}
