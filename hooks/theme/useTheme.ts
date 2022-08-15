import { useColorScheme } from "react-native";
import { useMemo } from "react";

export function useTheme() {
  const colorScheme = useColorScheme();

  return useMemo(() => {
    if (colorScheme === "dark") {
      return {
        THEME: "#DDD",
        BACKGROUND: "#222",
        OFF_BACKGROUND: "#333",
        PRIMARY: "#EEE",
        OFF_PRIMARY: "#AAA",
        OFF_PRIMARY_LIGHT: "#CCC",
        OFF_PRIMARY_DARK: "#666",
        BORDER: "#444",
        BORDER_DARK: "#444",
        TODAY: "#32322b",
        HOLIDAY: "#B64307",
        PRIORITY: {
          LOW: "#00854c",
          MEDIUM: "#b88900",
          HIGH: "#a00000",
        },
      };
    } else {
      return {
        THEME: "#000",
        BACKGROUND: "#FFF",
        OFF_BACKGROUND: "#F8F8F8",
        PRIMARY: "#000",
        OFF_PRIMARY: "#939a9e",
        OFF_PRIMARY_LIGHT: "#aeb1bf",
        OFF_PRIMARY_DARK: "#555",
        BORDER: "#EEE",
        BORDER_DARK: "#DDD",
        TODAY: "#fffdf0",
        HOLIDAY: "#B64307",
        PRIORITY: {
          LOW: "#00b56a",
          MEDIUM: "#ffbf00",
          HIGH: "#cf0000",
        },
      };
    }
  }, [colorScheme]);
}
