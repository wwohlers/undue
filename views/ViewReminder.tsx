import { StackScreenProps } from "@react-navigation/stack";
import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { RootStackParamList } from "../App";
import { useReminder } from "../data/reminders/useReminders";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import { useMinutely } from "../hooks/time/useMinutely";
import { useTime } from "../hooks/time/useTime";
import { absoluteFormat } from "../util/time/absoluteFormat";

export type ViewReminderProps = StackScreenProps<RootStackParamList, "ViewReminder">;

export const ViewReminder: React.FC<ViewReminderProps> = ({ route, navigation }) => {
  const reminder = useReminder(route.params.reminderId);
  const min10 = useMinutely(10);

  const absoluteFormattedDt = useMemo(() => {
    return reminder ? absoluteFormat(DateTime.fromISO(reminder.datetime)) : "Not Found";
  }, [reminder, min10]);
  
  return (
    <Container>
      <SGHeader
        headerText={reminder?.notes ?? absoluteFormattedDt}
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
    </Container>
  )
}