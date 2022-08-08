import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage } from "jotai/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncStorage = createJSONStorage<any>(() => AsyncStorage);