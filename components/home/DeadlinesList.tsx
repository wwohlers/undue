import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { FlatList } from "react-native";
import { Container } from "../../elements/layout/Container";
import { SGHeader } from "../../elements/layout/SGHeader";
import { HomeProps } from "../../views/Home";
import { ItemCard } from "./ItemCard";
import { QuickAddDeadline } from "./QuickAddDeadline";
import { SGText } from "../../elements/text/SGText";
import { usePalette } from "../../hooks/theme/usePalette";
import { useFilteredSortedDeadlines } from "../../data/items/read/useFilteredSorted";
import { useItemsByType } from "../../data/items/useItems";
import { intersperseDates } from "../../util/list";
import { SGLabel } from "../../elements/text/SGLabel";
import { capitalize } from "../../util/text";

export const DeadlinesList: React.FC = () => {
  const deadlines = useFilteredSortedDeadlines();
  const navigation = useNavigation<HomeProps["navigation"]>();
  const numUnfilteredDeadlines = useItemsByType("deadline").length;
  const palette = usePalette();

  const interspersedList = useMemo(
    () => intersperseDates(deadlines),
    [deadlines]
  );

  return (
    <Container>
      <SGHeader
        leftIcon={{
          name: "clock",
          onPress: () =>
            navigation.navigate({
              name: "CalendarView",
              params: { pickMode: false },
            }),
        }}
        text="Tasks"
        rightIcons={[
          {
            name: "filter",
            onPress: () =>
              navigation.navigate("FilterSortView", { type: "deadlines" }),
          },
          {
            name: "plus",
            onPress: () =>
              navigation.navigate("CreateItem", { type: "deadline" }),
          },
        ]}
      />
      <FlatList
        style={{ paddingTop: 8 }}
        data={[
          "quick-add-deadline",
          ...(!deadlines.length ? ["empty-state"] : []),
          ...interspersedList,
        ]}
        keyExtractor={(item) =>
          typeof item === "string" ? item : item.id.toString()
        }
        renderItem={({ item }) => {
          if (typeof item === "string") {
            if (item === "quick-add-deadline") {
              return <QuickAddDeadline />;
            } else if (item === "empty-state") {
              return (
                <SGText
                  style={{ textAlign: "center", marginVertical: 8 }}
                  color={palette.OFF_PRIMARY}
                  fontSize={17}
                >
                  {numUnfilteredDeadlines
                    ? "Oops! No tasks match your filter criteria."
                    : "Press + in the top right corner to create your first task!"}
                </SGText>
              );
            } else {
              return (
                <SGLabel style={{ marginTop: 16 }}>{capitalize(item)}</SGLabel>
              );
            }
          }
          return <ItemCard item={item} />;
        }}
      />
    </Container>
  );
};
