import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../persist";
import { useAtom } from "jotai";
import {
  defaultDeadlineFilterOptions,
  defaultEventFilterOptions,
  defaultSortOptions,
  FilterSortState,
} from "./FilterSortState.type";

const filterSortStateAtom = atomWithStorage<FilterSortState>(
  "filterSortState",
  {
    deadlines: {
      sortOptions: defaultSortOptions,
      filterOptions: defaultDeadlineFilterOptions,
    },
    events: {
      sortOptions: defaultSortOptions,
      filterOptions: defaultEventFilterOptions,
    },
  },
  asyncStorage
);

export function useFilterSortState(): [
  FilterSortState,
  (state: FilterSortState) => void
] {
  const [filterSortState, setFilterSortState] = useAtom(filterSortStateAtom);

  if (!filterSortState || "deadlines"! in filterSortState) {
    return [
      {
        deadlines: {
          sortOptions: defaultSortOptions,
          filterOptions: defaultDeadlineFilterOptions,
        },
        events: {
          sortOptions: defaultSortOptions,
          filterOptions: defaultEventFilterOptions,
        },
      },
      setFilterSortState,
    ];
  }
  return [filterSortState, setFilterSortState];
}
