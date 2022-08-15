import { useMemo } from "react";
import { Deadline } from "../entries/Entry.type";
import { useFilterSortState } from "./useFilterSortState";
import { Priority } from "../Priority.type";

export function useFilterDeadlines(deadlines: Deadline[]) {
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
