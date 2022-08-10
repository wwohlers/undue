import {
  createNavigationContainerRef,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { DateTime } from "luxon";
import { Suspense, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { Entry } from "./data/entries/Entry.type";
import { SGSpinner } from "./elements/text/SGSpinner";
import { useSetup } from "./hooks/setup/useSetup";
import { useTheme } from "./hooks/theme/useTheme";
import { CreateEntry } from "./views/CreateEntry";
import { Home } from "./views/Home";
import { CalendarView } from "./views/CalendarView";
import { PickReminderDateTime } from "./views/PickReminderDateTime";
import { ViewEntry } from "./views/ViewEntry";
import { rootNavigationRef } from "./rootNavigation";

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Home: undefined;
  ViewEntry: { entryId: number };
  CreateOrEditEntry: { type: Entry["type"] };
  CalendarView:
    | { pickMode: true; initialDateTime?: string }
    | { pickMode: false };
  PickReminderDateTime: { reminderId: number };
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
    <NavigationContainer ref={rootNavigationRef}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar translucent={true} />
        <Suspense fallback={<SGSpinner />}>
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
            <RootStack.Screen
              name="CreateOrEditEntry"
              component={CreateEntry}
            />
            <RootStack.Screen
              name="PickReminderDateTime"
              component={PickReminderDateTime}
            />
            <RootStack.Screen name="CalendarView" component={CalendarView} />
          </RootStack.Navigator>
        </Suspense>
      </SafeAreaView>
    </NavigationContainer>
  );
}
