import { Priority } from "../Priority.type";

export type FilterSortState = {
  readonly deadlines: {
    readonly sortOptions: SortOptions;
    readonly filterOptions: {
      readonly showCompleted: boolean;
      readonly showIncomplete: boolean;
      readonly showPriorities: Record<Priority, boolean>;
    };
  };
  readonly events: {
    readonly sortOptions: SortOptions;
    readonly filterOptions: {
      readonly showPast: boolean;
      readonly showPriorities: Record<Priority, boolean>;
    };
  };
};

export type SortOptions = {
  sortMethod: "alphabetical" | "chronological" | "priority";
  sortDirection: "ascending" | "descending";
};

export const defaultSortOptions: SortOptions = {
  sortMethod: "chronological",
  sortDirection: "ascending",
};

export const defaultDeadlineFilterOptions: FilterSortState["deadlines"]["filterOptions"] =
  {
    showCompleted: false,
    showIncomplete: true,
    showPriorities: {
      [Priority.LOW]: true,
      [Priority.MED]: true,
      [Priority.HIGH]: true,
    },
  };

export const defaultEventFilterOptions: FilterSortState["events"]["filterOptions"] =
  {
    showPast: false,
    showPriorities: {
      [Priority.LOW]: true,
      [Priority.MED]: true,
      [Priority.HIGH]: true,
    },
  };
