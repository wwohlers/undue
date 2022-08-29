import { useImportFonts } from "./setup/useImportFonts";
import { useSetupNotifications } from "./setup/useSetupNotifications";

export function useSetup() {
  const fontsLoaded = useImportFonts();
  useSetupNotifications();
  return fontsLoaded;
}
