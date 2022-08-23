import React, { ReactElement, useMemo } from "react";
import { Text } from "react-native";
import { ibmPlexSans } from "../../hooks/setup/useImportFonts";
import { usePalette } from "../../hooks/theme/usePalette";

export const SGText: React.FC<
  {
    children: string | string[] | ReactElement | ReactElement[];
    fontSize?: number;
    fontWeight?: 300 | 400 | 600 | 700;
    color?: string;
  } & Text["props"]
> = ({ children, fontSize = 18, fontWeight = 400, color, ...rest }) => {
  const palette = usePalette();
  color = useMemo(() => color ?? palette.PRIMARY, [palette, color]);
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
