import { useRoute } from "@react-navigation/native";
import { DateTime } from "luxon";
import React, { useEffect, useMemo, useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { HSpace } from "../../elements/layout/HSpace";
import { SGText } from "../../elements/text/SGText";
import { usePalette } from "../../hooks/theme/usePalette";
import { buildDayViewList } from "../../util/time/calendar";
import { CalendarProps } from "../../views/CalendarView";
import { TimeSelector } from "./TimeSelector";
import { useIsMount } from "../../hooks/ui/useIsMount";
import { useDebounce } from "../../hooks/useDebounce";
import { getUSHoliday } from "../../util/holidays";
import { useItemsByDay } from "../../data/items/read/useItemsByDay";

const ITEM_LINE_HEIGHT = 20;
const HOURS = Array.from({ length: 24 / 3 }, (_, i) => i * 3);

export const DayView: React.FC<{
  day: DateTime;
  onMinimize: () => void;
  onChange: (dt: DateTime) => void;
}> = ({ day, onMinimize, onChange }) => {
  const route = useRoute<CalendarProps["route"]>();
  const initialTime = useMemo(() => {
    if (!route.params.pickMode) return undefined;
    if (!route.params.initialDateTime)
      return day
        .set({
          hour: DateTime.now().hour,
          minute: DateTime.now().minute,
        })
        .endOf("hour");
    const dt = DateTime.fromISO(route.params.initialDateTime);
    const ideal = day.set({
      hour: dt.hour,
      minute: dt.minute,
    });
    if (ideal < DateTime.now()) return DateTime.now().endOf("hour");
    return ideal;
  }, [route.params]);
  const palette = usePalette();
  const items = useItemsByDay(day);
  const [selectedTime, setSelectedTime] = useState(initialTime);
  const isMount = useIsMount();
  const [containerHeight, setContainerHeight] = useState(0);
  const [bodyWidth, setBodyWidth] = useState(0);

  const holiday = useMemo(() => {
    return getUSHoliday(day);
  }, [day]);

  const isPast = useMemo(() => {
    return day.endOf("day") < DateTime.now();
  }, [day]);

  const availableHeight = containerHeight - 40;

  const dayViewList = useMemo(() => {
    if (containerHeight) {
      return buildDayViewList(items, availableHeight, ITEM_LINE_HEIGHT);
    }
    return [];
  }, [items, containerHeight]);

  const committedTime = useDebounce(selectedTime, 500);
  useEffect(() => {
    if (committedTime && !isMount) {
      onChange(committedTime);
    }
  }, [committedTime]);

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
              color={palette.BORDER_DARK}
            >
              {dt.toFormat("h")}
            </SGText>
          );
        })}
      </View>
      <View
        style={{ flex: 1 }}
        onLayout={(e) => setBodyWidth(e.nativeEvent.layout.width)}
      >
        {!!selectedTime && !!containerHeight && !isPast && (
          <TimeSelector
            value={selectedTime}
            onChange={setSelectedTime}
            width={bodyWidth}
            height={availableHeight}
          />
        )}
        <TouchableWithoutFeedback onPress={onMinimize}>
          <View style={{ flex: 1 }}>
            {holiday && (
              <View>
                <SGText color={palette.HOLIDAY} fontWeight={600}>
                  {holiday}
                </SGText>
              </View>
            )}
            {Object.entries(dayViewList).map(([pos, items]) => {
              return (
                <View
                  key={pos}
                  style={{
                    position: "absolute",
                    top: Number(pos) + (holiday ? ITEM_LINE_HEIGHT : 0),
                    flexDirection: "row",
                  }}
                >
                  <SGText color={palette.OFF_PRIMARY}>
                    {DateTime.fromISO(items[0].datetime).toFormat("t")}
                  </SGText>
                  <HSpace width={6} />
                  <SGText numberOfLines={1}>
                    {items.map((e) => e.title).join(", ")}
                  </SGText>
                </View>
              );
            })}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};
