import { DateTime } from "luxon";
import React, { useMemo, useRef, useState } from "react";
import { Animated, PanResponder, View } from "react-native";
import { SGText } from "../../elements/text/SGText";
import { usePalette } from "../../hooks/theme/usePalette";
import {
  getDateTimeOfDayFactor,
  getDayFactorOfDateTime,
} from "../../util/time/calendar";
import { SGIcon } from "../../elements/text/SGIcon";
import { useTime } from "../../hooks/time/useTime";

const NUM_NOTCHES = 24 * 4; // can be dragged to multiples of 15 mins (24 hours * four 15-min periods)

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function roundToNearest(value: number, nearest: number) {
  return Math.round(value / nearest) * nearest;
}

export const TimeSelector: React.FC<{
  value: DateTime;
  onChange: (value: DateTime) => void;
  width: number;
  height: number;
}> = ({ value, onChange, width, height }) => {
  const [day] = useState(value.startOf("day"));
  const time = useTime();
  const palette = usePalette();
  const position = useRef(
    new Animated.Value(Math.round(height * getDayFactorOfDateTime(value)))
  ).current as Animated.Value & { _value: number };
  const opacity = useRef(new Animated.Value(0.7)).current;
  const lastPosition = useRef(
    Math.round(height * getDayFactorOfDateTime(value))
  );
  const notchHeight = useMemo(() => height / NUM_NOTCHES, [height]);

  const min = useMemo(() => {
    if (day > DateTime.now()) return 0; // not today
    // otherwise, start at the current time
    const msSinceDayStart = time - day.toMillis();
    return (height * msSinceDayStart) / (1000 * 60 * 60 * 24);
  }, [time, day]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderStart: () => {
          Animated.timing(opacity, {
            toValue: 0.9,
            duration: 200,
            useNativeDriver: false,
          }).start();
        },
        onPanResponderMove: (evt, gestureState) => {
          const newPosition = roundToNearest(
            clamp(lastPosition.current + gestureState.dy, min, height),
            notchHeight
          );
          position.setValue(newPosition);
          onChange(getDateTimeOfDayFactor(newPosition / height, day));
        },
        onPanResponderRelease: () => {
          lastPosition.current = position._value;
          Animated.timing(opacity, {
            toValue: 0.5,
            duration: 200,
            useNativeDriver: false,
          }).start();
        },
      }),
    [height, day, min]
  );

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={{
        position: "absolute",
        height: 40,
        width,
        top: Animated.add(position, 6),
        borderColor: palette.THEME,
        borderTopWidth: 4,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        zIndex: 1,
        opacity,
      }}
    >
      <View
        style={{
          backgroundColor: palette.THEME,
          width: width * 0.5,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingBottom: 4,
        }}
      >
        <SGIcon name={"drag"} color={palette.OFF_BACKGROUND} />
        <SGText fontSize={18} color={palette.OFF_BACKGROUND}>
          {value.toFormat("t")}
        </SGText>
      </View>
    </Animated.View>
  );
};
