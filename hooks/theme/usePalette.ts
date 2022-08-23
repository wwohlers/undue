import { useColorScheme } from "react-native";
import { useMemo } from "react";
import {
  useFinalTheme,
  useThemeSetting,
} from "../../data/settings/useThemeSetting";

export function usePalette() {
  const theme = useFinalTheme();

  return useMemo(() => {
    if (theme === "dark") {
      return {
        THEME: "#DDD",
        BACKGROUND: "#222",
        OFF_BACKGROUND: "#2A2A2A",
        PRIMARY: "#EEE",
        OFF_PRIMARY: "#999",
        OFF_PRIMARY_LIGHT: "#666",
        OFF_PRIMARY_DARK: "#CCC",
        BORDER: "#444",
        BORDER_LIGHT: "#333",
        BORDER_DARK: "#555",
        TODAY: "#2d2d28",
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
        BORDER_LIGHT: "#F0F0F0",
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
  }, [theme]);
}
