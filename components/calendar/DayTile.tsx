import { DateTime, Info } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useEntriesByDay } from "../../data/entries/useEntries";
import { sortByPriority } from "../../data/Priority.type";
import { HSpace } from "../../elements/layout/HSpace";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useTime } from "../../hooks/time/useTime";
import { DayView } from "./DayView";

export const DayTile: React.FC<{
  day: DateTime;
  parentHeight: number;
  isExpanded: boolean;
  isMinimized: boolean;
  onPressed: () => void;
}> = ({ day, parentHeight, isExpanded, isMinimized, onPressed }) => {
  const theme = useTheme();
  const time = useTime();

  const height = useMemo(() => {
    const baseHeight = parentHeight / 7;
    const expandedHeight = baseHeight * 4.5;
    if (isExpanded) return expandedHeight;
    if (isMinimized) return (parentHeight - expandedHeight) / 6;
    return baseHeight;
  }, [parentHeight, isExpanded, isMinimized]);

  const isToday = useMemo(() => {
    const now = DateTime.now();
    return now > day.startOf("day") && now <= day.endOf("day");
  }, [time]);

  const isPast = useMemo(() => {
    return !isToday && day.endOf("day") < DateTime.now();
  }, [time, isToday]);

  const entries = useEntriesByDay(day);
  const sortedEntries = useMemo(() => {
    return sortByPriority(entries).slice(0, 3);
  }, [entries]);

  const body = useMemo(() => {
    if (isMinimized) {
      return (
        <SGText
          color={theme.OFF_PRIMARY}
          fontSize={16}
          fontWeight={isToday ? 600 : 400}
        >
          {Info.months("short")[day.month - 1]} {day.day.toString()}
        </SGText>
      );
    } else if (isExpanded) {
      return (
        <DayView day={day} />
      );
    } else {
      return sortedEntries.map((e) => {
        return (
          <View key={e.id} style={{ flexDirection: "row" }}>
            <SGText fontWeight={600}>
              {DateTime.fromISO(e.datetime).toFormat("t")}
            </SGText>
            <HSpace width={6} />
            <SGText numberOfLines={1}>{e.title}</SGText>
          </View>
        );
      });
    }
  }, [isMinimized, isExpanded]);

  return (
    <TouchableWithoutFeedback onPress={onPressed}>
      <View
        style={{
          flexDirection: "row",
          height,
          borderColor: theme.OFF_BACKGROUND,
          borderTopWidth: 1,
          paddingVertical: isMinimized ? 4 : 8,
          opacity: isPast ? 0.5 : 1,
          backgroundColor: isToday ? theme.TODAY : theme.BACKGROUND,
        }}
      >
        <View
          style={{
            width: 60,
            alignItems: "flex-end",
            alignSelf: "stretch",
            justifyContent: isMinimized ? "center" : "flex-start",
          }}
        >
          <SGText
            fontSize={isMinimized ? 18 : 20}
            fontWeight={isToday ? 600 : 400}
          >
            {day.weekdayShort}
          </SGText>
          {!isMinimized && (
            <SGText
              color={theme.OFF_PRIMARY}
              fontSize={16}
              fontWeight={isToday ? 600 : 400}
            >
              {Info.months("short")[day.month - 1]} {day.day.toString()}
            </SGText>
          )}
        </View>
        <HSpace width={16} />
        <View
          style={{
            justifyContent: isMinimized ? "center" : "flex-start",
          }}
        >
          {body}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
