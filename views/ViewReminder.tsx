import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList } from "../App";
import { ReminderDetails } from "../components/view-entry/ReminderDetails";
import { useReminder } from "../data/reminders/useReminders";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import { SGText } from "../elements/text/SGText";

export type ViewReminderProps = StackScreenProps<
  RootStackParamList,
  "ViewReminder"
>;

export const ViewReminder: React.FC<ViewReminderProps> = ({
  route,
  navigation,
}) => {
  const reminder = useReminder(route.params.reminderId);

  return (
    <Container>
      <SGHeader
        size={24}
        headerText={reminder?.notes ?? "View Reminder" }
        leftIcon={{
          name: "back",
          onPress: () => navigation.goBack(),
        }}
        rightIcons={
          reminder
            ? [
                {
                  name: "trash",
                  onPress: () => null,
                },
              ]
            : []
        }
      />
      <ScrollView>
        {reminder ? (
          <ReminderDetails reminder={reminder} />
        ) : (
          <SGText>
            Oops! We couldn&apos;t find what you&apos;re looking for.
          </SGText>
        )}
      </ScrollView>
    </Container>
  );
};
