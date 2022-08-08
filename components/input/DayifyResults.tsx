import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { relativeFormat } from "../../util/time/relativeFormat";

export const DayifyResults: React.FC<{
  results: DateTime[];
  value?: DateTime;
  onSelected: (dt: DateTime) => void;
}> = ({ results, value, onSelected }) => {
  const theme = useTheme();
  const resultsList = useMemo(() => {
    return results.map((dt, i) => {
      const absoluteFormattedDt = dt.toFormat("DDDD 'at' t");
      const relativeFormattedDt = relativeFormat(dt);
      const isSelected = value?.toMillis() === dt.toMillis();
      return (
        <TouchableHighlight
          key={i}
          onPress={() => onSelected(dt)}
          underlayColor={theme.BORDER_DARK}
          containerStyle={{
            marginVertical: 6,
            overflow: "hidden",
            borderRadius: 8,
          }}
        >
          <View
            style={{
              backgroundColor: isSelected ? theme.BORDER : theme.OFF_BACKGROUND,
              padding: 12,
              borderRadius: 8,
            }}
          >
            <SGText fontSize={18} fontWeight={isSelected ? 600 : 400}>
              {absoluteFormattedDt}
            </SGText>
            <SGText fontSize={16} color={theme.OFF_PRIMARY}>
              {relativeFormattedDt}
            </SGText>
          </View>
        </TouchableHighlight>
      );
    });
  }, [results, value]);
  return (
    <ScrollView style={{ flex: 1 }}>
      {resultsList}
    </ScrollView>
  );
};
