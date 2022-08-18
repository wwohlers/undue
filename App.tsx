import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Suspense, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { SGSpinner } from "./elements/text/SGSpinner";
import { useSetup } from "./hooks/setup/useSetup";
import { useTheme } from "./hooks/theme/useTheme";
import { CreateItem } from "./views/CreateItem";
import { Home } from "./views/Home";
import { CalendarView } from "./views/CalendarView";
import { PickReminderDateTime } from "./views/PickReminderDateTime";
import { ViewItem } from "./views/ViewItem";
import { rootNavigationRef } from "./rootNavigation";
import { SetDuration } from "./views/SetDuration";
import { FilterSortState } from "./data/filter-sort/FilterSortState.type";
import { FilterSortView } from "./views/FilterSortView";
import Toast from "react-native-toast-message";
import { useToastConfig } from "./hooks/useToastConfig";
import { Item } from "./data/items/Item.type";
import { SetupRepeat } from "./views/SetupRepeat";

SplashScreen.preventAutoHideAsync();

export type RootStackParamList = {
  Home: undefined;
  ViewItem: { itemId: number };
  CreateItem: { type: Item["type"] };
  CalendarView:
    | { pickMode: true; initialDateTime?: string }
    | { pickMode: false };
  PickReminderDateTime: { initialDateTime: string; itemId: number };
  SetDuration: { itemId: number };
  FilterSortView: { type: keyof FilterSortState };
  SetupRepeat: { itemId: number };
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  const ready = useSetup();
  const theme = useTheme();
  const toastConfig = useToastConfig();

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
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.BACKGROUND }}>
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
            <RootStack.Screen name="ViewItem" component={ViewItem} />
            <RootStack.Screen name="CreateItem" component={CreateItem} />
            <RootStack.Screen
              name="PickReminderDateTime"
              component={PickReminderDateTime}
            />
            <RootStack.Screen name="CalendarView" component={CalendarView} />
            <RootStack.Screen name="SetDuration" component={SetDuration} />
            <RootStack.Screen
              name="FilterSortView"
              component={FilterSortView}
            />
            <RootStack.Screen name="SetupRepeat" component={SetupRepeat} />
          </RootStack.Navigator>
        </Suspense>
        <Toast config={toastConfig} topOffset={64} />
      </SafeAreaView>
    </NavigationContainer>
  );
}
