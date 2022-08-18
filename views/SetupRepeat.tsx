import React, { useMemo, useState } from "react";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { View } from "react-native";
import { SGSelect } from "../elements/input/SGSelect";
import { RepeatSchedule } from "../data/items/helpers/repeat";
import { DateTime, Info } from "luxon";
import { useItem } from "../data/items/useItems";
import { SGCheckbox } from "../elements/input/SGCheckbox";
import { capitalize } from "../util/text";
import { VSpace } from "../elements/layout/VSpace";
import { SGLabel } from "../elements/text/SGLabel";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useTheme } from "../hooks/theme/useTheme";
import { SGButton } from "../elements/text/SGButton";
import { useSetRepeat } from "../data/items/write/useSetRepeat";

export type SetupRepeatProps = StackScreenProps<
  RootStackParamList,
  "SetupRepeat"
>;

export const SetupRepeat: React.FC<SetupRepeatProps> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();
  const item = useItem(route.params.itemId);
  const minDate = useMemo(() => {
    return item ? DateTime.fromISO(item.datetime) : DateTime.now();
  }, [item]);
  const [repeatSchedule, setRepeatSchedule] = useState<RepeatSchedule>({
    endDate: minDate.plus({ month: 1 }).toISO(),
    interval: "weekly",
    days: [minDate.weekday],
  });
  const setRepeat = useSetRepeat();

  const onIntervalChanged = (interval: string) => {
    const newSchedule = {
      ...repeatSchedule,
      interval,
    } as RepeatSchedule;
    setRepeatSchedule(newSchedule);
  };

  const onDayChanged = (day: number) => () => {
    if (repeatSchedule.interval !== "weekly") return;
    const includesDay = repeatSchedule.days.includes(day);
    const newDays = includesDay
      ? repeatSchedule.days.filter((d) => d !== day)
      : [...repeatSchedule.days, day];
    setRepeatSchedule({
      ...repeatSchedule,
      days: newDays,
    });
  };

  const onSubmit = async () => {
    if (!item) return;
    await setRepeat(item.id, repeatSchedule);
    navigation.goBack();
  };

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "back", onPress: navigation.goBack }}
        text="Setup Repeat"
        rightIcons={[]}
      />
      <View style={{ padding: 8 }}>
        <SGSelect
          options={["daily", "weekly", "monthly", "yearly"]}
          value={repeatSchedule.interval}
          onChange={onIntervalChanged}
        />
        {repeatSchedule.interval === "weekly" && (
          <View
            style={{
              marginVertical: 8,
              padding: 16,
              borderRadius: 8,
              backgroundColor: theme.OFF_BACKGROUND,
            }}
          >
            <SGLabel>Repeat On</SGLabel>
            <VSpace height={4} />
            {Info.weekdays().map((day, i) => (
              <SGCheckbox
                key={day}
                value={repeatSchedule.days.includes(i + 1)}
                onChange={onDayChanged(i + 1)}
                text={capitalize(day)}
                style={{ marginVertical: 2 }}
              />
            ))}
          </View>
        )}
        <VSpace height={16} />
        <SGLabel>End Date</SGLabel>
        <View style={{ width: "100%" }}>
          <RNDateTimePicker
            mode="date"
            display="spinner"
            value={new Date(repeatSchedule.endDate)}
            onChange={(_, date) => {
              if (date) {
                setRepeatSchedule({
                  ...repeatSchedule,
                  endDate: date.toISOString(),
                });
              }
            }}
            minimumDate={minDate.toJSDate()}
            maximumDate={minDate.plus({ year: 10 }).toJSDate()}
          />
        </View>
        <VSpace height={16} />
        <SGButton onPress={onSubmit} text="OK" />
      </View>
    </Container>
  );
};
