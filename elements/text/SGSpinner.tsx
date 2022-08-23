import React from "react";
import { ActivityIndicator } from "react-native";
import { usePalette } from "../../hooks/theme/usePalette";

export const SGSpinner: React.FC<ActivityIndicator["props"]> = ({
  ...rest
}) => {
  const palette = usePalette();
  return <ActivityIndicator color={palette.THEME} {...rest} />;
};
