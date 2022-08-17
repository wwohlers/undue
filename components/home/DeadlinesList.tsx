import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList } from "react-native";
import { Container } from "../../elements/layout/Container";
import { SGHeader } from "../../elements/layout/SGHeader";
import { HomeProps } from "../../views/Home";
import { ItemCard } from "./ItemCard";
import { QuickAddDeadline } from "./QuickAddDeadline";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useFilteredSortedDeadlines } from "../../data/items/read/useFilteredSorted";
import { useItemsByType } from "../../data/items/useItems";

export const DeadlinesList: React.FC = () => {
  const deadlines = useFilteredSortedDeadlines();
  const navigation = useNavigation<HomeProps["navigation"]>();
  const numUnfilteredDeadlines = useItemsByType("deadline").length;
  const theme = useTheme();

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
        text="Deadlines"
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
          ...deadlines,
        ]}
        renderItem={({ item }) => {
          if (typeof item === "string") {
            if (item === "quick-add-deadline") {
              return <QuickAddDeadline key={item} />;
            } else {
              return (
                <SGText
                  style={{ textAlign: "center", marginVertical: 8 }}
                  color={theme.OFF_PRIMARY}
                  fontSize={17}
                  key={item}
                >
                  {numUnfilteredDeadlines
                    ? "Oops! No deadlines match your filter criteria."
                    : "Press + in the top right corner to create your first deadline!"}
                </SGText>
              );
            }
          }
          return <ItemCard item={item} key={item.id} />;
        }}
      />
    </Container>
  );
};
