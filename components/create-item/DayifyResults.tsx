import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { SGText } from "../../elements/text/SGText";
import { usePalette } from "../../hooks/theme/usePalette";
import { relativeFormat } from "../../util/time/relativeFormat";

export const DayifyResults: React.FC<{
  results: DateTime[];
  onSelected: (dt: DateTime) => void;
}> = ({ results, onSelected }) => {
  const palette = usePalette();

  const resultsList = useMemo(() => {
    return results.map((dt, i) => {
      const time = dt.toFormat("t");
      const date = dt.toFormat("DDD");
      const relativeFormattedDt = relativeFormat(dt);
      return (
        <TouchableHighlight
          key={i}
          onPress={() => onSelected(dt)}
          underlayColor={palette.BORDER_DARK}
          containerStyle={{
            marginVertical: 6,
            overflow: "hidden",
            borderRadius: 8,
          }}
        >
          <View
            style={{
              backgroundColor: palette.OFF_BACKGROUND,
              padding: 12,
              borderRadius: 8,
            }}
          >
            <SGText>
              <SGText fontWeight={600} fontSize={20}>
                {time}
              </SGText>
              <SGText fontSize={18}> on {date}</SGText>
            </SGText>
            <SGText fontSize={16} color={palette.OFF_PRIMARY}>
              {relativeFormattedDt}
            </SGText>
          </View>
        </TouchableHighlight>
      );
    });
  }, [results]);
  return <ScrollView style={{ flex: 1 }}>{resultsList}</ScrollView>;
};
