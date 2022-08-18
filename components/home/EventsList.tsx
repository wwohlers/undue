import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import { Container } from "../../elements/layout/Container";
import { SGHeader } from "../../elements/layout/SGHeader";
import { HomeProps } from "../../views/Home";
import { ItemCard } from "./ItemCard";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useTime } from "../../hooks/time/useTime";
import { getIntro } from "../../util/intro";
import { DateTime } from "luxon";
import { useFilteredSortedEvents } from "../../data/items/read/useFilteredSorted";
import { useItemsByType } from "../../data/items/useItems";
import { useItemsByDay } from "../../data/items/read/useItemsByDay";
import { intersperseDates } from "../../util/list";
import { SGLabel } from "../../elements/text/SGLabel";
import { capitalize } from "../../util/text";

export const EventsList: React.FC = () => {
  const events = useFilteredSortedEvents();
  const navigation = useNavigation<HomeProps["navigation"]>();
  const numUnfilteredEvents = useItemsByType("event").length;
  const theme = useTheme();
  const time = useTime();
  const dayItems = useItemsByDay(DateTime.now());

  const intro = useMemo(() => {
    return getIntro(DateTime.now(), dayItems);
  }, [time]);

  const interspersedList = useMemo(() => intersperseDates(events), [events]);

  return (
    <Container>
      <SGHeader
        leftIcon={{
          name: "calendar",
          onPress: () =>
            navigation.navigate({
              name: "CalendarView",
              params: { pickMode: false },
            }),
        }}
        text="Events"
        rightIcons={[
          {
            name: "filter",
            onPress: () =>
              navigation.navigate("FilterSortView", { type: "events" }),
          },
          {
            name: "plus",
            onPress: () => navigation.navigate("CreateItem", { type: "event" }),
          },
        ]}
      />
      <FlatList
        style={{ paddingTop: 8 }}
        data={[
          "intro",
          ...(!events.length ? ["empty-state"] : []),
          ...interspersedList,
        ]}
        keyExtractor={(item) =>
          typeof item === "string" ? item : item.id.toString()
        }
        renderItem={({ item, index }) => {
          if (typeof item === "string") {
            if (item === "intro") {
              return (
                <View
                  style={{
                    padding: 16,
                    marginVertical: 8,
                    backgroundColor: theme.OFF_BACKGROUND,
                    borderRadius: 8,
                  }}
                >
                  <SGText fontSize={18} color={theme.THEME}>
                    {intro}
                  </SGText>
                </View>
              );
            } else if (item === "empty-state") {
              return (
                <SGText
                  style={{ textAlign: "center", marginVertical: 8 }}
                  color={theme.OFF_PRIMARY}
                  fontSize={17}
                >
                  {numUnfilteredEvents
                    ? "Oops! No events match your filter criteria."
                    : "Press + in the top right corner to create your first event!"}
                </SGText>
              );
            } else {
              return (
                <SGLabel style={{ marginTop: 16 }}>{capitalize(item)}</SGLabel>
              );
            }
          } else {
            return <ItemCard item={item} />;
          }
        }}
      />
    </Container>
  );
};
