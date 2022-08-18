import React from "react";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { View } from "react-native";
import { SortControl } from "../components/filter-sort/SortControl";
import { FilterDeadlinesControl } from "../components/filter-sort/FilterDeadlinesControl";
import { FilterEventsControl } from "../components/filter-sort/FilterEventsControl";
import { VSpace } from "../elements/layout/VSpace";
import { capitalize } from "../util/text";
import { useFilterSortState } from "../data/filter-sort/useFilterSortState";
import {
  defaultDeadlineFilterOptions,
  defaultEventFilterOptions,
  defaultSortOptions,
} from "../data/filter-sort/FilterSortState.type";

export type FilterSortViewProps = StackScreenProps<
  RootStackParamList,
  "FilterSortView"
>;

export const FilterSortView: React.FC<FilterSortViewProps> = ({
  route,
  navigation,
}) => {
  const [filterSortState, setFilterSortState] = useFilterSortState();

  const reset = () => {
    setFilterSortState({
      ...filterSortState,
      [route.params.type]: {
        sortOptions: defaultSortOptions,
        filterOptions:
          route.params.type === "events"
            ? defaultEventFilterOptions
            : defaultDeadlineFilterOptions,
      },
    });
  };

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "back", onPress: navigation.goBack }}
        text={"Sort and Filter " + capitalize(route.params.type)}
        rightIcons={[
          {
            name: "undo",
            onPress: reset,
            size: 20,
          },
        ]}
      />
      <View style={{ paddingVertical: 16 }}>
        <SortControl type={route.params.type} />
        <VSpace height={16} />
        {route.params.type === "deadlines" ? (
          <FilterDeadlinesControl />
        ) : (
          <FilterEventsControl />
        )}
      </View>
    </Container>
  );
};
