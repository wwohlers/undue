import { StackScreenProps } from "@react-navigation/stack";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../App";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import Slider from "@react-native-community/slider";
import { useTheme } from "../hooks/theme/useTheme";
import { SGText } from "../elements/text/SGText";
import { DateTime, Interval } from "luxon";
import { useReminder } from "../data/reminders/useReminders";
import { useEntries } from "../data/entries/useEntries";
import { absoluteFormat } from "../util/time/absoluteFormat";
import { capitalize } from "../util/capitalize";
import {
  getDateFromFactor,
  getDateRangeFactor,
  getInterval,
} from "../util/time/dateRangeFactor";
import { factorToSlider, sliderToFactor } from "../util/time/diminishingTime";
import { relativeDiffStr } from "../util/time/relativeFormat";
import { SGButton } from "../elements/text/SGButton";
import { useEditReminder } from "../data/reminders/useEditReminder";

export type PickReminderDateTimeProps = StackScreenProps<
  RootStackParamList,
  "PickReminderDateTime"
>;

export const PickReminderDateTime: React.FC<PickReminderDateTimeProps> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();
  const reminder = useReminder(route.params.reminderId);
  const [entries] = useEntries();
  const entry = useMemo(
    () => entries.find((e) => e.id === reminder?.entryId),
    [entries, reminder]
  );
  const interval = useMemo(() => !!entry && getInterval(entry), [entry]);
  const editReminder = useEditReminder();

  if (!entry || !reminder || !interval) {
    navigation.goBack();
    return null;
  }

  const [dateFactor, setDateFactor] = useState(
    getDateRangeFactor(interval, DateTime.fromISO(reminder.datetime))
  );

  const onSliderValueChange = (value: number) => {
    setDateFactor(sliderToFactor(value));
  };

  const selectedDate = useMemo(() => {
    return getDateFromFactor(interval, dateFactor);
  }, [interval, dateFactor]);

  const relativeStr = useMemo(() => {
    const diff = DateTime.fromISO(entry.datetime).diff(selectedDate, [
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
    ]);
    const diffStr = relativeDiffStr(diff);
    if (diffStr === "now") return `at your ${entry.type}`;
    return `${relativeDiffStr(diff)} before ${entry.title}`;
  }, [selectedDate, entry.datetime]);

  const onSubmit = async () => {
    await editReminder(reminder.id, { datetime: selectedDate.toISO() });
    navigation.goBack();
  }

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "back", onPress: navigation.goBack }}
        text="Pick a Date and Time"
        size={24}
        rightIcons={[
          {
            name: "calendar",
          },
        ]}
      />
      <View style={{ paddingVertical: 24 }}>
        <View style={{ alignItems: "center" }}>
          <SGText fontSize={22}>{selectedDate.toFormat("DDD 'at' t")}</SGText>
          <SGText fontSize={18} color={theme.OFF_PRIMARY}>
            {relativeStr}
          </SGText>
        </View>
        <Slider
          value={factorToSlider(dateFactor)}
          step={0.01}
          onValueChange={onSliderValueChange}
          style={{ width: "100%", marginTop: 16, marginBottom: 8 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={theme.THEME}
          maximumTrackTintColor={theme.OFF_PRIMARY}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 16,
          }}
        >
          <View>
            <SGText fontSize={16} color={theme.OFF_PRIMARY}>
              Now
            </SGText>
            <SGText fontSize={18}>{DateTime.now().toFormat("LLLL d")}</SGText>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <SGText fontSize={16} color={theme.OFF_PRIMARY}>
              Your {entry.type}
            </SGText>
            <SGText fontSize={18}>
              {capitalize(absoluteFormat(DateTime.fromISO(entry.datetime)))}
            </SGText>
          </View>
        </View>
        <SGButton text="Set Date and Time" onPress={onSubmit} />
      </View>
    </Container>
  );
};
