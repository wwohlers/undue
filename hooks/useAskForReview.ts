import { useCallback } from "react";
import * as StoreReview from "expo-store-review";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HAS_ASKED_STORAGE_KEY = "hasAsked";

export function useAskForReview() {
  return useCallback(async () => {
    const hasAsked = await AsyncStorage.getItem(HAS_ASKED_STORAGE_KEY);
    if (hasAsked !== "true" && (await StoreReview.hasAction())) {
      await AsyncStorage.setItem(HAS_ASKED_STORAGE_KEY, "true");
      await StoreReview.requestReview();
    }
  }, []);
}
