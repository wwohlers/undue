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
        THEME: "#334155",
        BACKGROUND: "#fbfbfe",
        OFF_BACKGROUND: "#f1f5f9",
        PRIMARY: "#1e293b",
        OFF_PRIMARY: "#94a3b8",
        OFF_PRIMARY_LIGHT: "#cbd5e1",
        OFF_PRIMARY_DARK: "#64748b",
        BORDER: "#e2e8f0",
        BORDER_LIGHT: "#f1f5f9",
        BORDER_DARK: "#cbd5e1",
        TODAY: "#fffef7",
        HOLIDAY: "#e35454",
        PRIORITY: {
          LOW: "#00b56a",
          MEDIUM: "#ffbf00",
          HIGH: "#cf0000",
        },
      };
    }
  }, [theme]);
}
