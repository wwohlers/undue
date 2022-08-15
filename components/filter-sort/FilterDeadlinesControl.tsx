import React from "react";
import { View } from "react-native";
import { SGLabel } from "../../elements/text/SGLabel";
import { VSpace } from "../../elements/layout/VSpace";
import { SGCheckbox } from "../../elements/input/SGCheckbox";
import { Priority } from "../../data/Priority.type";
import { useFilterSortState } from "../../data/filter-sort/useFilterSortState";
import { useSetFilterOptions } from "../../data/filter-sort/useSetFilterOptions";

export const FilterDeadlinesControl: React.FC = () => {
  const [filterSortState] = useFilterSortState();
  const setFilterOptions = useSetFilterOptions("deadlines");
  const { filterOptions } = filterSortState.deadlines;

  const checkedHandler =
    (field: keyof typeof filterOptions) => (value: boolean) => {
      setFilterOptions({
        ...filterOptions,
        [field]: value,
      });
    };

  const priorityCheckedHandler = (priority: Priority) => (value: boolean) => {
    setFilterOptions({
      ...filterOptions,
      showPriorities: {
        ...filterOptions.showPriorities,
        [priority]: value,
      },
    });
  };
  return (
    <View>
      <SGLabel>Filter Deadlines</SGLabel>
      <VSpace height={4} />
      <SGCheckbox
        value={filterOptions.showCompleted}
        onChange={checkedHandler("showCompleted")}
        text="Show completed deadlines"
      />
      <SGCheckbox
        value={filterOptions.showIncomplete}
        onChange={checkedHandler("showIncomplete")}
        text="Show incomplete deadlines"
      />
      {Object.values(Priority).map((priority) => (
        <SGCheckbox
          value={filterOptions.showPriorities[priority]}
          onChange={priorityCheckedHandler(priority)}
          key={priority}
          text={`Show ${priority.toLowerCase()} priority deadlines`}
        />
      ))}
    </View>
  );
};