import React from "react";
import { ScrollView, View } from "react-native";

export type ContainerProps =
  | ({
      scrollable?: false;
    } & View["props"])
  | ({
      scrollable?: false;
    } & ScrollView["props"]);

export const Container: React.FC<ContainerProps> = ({
  scrollable = false,
  children,
  ...rest
}) => {
  const Element = scrollable ? ScrollView : View;
  return (
    <Element
      {...rest}
      style={{
        paddingHorizontal: 20,
        flex: 1,
        ...(rest.style as object),
      }}
    >
      {children}
    </Element>
  );
};
