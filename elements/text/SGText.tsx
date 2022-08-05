import React, { useMemo } from "react";
import { Text } from "react-native";
import { ibmPlexSans } from "../../hooks/setup/useImportFonts";
import { useTheme } from "../../hooks/theme/useTheme";

export const SGText: React.FC<
  {
    children: string | string[];
    fontSize?: number;
    fontWeight?: 300 | 400 | 600 | 700;
    color?: string;
  } & Text["props"]
> = ({ children, fontSize = 18, fontWeight = 400, color, ...rest }) => {
  const theme = useTheme();
  color = useMemo(() => color ?? theme.PRIMARY, [theme, color]);
  return (
    <Text
      {...rest}
      style={{
        fontFamily: ibmPlexSans[fontWeight],
        fontSize,
        color,
        ...(rest.style as object),
      }}
    >
      {children}
    </Text>
  );
};
