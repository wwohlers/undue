import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { ibmPlexSans } from "../../hooks/setup/useImportFonts";
import { useTheme } from "../../hooks/theme/useTheme";
import { SGIcon, SGIconProps } from "../text/SGIcon";

export const SGInput: React.FC<
  {
    size?: number;
    icon?: SGIconProps;
  } & TextInput["props"]
> = ({ size = 22, icon, ...rest }) => {
  const theme = useTheme();
  if (!icon) {
    return (
      <TextInput
        {...rest}
        style={{
          borderColor: theme.BORDER_DARK,
          borderBottomWidth: 1,
          borderRadius: 2,
          paddingVertical: size * 0.4,
          color: theme.THEME,
          fontSize: size,
          fontFamily: ibmPlexSans[400],
          ...(rest.style as object),
        }}
        placeholderTextColor={theme.OFF_PRIMARY_LIGHT}
      />
    );
  } else {
    return (
      <View
        style={{
          borderColor: theme.BORDER_DARK,
          borderBottomWidth: 1,
          borderRadius: 2,
          flexDirection: "row",
          ...(rest.style as object),
          alignItems: "center"
        }}
      >
        <TextInput
          style={{
            paddingVertical: size * 0.4,
            color: theme.THEME,
            fontSize: size,
            fontFamily: ibmPlexSans[400],
            flex: 1,
          }}
          {...rest}
        />
        <SGIcon size={size + 2} color={theme.OFF_PRIMARY_LIGHT} {...icon} />
      </View>
    );
  }
};
