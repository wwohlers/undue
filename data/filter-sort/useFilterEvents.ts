import { useMemo } from "react";
import { useFilterSortState } from "./useFilterSortState";
import { DateTime } from "luxon";
import { Priority } from "../Priority.type";
import { Item } from "../items/Item.type";

export function useFilterEvents(events: Item[]) {
  const [filterSortState] = useFilterSortState();

  return useMemo(() => {
    return events.filter((event) => {
      if (!filterSortState.events.filterOptions.showPast) {
        const dt = DateTime.fromISO(event.datetime);
        if (dt < DateTime.now()) return false;
      }
      for (const priority of Object.values(Priority)) {
        if (
          !filterSortState.events.filterOptions.showPriorities[
            priority as Priority
          ]
        ) {
          if (event.priority !== priority) return false;
        }
      }
      return true;
    });
  }, [filterSortState, events]);
}
