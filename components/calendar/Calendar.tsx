import { DateTime, Info } from "luxon";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { HSpace } from "../../elements/layout/HSpace";
import { SGIcon } from "../../elements/text/SGIcon";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { capitalize } from "../../util/capitalize";
import {
  getMonthYearOfWeekIndex,
  getWeekIndexOfMonthYear,
} from "../../util/time/calendar";
import { CalendarWeek } from "./CalendarWeek";
import { MonthYearPicker } from "./MonthYearPicker";

/**
 * range is the range of week indices that the calendar can "render" at once.
 * Render in quotes because the FlatList component by design only actually
 * renders the components that need to be visible.
 *
 * We allow the user to scroll 52 weeks in either direction, plus the starting
 * week, for a total of 52 + 1 + 52 = 105 weeks, indices -52 through 52.
 *
 * Note that this doesn't mean the user can only view 52 weeks in either direction;
 * they can change the center week index by selecting a different month or year,
 * which shifts all the values in this range accordingly.
 */
const range = Array.from({ length: 105 }, (_, i) => i - 52);

export const Calendar: React.FC<{
  containerWidth: number;
}> = ({ containerWidth }) => {
  const [scrollIndex, setScrollIndex] = useState(52); // actual index scrolled to
  const [centerWeekIndex, setCenterWeekIndex] = useState(0); // week index at scroll index 52
  const [showMonthYearPicker, setShowMonthYearPicker] = useState(false);

  const monthYear = useMemo(
    () => getMonthYearOfWeekIndex(centerWeekIndex + (scrollIndex - 52)),
    [centerWeekIndex, scrollIndex]
  );

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollIndex(
      Math.round(
        event.nativeEvent.contentOffset.x /
          event.nativeEvent.layoutMeasurement.width
      )
    );
  };

  const setMonthYear = (value: [number, number]) => {
    setCenterWeekIndex(getWeekIndexOfMonthYear(value));
  };

  const centeredRange = useMemo(
    () => range.map((w) => w + centerWeekIndex),
    [centerWeekIndex]
  );

  if (!containerWidth) return null;

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback
        onPress={() => setShowMonthYearPicker(!showMonthYearPicker)}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 8,
          }}
        >
          <SGText fontSize={24}>
            {capitalize(Info.months()[monthYear[0] - 1])}{" "}
            {monthYear[1].toString()}
          </SGText>
          <HSpace width={6} />
          <SGIcon name={showMonthYearPicker ? "up" : "down"} size={22} />
        </View>
      </TouchableWithoutFeedback>
      {showMonthYearPicker ? (
        <MonthYearPicker value={monthYear} onSelected={setMonthYear} />
      ) : (
        <FlatList
          initialScrollIndex={scrollIndex}
          data={centeredRange}
          style={{ flex: 1 }}
          renderItem={({ item }) => (
            <CalendarWeek weekIndex={item} width={containerWidth} />
          )}
          onScroll={onScroll}
          contentContainerStyle={{ width: containerWidth * range.length }}
          scrollEventThrottle={100}
          horizontal={true}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      )}
    </View>
  );
};
