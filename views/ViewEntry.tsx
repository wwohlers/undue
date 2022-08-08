import type { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList } from "../App";
import { EntryDetails } from "../components/view-entry/EntryDetails";
import { ReminderCard } from "../components/view-entry/ReminderCard";
import { useEntry } from "../data/entries/useEntries";
import { useRemoveEntry } from "../data/entries/useRemoveEntry";
import { useCreateReminder } from "../data/reminders/useCreateReminder";
import { useEntryReminders } from "../data/reminders/useReminders";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import { VSpace } from "../elements/layout/VSpace";
import { SGButton } from "../elements/text/SGButton";
import { SGText } from "../elements/text/SGText";
import { useTheme } from "../hooks/theme/useTheme";
import { useAreYouSure } from "../hooks/alerts/useAreYouSure";

export type ViewEntryProps = StackScreenProps<RootStackParamList, "ViewEntry">;

export const ViewEntry: React.FC<ViewEntryProps> = ({ route, navigation }) => {
  const entry = useEntry(route.params.entryId);
  const reminders = useEntryReminders(route.params.entryId);
  const theme = useTheme();
  const removeEntry = useRemoveEntry();
  const createReminder = useCreateReminder();
  const areYouSure = useAreYouSure();

  const onTrash = async () => {
    if (!entry) return;
    if (
      await areYouSure(
        `Delete ${entry.title}?`,
        `Are you sure you want to delete this ${entry.type}? Reminders will also be cancelled.`
      )
    ) {
      navigation.goBack();
      removeEntry(route.params.entryId);
    }
  };

  const onAddReminder = async () => {
    if (!entry) return;
    const reminder = await createReminder({
      entryId: entry.id,
      datetime: entry.datetime,
    });
    if (!reminder) return;
    navigation.navigate("PickReminderDateTime", { reminderId: reminder.id })
  };

  return (
    <Container>
      <SGHeader
        text={entry?.title ?? "Not Found"}
        leftIcon={{
          name: "back",
          onPress: () => navigation.navigate("Home"),
        }}
        rightIcons={
          entry
            ? [
                {
                  name: "trash",
                  onPress: onTrash,
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
            {reminders.length ? (
              reminders.map((r) => <ReminderCard key={r.id} reminder={r} />)
            ) : (
              <SGText
                style={{
                  textAlign: "center",
                  color: theme.OFF_PRIMARY,
                  marginVertical: 16,
                }}
              >
                You don&apos;t have any reminders set
              </SGText>
            )}
            <VSpace height={4} />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <SGButton icon="plus" text="Add Reminder" onPress={onAddReminder} />
            </View>
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
