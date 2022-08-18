import React from "react";
import { useTheme } from "../../hooks/theme/useTheme";
import { SGText } from "./SGText";

export const SGLabel: React.FC<React.ComponentProps<typeof SGText>> = ({
  ...rest
}) => {
  const theme = useTheme();
  return (
    <SGText
      fontSize={12}
      fontWeight={700}
      color={theme.OFF_PRIMARY}
      {...rest}
      style={{ textTransform: "uppercase", ...(rest.style as object) }}
    />
  );
};
