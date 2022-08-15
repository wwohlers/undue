import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { FlatList, View } from "react-native";
import {
  useEntriesByDay,
  useFilteredSortedEvents,
  useNumEntries,
} from "../../data/entries/useEntries";
import { Container } from "../../elements/layout/Container";
import { SGHeader } from "../../elements/layout/SGHeader";
import { HomeProps } from "../../views/Home";
import { EntryCard } from "./EntryCard";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useTime } from "../../hooks/time/useTime";
import { getIntro } from "../../util/intro";
import { DateTime } from "luxon";

export const EventsList: React.FC = () => {
  const events = useFilteredSortedEvents();
  const navigation = useNavigation<HomeProps["navigation"]>();
  const numUnfilteredEvents = useNumEntries("event");
  const theme = useTheme();
  const time = useTime();
  const dayEntries = useEntriesByDay(DateTime.now());

  const intro = useMemo(() => {
    return getIntro(DateTime.now(), dayEntries);
  }, [time]);

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
            onPress: () =>
              navigation.navigate("CreateOrEditEntry", { type: "event" }),
          },
        ]}
      />
      <FlatList
        style={{ paddingTop: 8 }}
        data={["intro", ...(!events.length ? ["empty-state"] : []), ...events]}
        renderItem={({ item }) => {
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
            }
            return (
              <SGText
                style={{ textAlign: "center", marginVertical: 8 }}
                color={theme.OFF_PRIMARY}
                fontSize={17}
                key={item}
              >
                {numUnfilteredEvents
                  ? "Oops! No events match your filter criteria."
                  : "Press + in the top right corner to create your first event!"}
              </SGText>
            );
          }
          return <EntryCard entry={item} key={item.id} />;
        }}
      />
    </Container>
  );
};
