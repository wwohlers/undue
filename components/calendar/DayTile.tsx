import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { sortByPriority } from "../../data/Priority.type";
import { HSpace } from "../../elements/layout/HSpace";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useTime } from "../../hooks/time/useTime";
import { DayView } from "./DayView";
import { getUSHoliday } from "../../util/holidays";
import { useItemsByDay } from "../../data/items/read/useItemsByDay";

export const DayTile: React.FC<{
  day: DateTime;
  parentHeight: number;
  isExpanded: boolean;
  isMinimized: boolean;
  onPressed: () => void;
  onChange: (dt: DateTime) => void;
}> = ({ day, parentHeight, isExpanded, isMinimized, onPressed, onChange }) => {
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

  const holiday = useMemo(() => {
    return getUSHoliday(day);
  }, []);

  const items = useItemsByDay(day);
  const sortedItems = useMemo(() => {
    return sortByPriority(items).slice(0, holiday ? 2 : 3);
  }, [items]);

  const backgroundColor = useMemo(() => {
    if (isToday) return theme.TODAY;
    if (day.weekday % 2 === 1) return theme.OFF_BACKGROUND;
  }, [isToday, theme]);

  const borderTopWidth = useMemo(() => {
    return day.day === 1 ? 2 : 0;
  }, []);

  const body = useMemo(() => {
    if (isMinimized) {
      return (
        <TouchableWithoutFeedback onPress={onPressed}>
          <SGText
            color={theme.OFF_PRIMARY}
            fontSize={16}
            fontWeight={isToday ? 600 : 400}
          >
            {day.toFormat("L/dd")}
          </SGText>
        </TouchableWithoutFeedback>
      );
    } else if (isExpanded) {
      return <DayView day={day} onMinimize={onPressed} onChange={onChange} />;
    } else {
      return (
        <TouchableWithoutFeedback onPress={onPressed}>
          <View style={{ height }}>
            {holiday && (
              <SGText color={theme.HOLIDAY} fontWeight={600}>
                {holiday}
              </SGText>
            )}
            {sortedItems.map((e) => (
              <View key={e.id} style={{ flexDirection: "row" }}>
                <SGText color={theme.OFF_PRIMARY}>
                  {DateTime.fromISO(e.datetime).toFormat("t")}
                </SGText>
                <HSpace width={6} />
                <SGText numberOfLines={1}>{e.title}</SGText>
              </View>
            ))}
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }, [isMinimized, isExpanded, height]);

  return (
    <View
      style={{
        flexDirection: "row",
        height,
        paddingVertical: isMinimized ? 4 : 8,
        opacity: isPast ? 0.3 : 1,
        backgroundColor,
        borderColor: theme.THEME,
        borderTopWidth,
        borderRadius: 8,
      }}
    >
      <TouchableWithoutFeedback onPress={onPressed}>
        <View
          style={{
            width: 60,
            alignItems: "flex-end",
            alignSelf: "stretch",
            justifyContent: isMinimized ? "center" : "flex-start",
            paddingTop: isMinimized ? 3 : 0,
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
              {day.toFormat("L/dd")}
            </SGText>
          )}
        </View>
      </TouchableWithoutFeedback>
      <HSpace width={16} />
      <View
        style={{
          justifyContent: isMinimized ? "center" : "flex-start",
          flex: 1,
        }}
      >
        {body}
      </View>
    </View>
  );
};
