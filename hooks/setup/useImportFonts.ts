import { useFonts } from "expo-font";
import {
  IBMPlexSans_300Light,
  IBMPlexSans_400Regular,
  IBMPlexSans_600SemiBold,
  IBMPlexSans_700Bold,
} from "@expo-google-fonts/ibm-plex-sans";

export const ibmPlexSans = {
  300: "IBMPlexSans_300Light",
  400: "IBMPlexSans_400Regular",
  600: "IBMPlexSans_600SemiBold",
  700: "IBMPlexSans_700Bold",
};

export function useImportFonts() {
  const [loaded] = useFonts({
    IBMPlexSans_300Light,
    IBMPlexSans_400Regular,
    IBMPlexSans_600SemiBold,
    IBMPlexSans_700Bold,
  });
  return loaded;
}
