import React from "react";
import { View } from "react-native";

export const VSpace: React.FC<{
  height: number;
}> = ({ height }) => {
  return <View style={{ height }}></View>;
};
