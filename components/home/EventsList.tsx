import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { FlatList, TouchableWithoutFeedback, View } from "react-native";
import { Container } from "../../elements/layout/Container";
import { SGHeader } from "../../elements/layout/SGHeader";
import { HomeProps } from "../../views/Home";
import { ItemCard } from "./ItemCard";
import { SGText } from "../../elements/text/SGText";
import { usePalette } from "../../hooks/theme/usePalette";
import { useTime } from "../../hooks/time/useTime";
import { getRemainingItemsStr, getTimeOfDay } from "../../util/intro";
import { DateTime } from "luxon";
import { useFilteredSortedEvents } from "../../data/items/read/useFilteredSorted";
import { useItemsByType } from "../../data/items/useItems";
import { useItemsByDay } from "../../data/items/read/useItemsByDay";
import { intersperseDates } from "../../util/list";
import { SGLabel } from "../../elements/text/SGLabel";
import { capitalize } from "../../util/text";
import { useFilterSortState } from "../../data/filter-sort/useFilterSortState";
import { SGIcon } from "../../elements/text/SGIcon";
import { HSpace } from "../../elements/layout/HSpace";

export const EventsList: React.FC = () => {
  const events = useFilteredSortedEvents();
  const navigation = useNavigation<HomeProps["navigation"]>();
  const numUnfilteredEvents = useItemsByType("event").length;
  const palette = usePalette();
  const time = useTime();
  const dayItems = useItemsByDay(DateTime.now());
  const [
    {
      events: { sortOptions },
    },
  ] = useFilterSortState();

  const [timeOfDayStr, remainingItemsStr] = useMemo(() => {
    return [
      getTimeOfDay(DateTime.now()),
      getRemainingItemsStr(DateTime.now(), dayItems),
    ];
  }, [time]);

  const interspersedList = useMemo(() => {
    if (
      sortOptions.sortMethod === "chronological" &&
      sortOptions.sortDirection === "ascending"
    ) {
      return intersperseDates(events);
    }
    return events;
  }, [events, sortOptions]);

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
        renderItem={({ item }) => {
          if (typeof item === "string") {
            if (item === "intro") {
              return (
                <TouchableWithoutFeedback
                  onPress={() =>
                    navigation.navigate({
                      name: "CalendarView",
                      params: { pickMode: false },
                    })
                  }
                >
                  <View
                    style={{
                      padding: 16,
                      marginTop: 8,
                      backgroundColor: palette.OFF_BACKGROUND,
                      borderRadius: 8,
                    }}
                  >
                    <SGText fontSize={18} color={palette.THEME}>
                      <SGText>Good {timeOfDayStr}. It&apos;s </SGText>
                      <SGText fontWeight={600}>
                        {DateTime.now().toFormat("cccc, LLLL d")}.
                      </SGText>
                      <SGText> {remainingItemsStr}</SGText>
                    </SGText>
                  </View>
                </TouchableWithoutFeedback>
              );
            } else if (item === "empty-state") {
              return (
                <View style={{ flex: 1, flexDirection: "column" }}>
                  <SGText
                    style={{
                      textAlign: "center",
                      marginVertical: 8,
                    }}
                    color={palette.OFF_PRIMARY}
                    fontSize={17}
                  >
                    {numUnfilteredEvents
                      ? "Oops! No events match your filter criteria."
                      : "Press + in the top right corner to create your first event!"}
                  </SGText>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 200,
                    }}
                  >
                    <SGText
                      style={{
                        textAlign: "center",
                      }}
                      color={palette.OFF_PRIMARY_LIGHT}
                      fontSize={20}
                      fontWeight={600}
                    >
                      Swipe to view tasks
                    </SGText>
                    <HSpace width={6} />
                    <SGIcon
                      name={"forward"}
                      color={palette.OFF_PRIMARY_LIGHT}
                      size={24}
                    />
                  </View>
                </View>
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
