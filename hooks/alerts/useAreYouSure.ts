import { useCallback } from "react";
import { Alert } from "react-native";

export function useAreYouSure() {
  return useCallback((title: string, prompt: string) => {
    return new Promise<boolean>((resolve) => {
      return Alert.alert(title, prompt, [
        {
          text: "Cancel",
          onPress: () => resolve(false),
          style: "cancel",
        },
        { text: "OK", onPress: () => resolve(true) },
      ]);
    });
  }, []);
}
