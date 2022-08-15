import { Deadline, Event } from "../entries/Entry.type";
import { useFilterSortState } from "./useFilterSortState";
import { useMemo } from "react";
import { FilterSortState } from "./FilterSortState.type";
import { DateTime } from "luxon";
import { sortByPriority } from "../Priority.type";

export function useSortEntries<K extends keyof FilterSortState>(
  type: K,
  entries: K extends "deadlines" ? Deadline[] : Event[]
) {
  const [filterSortState] = useFilterSortState();

  const sorted = useMemo(() => {
    const sortOptions = filterSortState[type].sortOptions;
    if (sortOptions.sortMethod === "alphabetical") {
      return entries.sort((a, b) => {
        const aName = a.title.toLowerCase();
        const bName = b.title.toLowerCase();
        return aName < bName ? -1 : 1;
      });
    } else if (sortOptions.sortMethod === "chronological") {
      return entries.sort((a, b) => {
        const aDate = DateTime.fromISO(a.datetime);
        const bDate = DateTime.fromISO(b.datetime);
        return aDate < bDate ? -1 : 1;
      });
    } else {
      return sortByPriority(entries as (Deadline | Event)[]);
    }
  }, [filterSortState, entries]);

  return useMemo(() => {
    if (filterSortState[type].sortOptions.sortDirection === "ascending") {
      return sorted;
    }
    return sorted.reverse();
  }, [sorted, filterSortState[type]]);
}
