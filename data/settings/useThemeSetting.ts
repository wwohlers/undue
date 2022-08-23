import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../persist";
import { useAtom } from "jotai";
import { useMemo } from "react";
import { useColorScheme } from "react-native";

export type ThemeSetting = "system" | "light" | "dark";

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

  return useMemo(() => {
    if (themeSetting === "system") {
      if (colorScheme) return colorScheme;
      return "light";
    }
    return themeSetting;
  }, [themeSetting, colorScheme]);
}
