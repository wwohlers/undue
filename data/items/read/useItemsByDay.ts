import { DateTime } from "luxon";
import { Item } from "../Item.type";
import { useItems } from "../useItems";
import { useMemo } from "react";

export function useItemsByDay(day: DateTime): Item[] {
  const [items] = useItems();
  return useMemo(() => {
    return items.filter((i) => {
      const dt = DateTime.fromISO(i.datetime);
      return dt > day.startOf("day") && dt < day.endOf("day");
    });
  }, [items, day]);
}
