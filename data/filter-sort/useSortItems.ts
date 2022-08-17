import { useFilterSortState } from "./useFilterSortState";
import { useMemo } from "react";
import { FilterSortState } from "./FilterSortState.type";
import { DateTime } from "luxon";
import { sortByPriority } from "../Priority.type";
import { Item } from "../items/Item.type";

export function useSortItems<K extends keyof FilterSortState>(
  type: K,
  items: Item[]
) {
  const [filterSortState] = useFilterSortState();

  const sorted = useMemo(() => {
    const sortOptions = filterSortState[type].sortOptions;
    if (sortOptions.sortMethod === "alphabetical") {
      return items.sort((a, b) => {
        const aName = a.title.toLowerCase();
        const bName = b.title.toLowerCase();
        return aName < bName ? -1 : 1;
      });
    } else if (sortOptions.sortMethod === "chronological") {
      return items.sort((a, b) => {
        const aDate = DateTime.fromISO(a.datetime);
        const bDate = DateTime.fromISO(b.datetime);
        return aDate < bDate ? -1 : 1;
      });
    } else {
      return sortByPriority(items);
    }
  }, [filterSortState, items]);

  return useMemo(() => {
    if (filterSortState[type].sortOptions.sortDirection === "ascending") {
      return sorted;
    }
    return sorted.reverse();
  }, [sorted, filterSortState[type]]);
}
