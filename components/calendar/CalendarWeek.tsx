import { DateTime } from "luxon";
import React, { useMemo, useState } from "react";
import { LayoutAnimation, Platform, UIManager, View } from "react-native";
import { useTheme } from "../../hooks/theme/useTheme";
import { getDateTimeOfWeekIndex, isInWeek } from "../../util/time/calendar";
import { DayTile } from "./DayTile";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const CalendarWeek: React.FC<{
  weekStart: DateTime;
  width: number;
  initialValue?: DateTime;
}> = ({ weekStart, width, initialValue }) => {
  const theme = useTheme();
  const [containerHeight, setContainerHeight] = useState(0);
  const [selectedDay, setSelectedDay] = useState<DateTime | undefined>(
    initialValue && isInWeek(initialValue, weekStart)
      ? initialValue.startOf("day")
      : undefined
  );

  const selectDay = (day: DateTime | undefined) => {
    LayoutAnimation.easeInEaseOut();
    setSelectedDay(day);
  };

  const dates = useMemo(() => {
    return [0, 1, 2, 3, 4, 5, 6].map((day) => {
      const dayDt = weekStart.plus({ day });
      const isSelected = !!selectedDay && selectedDay?.equals(dayDt);
      const onPressed = () => {
        if (isSelected) selectDay(undefined);
        else selectDay(dayDt);
      };
      return (
        <DayTile
          key={day}
          day={dayDt}
          parentHeight={containerHeight}
          isExpanded={isSelected}
          isMinimized={selectedDay !== undefined && !isSelected}
          onPressed={onPressed}
        />
      );
    });
  }, [weekStart, containerHeight, selectedDay]);

  return (
    <View
      style={{ width }}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      {dates}
    </View>
  );
};
