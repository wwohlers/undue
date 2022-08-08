import { useCallback } from "react";
import { Alert } from "react-native";

export function useYesOrNo() {
  return useCallback((title: string, prompt: string) => {
    return new Promise<boolean>((resolve) => {
      return Alert.alert(title, prompt, [
        {
          text: "No",
          onPress: () => resolve(false),
          style: "cancel",
        },
        { text: "Yes", onPress: () => resolve(true) },
      ]);
    });
  }, []);
}
