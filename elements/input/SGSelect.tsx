import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { SGText } from "../text/SGText";
import { usePalette } from "../../hooks/theme/usePalette";

export const SGSelect: React.FC<{
  options: string[];
  value: string;
  onChange: (value: string) => void;
}> = ({ options, value, onChange }) => {
  const palette = usePalette();

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
              borderColor: palette.BORDER_DARK,
              borderLeftWidth: i > 0 ? 1 : 0,
              backgroundColor:
                option === value ? palette.THEME : palette.OFF_BACKGROUND,
              alignItems: "center",
            }}
          >
            <SGText
              color={option === value ? palette.OFF_BACKGROUND : palette.THEME}
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
