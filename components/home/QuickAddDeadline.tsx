import { SGInput } from "../../elements/input/SGInput";
import { View } from "react-native";
import React, { useState } from "react";
import { DateTime } from "luxon";
import { Priority } from "../../data/Priority.type";
import { usePalette } from "../../hooks/theme/usePalette";
import { useCreateItem } from "../../data/items/write/useCreateItem";

export const QuickAddDeadline: React.FC = () => {
  const palette = usePalette();
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
        backgroundColor: palette.OFF_BACKGROUND,
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
          borderBottomColor: palette.BORDER_DARK,
          borderBottomWidth: 1,
          paddingHorizontal: 4,
          paddingVertical: 4,
        }}
      />
    </View>
  );
};
