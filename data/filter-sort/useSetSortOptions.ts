import { FilterSortState } from "./FilterSortState.type";
import { useCallback } from "react";
import { useFilterSortState } from "./useFilterSortState";

export function useSetSortOptions(type: keyof FilterSortState) {
  const [filterSortState, setFilterSortState] = useFilterSortState();
  return useCallback(
    (
      partialSortOptions: Partial<FilterSortState[typeof type]["sortOptions"]>
    ) => {
      setFilterSortState({
        ...filterSortState,
        [type]: {
          ...filterSortState[type],
          sortOptions: {
            ...filterSortState[type].sortOptions,
            ...partialSortOptions,
          },
        },
      });
    },
    [filterSortState, setFilterSortState]
  );
}
