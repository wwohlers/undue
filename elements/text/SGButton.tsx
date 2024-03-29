import React, { useMemo } from "react";
import { View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { usePalette } from "../../hooks/theme/usePalette";
import { HSpace } from "../layout/HSpace";
import { SGIcon, SGIconProps } from "./SGIcon";
import { SGText } from "./SGText";

const buttonStyles = (palette: ReturnType<typeof usePalette>) => {
  return {
    primary: {
      backgroundColor: palette.THEME,
      color: palette.BACKGROUND,
      highlightColor: palette.OFF_PRIMARY,
    },
  };
};

export const SGButton: React.FC<
  {
    onPress: () => void;
    type?: keyof ReturnType<typeof buttonStyles>;
    size?: number;
    text: string;
    icon?: SGIconProps["name"];
    iconOnRight?: boolean;
    disabled?: boolean;
  } & View["props"]
> = ({
  onPress,
  type = "primary",
  size = 18,
  icon,
  text,
  disabled = false,
  iconOnRight = false,
  ...rest
}) => {
  const palette = usePalette();
  const styles = useMemo(() => buttonStyles(palette)[type], [type, palette]);

  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={1}
      underlayColor={styles.highlightColor}
      containerStyle={{
        backgroundColor: disabled
          ? styles.highlightColor
          : styles.backgroundColor,
        alignSelf: "stretch",
        overflow: "hidden",
        borderRadius: 4,
      }}
    >
      <View
        {...rest}
        style={{
          display: "flex",
          flexDirection: iconOnRight ? "row-reverse" : "row",
          justifyContent: "center",
          paddingVertical: size * 0.45,
          paddingHorizontal: size * 0.8,
          alignItems: "center",
          ...(rest.style as object),
        }}
      >
        {!!icon && <SGIcon size={size} color={styles.color} name={icon} />}
        <HSpace width={size * 0.6} />
        <SGText
          fontSize={size}
          color={styles.color}
          style={{ textTransform: "uppercase" }}
          fontWeight={600}
        >
          {text}
        </SGText>
      </View>
    </TouchableHighlight>
  );
};
