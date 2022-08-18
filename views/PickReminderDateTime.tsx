import { StackScreenProps } from "@react-navigation/stack";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { RootStackParamList } from "../App";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import Slider from "@react-native-community/slider";
import { useTheme } from "../hooks/theme/useTheme";
import { SGText } from "../elements/text/SGText";
import { DateTime } from "luxon";
import { absoluteFormat } from "../util/time/absoluteFormat";
import { capitalize } from "../util/text";
import {
  getDateFromFactor,
  getDateRangeFactor,
  getInterval,
} from "../util/time/dateRangeFactor";
import { factorToSlider, sliderToFactor } from "../util/time/diminishingTime";
import { relativeDiffStr } from "../util/time/relativeFormat";
import { SGButton } from "../elements/text/SGButton";
import { VSpace } from "../elements/layout/VSpace";
import { useItems } from "../data/items/useItems";
import { useReminderPicker } from "../data/reminder-picker/useReminderPicker";

export type PickReminderDateTimeProps = StackScreenProps<
  RootStackParamList,
  "PickReminderDateTime"
>;

export const PickReminderDateTime: React.FC<PickReminderDateTimeProps> = ({
  route,
  navigation,
}) => {
  const theme = useTheme();
  const [items] = useItems();
  const item = useMemo(
    () => items.find((e) => e.id === route.params.itemId),
    [items, route]
  );
  const interval = useMemo(() => !!item && getInterval(item), [item]);
  const [_, setReminderPicker] = useReminderPicker();

  const cancel = () => {
    setReminderPicker({
      selectedValue: undefined,
      confirmed: false,
      cancelled: true,
    });
    navigation.goBack();
  };

  if (!item || !interval) {
    cancel();
    return null;
  }

  const [dateFactor, setDateFactor] = useState(
    getDateRangeFactor(interval, DateTime.fromISO(route.params.initialDateTime))
  );

  const onSliderValueChange = (value: number) => {
    setDateFactor(sliderToFactor(value));
  };

  const selectedDate = useMemo(() => {
    return getDateFromFactor(interval, dateFactor);
  }, [interval, dateFactor]);

  const relativeStr = useMemo(() => {
    const diff = DateTime.fromISO(item.datetime).diff(selectedDate, [
      "years",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
    ]);
    const diffStr = relativeDiffStr(diff);
    if (diffStr === "now") return `at your ${item.type}`;
    return `${relativeDiffStr(diff)} before ${item.title}`;
  }, [selectedDate, item.datetime]);

  const onSubmit = async () => {
    setReminderPicker({
      selectedValue: selectedDate,
      confirmed: true,
      cancelled: false,
    });
    navigation.goBack();
  };

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "back", onPress: cancel }}
        text="Set Your Reminder"
        rightIcons={[]}
      />
      <View style={{ paddingVertical: 32 }}>
        <View style={{ alignItems: "center" }}>
          <SGText fontSize={22}>
            {selectedDate.toFormat("cccc, LLLL d 'at' t")}
          </SGText>
          <SGText fontSize={18} color={theme.OFF_PRIMARY}>
            {relativeStr}
          </SGText>
        </View>
        <VSpace height={8} />
        <Slider
          value={factorToSlider(dateFactor)}
          step={0.01}
          onValueChange={onSliderValueChange}
          style={{ width: "100%", marginTop: 16, marginBottom: 8 }}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={theme.THEME}
          maximumTrackTintColor={theme.OFF_PRIMARY_LIGHT}
        />
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 24,
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
              Your {item.type}
            </SGText>
            <SGText fontSize={18}>
              {capitalize(absoluteFormat(DateTime.fromISO(item.datetime)))}
            </SGText>
          </View>
        </View>
        <VSpace height={16} />
        <SGButton text="OK" onPress={onSubmit} />
      </View>
    </Container>
  );
};
