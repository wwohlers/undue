import {AntDesign, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons,} from "@expo/vector-icons";
import React, {useEffect, useRef} from "react";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Animated} from "react-native";
import {useTheme} from "../../hooks/theme/useTheme";

/**
 * https://icons.expo.fyi/
 */

const iconMap = {
  plus: [AntDesign, "plus"],
  calendar: [AntDesign, "calendar"],
  clock: [AntDesign, "clockcircleo"],
  back: [AntDesign, "left"],
  forward: [AntDesign, "arrowright"],
  up: [AntDesign, "up"],
  down: [AntDesign, "down"],
  edit: [MaterialIcons, "edit"],
  trash: [MaterialIcons, "delete"],
  bell: [FontAwesome5, "bell"],
  close: [AntDesign, "close"],
  drag: [MaterialIcons, "drag-handle"],
  check: [Feather, "check"],
  checkboxEmpty: [MaterialCommunityIcons, "checkbox-blank-outline"],
  checkboxChecked: [MaterialCommunityIcons, "checkbox-marked"],
  filter: [Ionicons, "filter"],
  ascending: [MaterialCommunityIcons, "sort-ascending"],
  descending: [MaterialCommunityIcons, "sort-descending"],
  undo: [FontAwesome5, "undo"],
};

export type SGIconProps = {
  name: keyof typeof iconMap;
  onPress?: () => void;
  disabled?: boolean;
  pulse?: boolean;
} & Omit<React.ComponentProps<typeof AntDesign>, "name">;

export const SGIcon: React.FC<SGIconProps> = ({
  name,
  onPress,
  disabled = false,
  pulse = false,
  ...rest
}) => {
  const [IconElement, _name] = iconMap[name];
  const theme = useTheme();

  const pulseAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (pulse && !disabled) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            delay: 200,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [pulse, disabled]);

  if (!onPress) {
    return (
      <IconElement
        style={{ opacity: disabled ? 0.5 : 1 }}
        name={_name as any}
        size={24}
        color={theme.THEME}
        {...rest}
      />
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} disabled={disabled}>
        <Animated.View
          style={{
            transform: [{ scale: pulseAnim }],
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <IconElement
            name={_name as any}
            size={24}
            color={theme.THEME}
            {...rest}
          />
        </Animated.View>
      </TouchableOpacity>
    );
  }
};
