import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useSetup } from "./hooks/setup/useSetup";
import { Home } from "./views/Home";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const ready = useSetup();

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <SafeAreaView>
      <Home />
    </SafeAreaView>
  );
}
