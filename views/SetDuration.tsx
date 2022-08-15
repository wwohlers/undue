import React from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useEntry } from "../data/entries/useEntries";
import { useEditEntry } from "../data/entries/useEditEntry";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import { DurationPicker } from "../components/set-duration/DurationPicker";
import { DateTime } from "luxon";

export type SetDurationProps = StackScreenProps<
  RootStackParamList,
  "SetDuration"
>;

export const SetDuration: React.FC<SetDurationProps> = ({
  route,
  navigation,
}) => {
  const entry = useEntry(route.params.entryId);
  const editEntry = useEditEntry();
  const [duration, setDuration] = React.useState(
    entry && entry.type === "event" ? entry.duration || 30 : 0
  );

  const onBack = () => {
    if (!entry) return;
    editEntry(entry.id, {
      duration,
    });
    navigation.goBack();
  };

  if (!entry || entry.type === "deadline") {
    navigation.goBack();
    return null;
  }

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "back", onPress: onBack }}
        text={"Set Duration"}
        rightIcons={[]}
      />
      <View style={{ paddingVertical: 16 }}>
        <DurationPicker
          value={duration}
          onChange={setDuration}
          entryStartTime={DateTime.fromISO(entry.datetime)}
        />
      </View>
    </Container>
  );
};
