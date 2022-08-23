import { DateTime } from "luxon";
import React, { useState } from "react";
import { View } from "react-native";
import { SGInput } from "../../elements/input/SGInput";
import { Container } from "../../elements/layout/Container";
import { SGHeader } from "../../elements/layout/SGHeader";
import { VSpace } from "../../elements/layout/VSpace";
import { SGText } from "../../elements/text/SGText";
import { usePalette } from "../../hooks/theme/usePalette";
import { useDayify } from "../../hooks/useDayify";
import { DayifyResults } from "./DayifyResults";
import { usePickCalendar } from "../../hooks/ui/usePickCalendar";
import { Item } from "../../data/items/Item.type";

export const EnterDateTime: React.FC<{
  type?: Item["type"];
  onBack: () => void;
  onSubmit: (dt: DateTime) => void;
  isActive: boolean;
}> = ({ onBack, onSubmit, isActive }) => {
  const palette = usePalette();
  const [input, setInput] = useState("");
  const dayifyResults = useDayify(input);
  const pickCalendar = usePickCalendar();

  const onCalendarPressed = async () => {
    const dt = await pickCalendar();
    if (dt) {
      onSubmit(dt);
    }
  };

  return (
    <Container>
      <SGHeader
        size={24}
        leftIcon={{ name: "back", onPress: onBack }}
        text={"Pick a Date and Time"}
        rightIcons={[
          {
            name: "calendar",
            onPress: onCalendarPressed,
          },
        ]}
      />
      <View style={{ paddingVertical: 8, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <VSpace height={8} />
          {isActive && (
            <SGInput
              value={input}
              placeholder="tomorrow at 9am"
              autoFocus={true}
              size={20}
              onChangeText={setInput}
              icon={{
                name: "close",
                onPress: () => setInput(""),
              }}
            />
          )}
          <VSpace height={16} />
          {dayifyResults.length ? (
            <DayifyResults results={dayifyResults} onSelected={onSubmit} />
          ) : (
            <View
              style={{
                backgroundColor: palette.OFF_BACKGROUND,
                padding: 16,
                borderRadius: 8,
              }}
            >
              <SGText fontSize={20}>Try</SGText>
              <View style={{ marginLeft: 12, marginTop: 4 }}>
                <SGText>&bull; &quot;tomorrow at noon&quot;</SGText>
                <SGText>&bull; &quot;August 10th at 4:30pm&quot;</SGText>
                <SGText>&bull; &quot;in 6 hours&quot;</SGText>
                <SGText>&bull; &quot;next Thursday at 5&quot;</SGText>
              </View>
            </View>
          )}
        </View>
      </View>
    </Container>
  );
};
