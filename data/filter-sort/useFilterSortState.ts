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

export function useFilterSortState() {
  return useAtom(filterSortStateAtom);
}
