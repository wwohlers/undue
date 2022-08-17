import { View } from "react-native";
import { DateTime } from "luxon";
import { SGText } from "../../elements/text/SGText";
import { SGLabel } from "../../elements/text/SGLabel";
import { SGIcon } from "../../elements/text/SGIcon";
import { VSpace } from "../../elements/layout/VSpace";
import { padLeadingZero } from "../../util/text";
import React, { useMemo } from "react";

export const DurationPicker: React.FC<{
  value: number;
  onChange: (value: number) => void;
  itemStartTime: DateTime;
}> = ({ value, onChange, itemStartTime }) => {
  const addHours = (hours: number) => {
    onChange(Math.max(0, value + hours * 60));
  };

  const addMinutes = (minutes: number) => {
    onChange(Math.max(0, value + minutes));
  };

  const endTime = useMemo(() => {
    return itemStartTime.plus({ minutes: value });
  }, [value]);

  return (
    <View style={{ paddingVertical: 8 }}>
      <View style={{ alignItems: "center" }}>
        <SGLabel>Start time</SGLabel>
        <SGText fontSize={22}>{itemStartTime.toFormat("ff")}</SGText>
      </View>
      <VSpace height={24} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <SGIcon size={32} name={"up"} onPress={() => addHours(1)} />
          <SGText fontSize={64}>{Math.floor(value / 60).toString()}</SGText>
          <SGIcon size={32} name={"down"} onPress={() => addHours(-1)} />
        </View>
        <SGText fontSize={24} style={{ marginLeft: 4, marginRight: 18 }}>
          h
        </SGText>
        <View style={{ alignItems: "center" }}>
          <SGIcon size={32} name={"up"} onPress={() => addMinutes(15)} />
          <SGText fontSize={64}>{padLeadingZero(value % 60)}</SGText>
          <SGIcon size={32} name={"down"} onPress={() => addMinutes(-15)} />
        </View>
        <SGText fontSize={24} style={{ marginLeft: 4 }}>
          m
        </SGText>
      </View>
      <VSpace height={24} />
      <View style={{ alignItems: "center" }}>
        <SGLabel>end time</SGLabel>
        <SGText fontSize={22}>{endTime.toFormat("ff")}</SGText>
      </View>
    </View>
  );
};
