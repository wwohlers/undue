import { SGInput } from "../../elements/input/SGInput";
import { View } from "react-native";
import React, { useState } from "react";
import { DateTime } from "luxon";
import { Priority } from "../../data/Priority.type";
import { useTheme } from "../../hooks/theme/useTheme";
import { useCreateItem } from "../../data/items/write/useCreateItem";

export const QuickAddDeadline: React.FC = () => {
  const theme = useTheme();
  const [input, setInput] = useState("");
  const createItem = useCreateItem();

  const onSubmit = () => {
    if (!input) return;
    const dt =
      DateTime.now().hour <= 20
        ? DateTime.now().set({ hour: 21 }).startOf("hour")
        : DateTime.now().plus({ days: 1 }).set({ hour: 9 }).startOf("hour");
    createItem({
      type: "deadline",
      title: input,
      datetime: dt.toISO(),
      priority: Priority.LOW,
      completed: false,
      repeatSchedule: undefined,
    });
    setInput("");
  };

  return (
    <View
      style={{
        backgroundColor: theme.OFF_BACKGROUND,
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
      }}
    >
      <SGInput
        value={input}
        placeholder="Quick add..."
        onChangeText={setInput}
        onSubmitEditing={onSubmit}
        style={{
          borderBottomColor: theme.BORDER_DARK,
          borderBottomWidth: 1,
          paddingHorizontal: 4,
          paddingVertical: 4,
        }}
      />
    </View>
  );
};
