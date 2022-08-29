import React from "react";
import { TouchableHighlight, View } from "react-native";
import { SGText } from "../../../elements/text/SGText";
import { usePalette } from "../../../hooks/theme/usePalette";

export const SettingsCard: React.FC<{
  options: {
    fragment: React.ReactNode;
    onPress: () => void;
  }[];
}> = ({ options }) => {
  const palette = usePalette();

  return (
    <View
      style={{
        backgroundColor: palette.OFF_BACKGROUND,
        borderRadius: 8,
        marginBottom: 16,
      }}
    >
      {options.map(({ fragment, onPress }, index) => (
        <TouchableHighlight
          key={index}
          onPress={onPress}
          style={{ borderRadius: 8 }}
          underlayColor={palette.BORDER}
        >
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderColor: palette.BORDER,
              borderBottomWidth: index === options.length - 1 ? 0 : 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {fragment}
          </View>
        </TouchableHighlight>
      ))}
    </View>
  );
};
