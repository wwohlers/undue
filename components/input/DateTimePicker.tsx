import { DateTime, DurationLike } from "luxon";
import React, { useState } from "react";
import { View } from "react-native";
import {
  TouchableOpacity
} from "react-native-gesture-handler";
import { SGInput } from "../../elements/input/SGInput";
import { VSpace } from "../../elements/layout/VSpace";
import { SGButton } from "../../elements/text/SGButton";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useDayify } from "../../hooks/useDayify";
import { DayifyResults } from "./DayifyResults";

export const DateTimePicker: React.FC<{
  initialValue?: DateTime;
  onSubmit: (value: DateTime) => void;
}> = ({ initialValue, onSubmit }) => {
  const theme = useTheme();
  const [value, setValue] = useState(initialValue);
  const [input, setInput] = useState("");
  const dayifyResults = useDayify(input);

  const adjustHandler = (plus: boolean, dur: DurationLike) => () => {
    if (plus) setValue(value?.plus(dur));
    else setValue(value?.minus(dur));
  };

  return (
    <View style={{ paddingVertical: 8, flex: 1 }}>
      {value ? (
        <>
          <SGText fontSize={18} color={theme.OFF_PRIMARY}>
            You&apos;ve selected
          </SGText>
          <SGText fontSize={20}>{value.toFormat("DDDD 'at' t")}</SGText>
          <VSpace height={8} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              borderColor: theme.BORDER,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              paddingVertical: 8,
            }}
          >
            <TouchableOpacity onPress={adjustHandler(false, { day: 1 })}>
              <SGText
                color={theme.OFF_PRIMARY}
                style={{
                  textTransform: "uppercase",
                }}
              >
                &ndash; 1 day
              </SGText>
            </TouchableOpacity>
            <TouchableOpacity onPress={adjustHandler(false, { hour: 1 })}>
              <SGText
                color={theme.OFF_PRIMARY}
                style={{
                  textTransform: "uppercase",
                  marginRight: 16,
                }}
              >
                &ndash; 1 hour
              </SGText>
            </TouchableOpacity>
            <TouchableOpacity onPress={adjustHandler(true, { hour: 1 })}>
              <SGText
                color={theme.OFF_PRIMARY}
                style={{
                  textTransform: "uppercase",
                }}
              >
                + 1 hour
              </SGText>
            </TouchableOpacity>
            <TouchableOpacity onPress={adjustHandler(true, { day: 1 })}>
              <SGText
                color={theme.OFF_PRIMARY}
                style={{
                  textTransform: "uppercase",
                }}
              >
                + 1 day
              </SGText>
            </TouchableOpacity>
          </View>
          <VSpace height={16} />
          <SGButton
            text="Submit"
            icon="forward"
            style={{ width: "100%" }}
            onPress={() => onSubmit(value)}
            iconOnRight={true}
          />
          <VSpace height={16} />
        </>
      ) : (
        <SGText fontSize={18} color={theme.OFF_PRIMARY}>
          No date selected yet
        </SGText>
      )}
      <VSpace height={8} />
      <SGInput
        placeholder="Enter a date and time"
        onChangeText={setInput}
      />
      <VSpace height={8} />
      {dayifyResults.length ? (
        <DayifyResults
          results={dayifyResults}
          value={value}
          onSelected={setValue}
        />
      ) : (
        <View style={{ paddingTop: 8 }}>
          <SGText fontSize={16}>Try anything natural, like:</SGText>
          <VSpace height={4} />
          <View style={{ paddingLeft: 8 }}>
            <SGText fontSize={16}> &bull; &quot;in 4 days&quot;</SGText>
            <SGText fontSize={16}> &bull; &quot;August 8th&quot;</SGText>
            <SGText fontSize={16}>
              {" "}
              &bull; &quot;next Wednesday at 8pm&quot;
            </SGText>
            <SGText fontSize={16}> &bull; &quot;tomorrow at noon&quot;</SGText>
          </View>
        </View>
      )}
    </View>
  );
};
