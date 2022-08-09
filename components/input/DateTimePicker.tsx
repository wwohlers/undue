import { DateTime } from "luxon";
import React, { useState } from "react";
import { View } from "react-native";
import { SGInput } from "../../elements/input/SGInput";
import { VSpace } from "../../elements/layout/VSpace";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useDayify } from "../../hooks/useDayify";
import { Calendar } from "../calendar/Calendar";
import { DayifyResults } from "./DayifyResults";

export const DateTimePicker: React.FC<{
  initialValue?: DateTime;
  onSubmit: (value: DateTime) => void;
}> = ({ initialValue, onSubmit }) => {
  const theme = useTheme();
  const [input, setInput] = useState("");
  const [containerWidth, setContainerWidth] = useState(0);
  const dayifyResults = useDayify(input);

  return (
    <View
      style={{ flex: 1 }}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <SGInput
        value={input}
        placeholder="Next Monday at 9:30am"
        size={20}
        onChangeText={setInput}
        icon={{
          name: "close",
          onPress: () => setInput(""),
        }}
      />
      <VSpace height={8} />
      {input ? (
        <DayifyResults results={dayifyResults} onSelected={onSubmit} />
      ) : (
        <Calendar containerWidth={containerWidth} />
      )}
    </View>
  );
};
