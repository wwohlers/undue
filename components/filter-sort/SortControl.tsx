import React from "react";
import { TouchableOpacity, View } from "react-native";
import {
  FilterSortState,
  SortOptions,
} from "../../data/filter-sort/FilterSortState.type";
import { SGLabel } from "../../elements/text/SGLabel";
import { SGIcon } from "../../elements/text/SGIcon";
import { useFilterSortState } from "../../data/filter-sort/useFilterSortState";
import { HSpace } from "../../elements/layout/HSpace";
import { VSpace } from "../../elements/layout/VSpace";
import { useSetSortOptions } from "../../data/filter-sort/useSetSortOptions";
import { SGText } from "../../elements/text/SGText";
import { capitalize } from "../../util/text";
import { usePalette } from "../../hooks/theme/usePalette";

const sortMethods = [
  "alphabetical",
  "chronological",
  "priority",
] as SortOptions["sortMethod"][];

export const SortControl: React.FC<{
  type: keyof FilterSortState;
}> = ({ type }) => {
  const [filterSortState] = useFilterSortState();
  const { sortOptions } = filterSortState[type];
  const setSortOptions = useSetSortOptions(type);
  const palette = usePalette();

  const onMethodPressed = () => {
    const oldIndex = sortMethods.indexOf(sortOptions.sortMethod);
    setSortOptions({
      ...sortOptions,
      sortMethod: sortMethods[(oldIndex + 1) % sortMethods.length],
    });
  };

  const onDirectionPressed = () => {
    setSortOptions({
      ...sortOptions,
      sortDirection:
        sortOptions.sortDirection === "ascending" ? "descending" : "ascending",
    });
  };

  return (
    <View
      style={{
        padding: 16,
        backgroundColor: palette.OFF_BACKGROUND,
        borderRadius: 8,
      }}
    >
      <SGLabel>Sort</SGLabel>
      <VSpace height={4} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <SGIcon
          name={sortOptions.sortDirection}
          size={26}
          onPress={onDirectionPressed}
        />
        <HSpace width={8} />
        <TouchableOpacity onPress={onMethodPressed}>
          <SGText fontSize={20}>{capitalize(sortOptions.sortMethod)}</SGText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
