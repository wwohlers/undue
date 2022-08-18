import React from "react";
import { View } from "react-native";
import { SGLabel } from "../../elements/text/SGLabel";
import { SGCheckbox } from "../../elements/input/SGCheckbox";
import { useFilterSortState } from "../../data/filter-sort/useFilterSortState";
import { useSetFilterOptions } from "../../data/filter-sort/useSetFilterOptions";
import { Priority } from "../../data/Priority.type";
import { VSpace } from "../../elements/layout/VSpace";
import { useTheme } from "../../hooks/theme/useTheme";

export const FilterEventsControl: React.FC = () => {
  const [filterSortState] = useFilterSortState();
  const setFilterOptions = useSetFilterOptions("events");
  const { filterOptions } = filterSortState.events;
  const theme = useTheme();

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
    <View
      style={{
        padding: 16,
        backgroundColor: theme.OFF_BACKGROUND,
        borderRadius: 8,
      }}
    >
      <SGLabel>Filter Events</SGLabel>
      <VSpace height={4} />
      <SGCheckbox
        value={filterOptions.showPast}
        onChange={checkedHandler("showPast")}
        text="Show past events"
      />
      {Object.values(Priority).map((priority) => (
        <SGCheckbox
          value={filterOptions.showPriorities[priority]}
          onChange={priorityCheckedHandler(priority)}
          key={priority}
          text={`Show ${priority.toLowerCase()} priority events`}
        />
      ))}
    </View>
  );
};
