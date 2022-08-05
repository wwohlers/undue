import type { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList } from "../App";
import { EntryDetails } from "../components/view-entry/EntryDetails";
import { ReminderCard } from "../components/view-entry/ReminderCard";
import { useEntry } from "../data/deadlines/useEntries";
import { useEntryReminders } from "../data/reminders/useReminders";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import { VSpace } from "../elements/layout/VSpace";
import { SGText } from "../elements/text/SGText";

export type ViewEntryProps = StackScreenProps<RootStackParamList, "ViewEntry">;

export const ViewEntry: React.FC<ViewEntryProps> = ({ route, navigation }) => {
  const entry = useEntry(route.params.entryId);
  const reminders = useEntryReminders(route.params.entryId);

  return (
    <Container>
      <SGHeader
        headerText={entry?.title ?? "Not Found"}
        leftIcon={{
          name: "back",
          onPress: () => navigation.navigate("Home"),
        }}
        rightIcons={
          entry
            ? [
                {
                  name: "trash",
                  onPress: () => null,
                },
              ]
            : []
        }
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
        {entry ? (
          <>
            <EntryDetails entry={entry} />
            <VSpace height={8} />
            {reminders.map((r) => (
              <ReminderCard key={r.id} reminder={r} />
            ))}
          </>
        ) : (
          <SGText>
            Oops! We couldn&apos;t find what you&apos;re looking for.
          </SGText>
        )}
      </ScrollView>
    </Container>
  );
};
