import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ibmPlexSans } from "../../hooks/setup/useImportFonts";
import { usePalette } from "../../hooks/theme/usePalette";
import { SGIcon, SGIconProps } from "../text/SGIcon";

export const SGInput: React.FC<
  {
    size?: number;
    icon?: SGIconProps;
  } & TextInput["props"]
> = ({ size = 20, icon, ...rest }) => {
  const palette = usePalette();
  if (!icon) {
    return (
      <TextInput
        {...rest}
        style={{
          borderColor: palette.THEME,
          borderBottomWidth: 2,
          borderRadius: 2,
          paddingVertical: size * 0.4,
          color: palette.THEME,
          fontSize: size,
          fontFamily: ibmPlexSans[400],
          ...(rest.style as object),
        }}
        placeholderTextColor={palette.OFF_PRIMARY_LIGHT}
      />
    );
  } else {
    return (
      <View
        style={{
          borderColor: palette.THEME,
          borderBottomWidth: 2,
          borderRadius: 2,
          flexDirection: "row",
          ...(rest.style as object),
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            paddingVertical: size * 0.4,
            color: palette.THEME,
            fontSize: size,
            fontFamily: ibmPlexSans[400],
            flex: 1,
          }}
          {...rest}
        />
        <SGIcon size={size + 2} color={palette.OFF_PRIMARY_LIGHT} {...icon} />
      </View>
    );
  }
};
