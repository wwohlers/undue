import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { relativeFormat } from "../../util/time/relativeFormat";

export const DayifyResults: React.FC<{
  results: DateTime[];
  onSelected: (dt: DateTime) => void;
}> = ({ results, onSelected }) => {
  const theme = useTheme();

  const resultsList = useMemo(() => {
    return results.map((dt, i) => {
      const absoluteFormattedDt = dt.toFormat("t 'on' DDD");
      const relativeFormattedDt = relativeFormat(dt);
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
              backgroundColor: theme.OFF_BACKGROUND,
              padding: 12,
              borderRadius: 8,
            }}
          >
            <SGText fontSize={18}>
              {absoluteFormattedDt}
            </SGText>
            <SGText fontSize={16} color={theme.OFF_PRIMARY}>
              {relativeFormattedDt}
            </SGText>
          </View>
        </TouchableHighlight>
      );
    });
  }, [results]);
  return <ScrollView style={{ flex: 1 }}>{resultsList}</ScrollView>;
};
