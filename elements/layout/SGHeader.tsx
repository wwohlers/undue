import React from "react";
import { usePalette } from "../../hooks/theme/usePalette";
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
  const palette = usePalette();

  return (
    <HFlex
      style={{
        paddingBottom: 8,
        borderColor: palette.BORDER,
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
