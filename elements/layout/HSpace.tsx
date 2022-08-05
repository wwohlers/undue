import React from "react";
import { View } from "react-native";

export const HSpace: React.FC<{
  width: number;
}> = ({ width }) => {
  return <View style={{ width }}></View>;
};
