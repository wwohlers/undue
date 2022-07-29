import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useImportFonts } from "./hooks/useFonts";
import * as SplashScreen from 'expo-splash-screen';
import { SGText } from "./elements/SGText";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const appLoaded = useImportFonts();

  useEffect(() => {
    if (appLoaded) {
      SplashScreen.hideAsync();
    }
  }, [appLoaded])

  if (!appLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SGText>Open up App.tsx to start working on your app!</SGText>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
