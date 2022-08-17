import { StackScreenProps } from "@react-navigation/stack";
import { DateTime } from "luxon";
import React, { useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../App";
import { Calendar } from "../components/calendar/Calendar";
import { useCalendarPicker } from "../data/calendar/useCalendarPicker";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";

export type CalendarProps = StackScreenProps<
  RootStackParamList,
  "CalendarView"
>;

export const CalendarView: React.FC<CalendarProps> = ({
  route,
  navigation,
}) => {
  const initialValue =
    route.params.pickMode && route.params.initialDateTime
      ? DateTime.fromISO(route.params.initialDateTime)
      : undefined;
  const [containerWidth, setContainerWidth] = useState(0);
  const [selectedValue, setSelectedValue] = useState<DateTime | undefined>(
    undefined
  );
  const [_, setCalendarPicker] = useCalendarPicker();

  const title = route.params.pickMode
    ? "Pick a Date and Time"
    : "View Calendar";

  const onBack = () => {
    setCalendarPicker({
      selectedValue: undefined,
      cancelled: true,
      confirmed: false,
    });
    navigation.goBack();
  };

  const onSubmit = () => {
    setCalendarPicker({
      selectedValue,
      confirmed: true,
      cancelled: false,
    });
    navigation.goBack();
  };

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "back", onPress: onBack }}
        text={title}
        rightIcons={
          route.params.pickMode
            ? [
                {
                  name: "check",
                  onPress: onSubmit,
                  pulse: true,
                  disabled: !selectedValue,
                },
              ]
            : []
        }
      />
      <View
        style={{ flex: 1 }}
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
      >
        <Calendar
          containerWidth={containerWidth}
          initialValue={initialValue}
          onChange={setSelectedValue}
        />
      </View>
    </Container>
  );
};
