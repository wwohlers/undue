import React, { useMemo } from "react";
import { View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useTheme } from "../../hooks/theme/useTheme";
import { SGIcon, SGIconProps } from "./SGIcon";
import { SGText } from "./SGText";

const buttonStyles = (theme: ReturnType<typeof useTheme>) => {
  return {
    primary: {
      backgroundColor: theme.THEME,
      color: theme.BACKGROUND,
      highlightColor: theme.OFF_PRIMARY_DARK,
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
  } & View["props"]
> = ({ onPress, type = "primary", size = 20, icon, text, ...rest }) => {
  const theme = useTheme();
  const styles = useMemo(() => buttonStyles(theme)[type], [type, theme]);

  return (
    <TouchableHighlight
      onPress={onPress}
      activeOpacity={1}
      underlayColor={styles.highlightColor}
      containerStyle={{
        backgroundColor: styles.backgroundColor,
        alignSelf: "flex-start",
        overflow: "hidden",
        borderRadius: 4,
      }}
    >
      <View
        {...rest}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingVertical: size * 0.5,
          paddingHorizontal: size * 0.8,
          alignItems: "center",
          ...(rest.style as object),
        }}
      >
        {!!icon && (
          <SGIcon
            size={size}
            color={styles.color}
            style={{ marginRight: size * 0.6 }}
            name={icon}
          />
        )}
        <SGText
          fontSize={size}
          color={styles.color}
          style={{ textTransform: "uppercase" }}
        >
          {text}
        </SGText>
      </View>
    </TouchableHighlight>
  );
};
