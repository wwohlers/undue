import { useImportFonts } from "./useImportFonts";
import { useSetupNotifications } from "./useSetupNotifications";

export function useSetup() {
  const fontsLoaded = useImportFonts();
  useSetupNotifications();
  return fontsLoaded;
}