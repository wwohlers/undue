import { useFilterSortState } from "./useFilterSortState";
import { useCallback } from "react";
import { FilterSortState } from "./FilterSortState.type";

export function useSetFilterOptions(type: keyof FilterSortState) {
  const [filterSortState, setFilterSortState] = useFilterSortState();
  return useCallback(
    (partial: Partial<FilterSortState[typeof type]["filterOptions"]>) => {
      setFilterSortState({
        ...filterSortState,
        [type]: {
          ...filterSortState[type],
          filterOptions: {
            ...filterSortState[type].filterOptions,
            ...partial,
          },
        },
      });
    },
    [filterSortState, setFilterSortState]
  );
}
