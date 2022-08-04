import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Entry } from "./data/deadlines/Entry.type";
import { SGSpinner } from "./elements/text/SGSpinner";
import { useSetup } from "./hooks/setup/useSetup";
import { useTheme } from "./hooks/theme/useTheme";
import { Home } from "./views/Home";
import { ViewEntry } from "./views/ViewEntry";

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Home: undefined;
  ViewEntry: { entryId: number };
  CreateEntry: { type: Entry["type"] };
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  const ready = useSetup();
  const theme = useTheme();

  useEffect(() => {
    if (ready) {
      SplashScreen.hideAsync();
    }
  }, [ready]);

  if (!ready) {
    return null;
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Suspense fallback={SGSpinner}>
          <RootStack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
              cardStyle: {
                backgroundColor: theme.BACKGROUND,
              },
            }}
          >
            <RootStack.Screen name="Home" component={Home} />
            <RootStack.Screen name="ViewEntry" component={ViewEntry} />
          </RootStack.Navigator>
        </Suspense>
      </SafeAreaView>
    </NavigationContainer>
  );
}
