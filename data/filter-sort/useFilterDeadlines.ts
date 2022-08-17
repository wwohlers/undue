import { useMemo } from "react";
import { useFilterSortState } from "./useFilterSortState";
import { Priority } from "../Priority.type";
import { Item } from "../items/Item.type";

export function useFilterDeadlines(deadlines: Item[]) {
  const [filterSortState] = useFilterSortState();

  return useMemo(() => {
    return deadlines.filter((deadline) => {
      if (!filterSortState.deadlines.filterOptions.showCompleted) {
        if (deadline.completed) return false;
      }
      if (!filterSortState.deadlines.filterOptions.showIncomplete) {
        if (!deadline.completed) return false;
      }
      for (const priority of Object.values(Priority)) {
        if (
          !filterSortState.deadlines.filterOptions.showPriorities[
            priority as Priority
          ]
        ) {
          if (deadline.priority !== priority) return false;
        }
      }
      return true;
    });
  }, [filterSortState, deadlines]);
}
