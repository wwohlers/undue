import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../persist";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { useTime } from "../../hooks/time/useTime";
import { DateTime } from "luxon";

export type ThemeSetting = "system" | "light" | "dark" | "auto";

const themeSettingAtom = atomWithStorage<ThemeSetting>(
  "themeSetting",
  "system", // defer to system theme
  asyncStorage
);

export function useThemeSetting() {
  return useAtom(themeSettingAtom);
}

export function useFinalTheme(): "light" | "dark" {
  const [themeSetting] = useThemeSetting();
  const colorScheme = useColorScheme();
  const time = useTime();

  return useMemo(() => {
    if (themeSetting === "system") {
      if (colorScheme) return colorScheme;
      return "light";
    } else if (themeSetting === "auto") {
      const hour = DateTime.now().hour;
      if (hour >= 5 && hour < 20) return "light";
      return "dark";
    }
    return themeSetting;
  }, [themeSetting, colorScheme, time]);
}
