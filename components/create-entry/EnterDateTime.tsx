import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Entry } from "../../data/entries/Entry.type";
import { useEntries, useEntry } from "../../data/entries/useEntries";
import { Container } from "../../elements/layout/Container";
import { SGHeader } from "../../elements/layout/SGHeader";
import { DateTimePicker } from "../input/DateTimePicker";

export const EnterDateTime: React.FC<{
  type?: Entry["type"];
  entryId?: number;
  onBack: () => void;
  onSubmit: (dt: DateTime) => void;
}> = ({ onBack, entryId, onSubmit }) => {
  const [entries] = useEntries();
  const entry = useMemo(
    () => entries.find((e) => e.id === entryId),
    [entries, entryId]
  );
  return (
    <Container>
      <SGHeader
        size={24}
        leftIcon={{ name: "back", onPress: onBack }}
        text={"Pick a Date and Time"}
        rightIcons={[
          {
            name: "calendar",
            onPress: () => null,
          },
        ]}
      />
      <View style={{ paddingVertical: 8, flex: 1 }}>
        <DateTimePicker
          onSubmit={onSubmit}
          initialValue={entry && DateTime.fromISO(entry.datetime)}
        />
      </View>
    </Container>
  );
};
