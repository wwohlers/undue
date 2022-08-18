import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { SGText } from "../text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";

export const SGSelect: React.FC<{
  options: string[];
  value: string;
  onChange: (value: string) => void;
}> = ({ options, value, onChange }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        marginVertical: 8,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      {options.map((option, i) => (
        <TouchableWithoutFeedback key={i} onPress={() => onChange(option)}>
          <View
            style={{
              flex: option.length,
              paddingVertical: 8,
              borderColor: theme.BORDER_DARK,
              borderLeftWidth: i > 0 ? 1 : 0,
              backgroundColor:
                option === value ? theme.THEME : theme.OFF_BACKGROUND,
              alignItems: "center",
            }}
          >
            <SGText
              color={option === value ? theme.OFF_BACKGROUND : theme.THEME}
              style={{ textTransform: "uppercase" }}
              fontSize={16}
              fontWeight={option === value ? 600 : 400}
            >
              {option}
            </SGText>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};
