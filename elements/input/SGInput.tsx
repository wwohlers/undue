import React from "react";
import { TextInput } from "react-native-gesture-handler";
import { ibmPlexSans } from "../../hooks/setup/useImportFonts";
import { useTheme } from "../../hooks/theme/useTheme";

export const SGInput: React.FC<
  {
    size?: number;
  } & TextInput["props"]
> = ({ size = 22, ...rest }) => {
  const theme = useTheme();
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
};
