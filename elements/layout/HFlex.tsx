import React from "react";
import { View } from "react-native";

type HFlexProps = View["props"];

export const HFlex: React.FC<HFlexProps> = ({ children, ...rest }) => {
  return (
    <View
      {...rest}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        ...(rest.style as object),
      }}
    >
      {children}
    </View>
  );
};
