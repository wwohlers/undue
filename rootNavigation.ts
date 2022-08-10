import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList } from "./App";

export const rootNavigationRef =
  createNavigationContainerRef<RootStackParamList>();
