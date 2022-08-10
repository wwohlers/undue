import { useRoute } from "@react-navigation/native";
import { DateTime } from "luxon";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { useEntriesByDay } from "../../data/entries/useEntries";
import { HSpace } from "../../elements/layout/HSpace";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { buildDayViewList } from "../../util/time/calendar";
import { CalendarProps } from "../../views/CalendarView";

const ENTRY_LINE_HEIGHT = 20;
const HOURS = Array.from({ length: 24 / 3 }, (_, i) => i * 3);

export const DayView: React.FC<{
  day: DateTime;
}> = ({ day }) => {
  const route = useRoute<CalendarProps["route"]>();
  const theme = useTheme();
  const entries = useEntriesByDay(day);
  const [containerHeight, setContainerHeight] = useState(0);

  const availableHeight = containerHeight - ENTRY_LINE_HEIGHT;

  const dayViewList = useMemo(() => {
    if (containerHeight) {
      return buildDayViewList(entries, containerHeight, ENTRY_LINE_HEIGHT);
    }
    return [];
  }, [entries, containerHeight]);

  return (
    <View
      style={{ flex: 1, flexDirection: "row" }}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <View style={{ width: 30 }}>
        {HOURS.map((hour) => {
          const dt = day.plus({ hour });
          return (
            <SGText
              key={hour}
              style={{
                position: "absolute",
                top: (availableHeight * hour) / 24,
              }}
              color={theme.BORDER_DARK}
            >
              {dt.toFormat("h")}
            </SGText>
          );
        })}
      </View>
      <View style={{ flex: 1 }}>
        {Object.entries(dayViewList).map(([pos, entries]) => {
          return (
            <View
              key={pos}
              style={{
                position: "absolute",
                top: Number(pos),
                flexDirection: "row",
              }}
            >
              <SGText fontWeight={600}>
                {DateTime.fromISO(entries[0].datetime).toFormat("t")}
              </SGText>
              <HSpace width={6} />
              <SGText numberOfLines={1}>
                {entries.map((e) => e.title).join(", ")}
              </SGText>
            </View>
          );
        })}
      </View>
    </View>
  );
};
