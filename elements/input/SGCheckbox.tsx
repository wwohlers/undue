import React from "react";
import { SGIcon } from "../text/SGIcon";
import { TouchableOpacity, View } from "react-native";
import { HSpace } from "../layout/HSpace";
import { SGText } from "../text/SGText";

export const SGCheckbox: React.FC<
  {
    value: boolean;
    onChange: (value: boolean) => void;
    text: string;
    size?: number;
  } & View["props"]
> = ({ value, onChange, text, size = 20, ...rest }) => {
  return (
    <TouchableOpacity onPress={() => onChange(!value)}>
      <View
        {...rest}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 5,
          ...(rest.style as object),
        }}
      >
        <SGIcon
          name={value ? "checkboxChecked" : "checkboxEmpty"}
          size={size + 6}
        />
        <HSpace width={6} />
        <SGText fontSize={size - 2}>{text}</SGText>
      </View>
    </TouchableOpacity>
  );
};
