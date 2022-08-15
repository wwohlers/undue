import React from "react";
import { useTheme } from "../../hooks/theme/useTheme";
import { SGIcon, SGIconProps } from "../text/SGIcon";
import { SGText } from "../text/SGText";
import { HFlex } from "./HFlex";

type SGHeaderProps = {
  size?: number;
  leftIcon?: SGIconProps;
  text: string;
  rightIcons: SGIconProps[];
};

export const SGHeader: React.FC<SGHeaderProps> = ({
  size = 22,
  leftIcon,
  text,
  rightIcons,
}) => {
  const theme = useTheme();

  return (
    <HFlex
      style={{
        paddingBottom: 8,
        borderColor: theme.BORDER,
        borderBottomWidth: 1,
      }}
    >
      <HFlex style={{ justifyContent: "flex-start", flex: 1 }}>
        {!!leftIcon && (
          <SGIcon
            size={size}
            {...leftIcon}
            style={{
              marginRight: 8,
              ...(leftIcon.style as object),
            }}
          />
        )}
        <SGText fontSize={size} style={{ flex: 1 }} numberOfLines={1}>
          {text}
        </SGText>
      </HFlex>
      <HFlex style={{ justifyContent: "flex-start" }}>
        {rightIcons.map((icon, i) => (
          <SGIcon
            key={i}
            size={size + 4}
            {...icon}
            style={{
              marginRight: 8,
              ...(icon.style as object),
            }}
          />
        ))}
      </HFlex>
    </HFlex>
  );
};
