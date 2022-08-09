import React, { useMemo, useState } from "react";
import { LayoutAnimation, Platform, UIManager, View } from "react-native";
import { useTheme } from "../../hooks/theme/useTheme";
import { getDateTimeOfWeekIndex } from "../../util/time/calendar";
import { DayTile } from "./DayTile";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const CalendarWeek: React.FC<{
  weekIndex: number;
  width: number;
}> = ({ weekIndex, width }) => {
  const theme = useTheme();
  const [containerHeight, setContainerHeight] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | undefined>(undefined);

  const selectDay = (day: number | undefined) => {
    LayoutAnimation.easeInEaseOut();
    setSelectedDay(day);
  };

  const dt = useMemo(() => {
    return getDateTimeOfWeekIndex(weekIndex);
  }, [weekIndex]);

  const dates = useMemo(() => {
    return [0, 1, 2, 3, 4, 5, 6].map(
      (day) => {
        const dayDt = dt.plus({ day });
        const isSelected = selectedDay === day;
        const onPressed = () => {
          if (isSelected) selectDay(undefined);
          else selectDay(day);
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
      },
      [dt]
    );
  }, [weekIndex, containerHeight, selectedDay]);

  return (
    <View
      style={{ width }}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      { dates }
    </View>
  );
};
