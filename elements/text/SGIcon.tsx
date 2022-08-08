import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

/**
 * https://icons.expo.fyi/
 */

const iconMap = {
  plus: [AntDesign, "plus"],
  calendar: [AntDesign, "calendar"],
  clock: [AntDesign, "clockcircleo"],
  back: [AntDesign, "arrowleft"],
  forward: [AntDesign, "arrowright"],
  edit: [MaterialIcons, "edit"],
  trash: [MaterialIcons, "delete"],
  bell: [FontAwesome5, "bell"],
};

export type SGIconProps = {
  name: keyof typeof iconMap;
  onPress?: () => void;
} & Omit<React.ComponentProps<typeof AntDesign>, "name">;

export const SGIcon: React.FC<SGIconProps> = ({ name, onPress, ...rest }) => {
  const [IconElement, _name] = iconMap[name];
  if (!onPress) {
    return <IconElement name={_name as any} size={24} {...rest} />;
  } else {
    return (
      <TouchableOpacity onPress={onPress}>
        <IconElement name={_name as any} size={24} {...rest} />
      </TouchableOpacity>
    );
  }
};
