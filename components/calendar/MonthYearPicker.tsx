import { DateTime, Info } from "luxon";
import React from "react";
import { View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";

const years = Array.from({ length: 5 }, (_, i) => DateTime.now().year + i - 2);

export const MonthYearPicker: React.FC<{
  value: [number, number];
  onSelected: (value: [number, number]) => void;
}> = ({ value, onSelected }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.BACKGROUND,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {years.map((y) => (
          <TouchableWithoutFeedback
            key={y}
            onPress={() => onSelected([value[0], y])}
          >
            <SGText
              fontSize={20}
              color={y === value[1] ? theme.THEME : theme.OFF_PRIMARY_LIGHT}
            >
              {y.toString()}
            </SGText>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <View style={{ alignItems: "center", marginTop: 16, marginBottom: 48 }}>
        {[0, 3, 6, 9].map((startIndex) => (
          <View key={startIndex} style={{ flexDirection: "row" }}>
            {[0, 1, 2].map((i) => {
              const index = startIndex + i;
              const isSelected = index + 1 === value[0];
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => onSelected([index + 1, value[1]])}
                >
                  <View
                    style={{
                      width: 90,
                      height: 90,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: isSelected
                        ? theme.BORDER_DARK
                        : theme.OFF_BACKGROUND,
                      marginHorizontal: 8,
                      marginVertical: 8,
                      borderRadius: 8,
                    }}
                  >
                    <SGText fontSize={22} fontWeight={isSelected ? 600 : 400}>
                      {Info.months("short")[index]}
                    </SGText>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
};
