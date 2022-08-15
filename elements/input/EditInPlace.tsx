import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useTheme } from "../../hooks/theme/useTheme";
import { SGText } from "../text/SGText";
import { SGInput } from "./SGInput";

export const EditInPlace: React.FC<{
  value: string | undefined;
  emptyText: string;
  placeholder?: string;
  onSubmit: (value: string) => void;
  size?: number;
  multiline?: boolean;
}> = ({
  value,
  onSubmit,
  size = 18,
  emptyText,
  placeholder,
  multiline = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const theme = useTheme();

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  const _onSubmit = () => {
    onSubmit(inputValue);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <TouchableWithoutFeedback onPress={() => setIsEditing(true)}>
        <SGText fontSize={size} color={value ? theme.THEME : theme.OFF_PRIMARY}>
          {value || emptyText}
        </SGText>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <SGInput
      style={{ fontSize: size, padding: 4, paddingLeft: 0, paddingTop: 0 }}
      value={inputValue}
      placeholder={placeholder}
      onSubmitEditing={_onSubmit}
      onBlur={_onSubmit}
      onChangeText={setInputValue}
      multiline={multiline}
      autoFocus={true}
    />
  );
};
