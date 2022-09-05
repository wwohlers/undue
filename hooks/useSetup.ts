import { useImportFonts } from "./setup/useImportFonts";
import { useSetupNotifications } from "./setup/useSetupNotifications";
import * as Sentry from "sentry-expo";

Sentry.init({
  dsn: "https://3165e0c6815249c18bc16b60faf9b80b@o1385033.ingest.sentry.io/6704133",
  enableInExpoDevelopment: true,
  debug: true,
});

export function useSetup() {
  const fontsLoaded = useImportFonts();
  useSetupNotifications();
  return fontsLoaded;
}
