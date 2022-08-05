import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "../../hooks/theme/useTheme";

export const SGSpinner: React.FC<ActivityIndicator["props"]> = ({
  ...rest
}) => {
  const theme = useTheme();
  return <ActivityIndicator color={theme.THEME} {...rest} />;
};
