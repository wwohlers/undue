import { isDevice } from "expo-device";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { Notification } from "expo-notifications";
import { useTheme } from "../theme/useTheme";
import { rootNavigationRef } from "../../rootNavigation";

export function useSetupNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
  Notifications.addNotificationResponseReceivedListener((response) => {
    handleNotificationPressed(response.notification);
  });
  registerForPushNotificationsAsync();
}

function handleNotificationPressed(notification: Notification) {
  const itemId = notification.request.content.data.itemId;
  if (itemId && typeof itemId === "number" && rootNavigationRef.current) {
    rootNavigationRef.current.navigate("ViewItem", {
      itemId,
    });
  }
}

async function registerForPushNotificationsAsync() {
  const theme = useTheme();
  if (isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // failed to get token
      return;
    }
    // token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: theme.THEME,
    });
  }
}
