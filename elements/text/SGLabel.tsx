import React from "react";
import { usePalette } from "../../hooks/theme/usePalette";
import { SGText } from "./SGText";

export const SGLabel: React.FC<React.ComponentProps<typeof SGText>> = ({
  ...rest
}) => {
  const palette = usePalette();
  return (
    <SGText
      fontSize={12}
      fontWeight={700}
      color={palette.OFF_PRIMARY}
      {...rest}
      style={{ textTransform: "uppercase", ...(rest.style as object) }}
    />
  );
};
