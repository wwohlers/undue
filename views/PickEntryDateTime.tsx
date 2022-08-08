import { StackScreenProps } from "@react-navigation/stack";
import { DateTime } from "luxon";
import React, { useCallback } from "react";
import { RootStackParamList } from "../App";
import { EnterDateTime } from "../components/create-entry/EnterDateTime";
import { useEditEntry } from "../data/entries/useEditEntry";
import { useAreYouSure } from "../hooks/alerts/useAreYouSure";
import { useYesOrNo } from "../hooks/alerts/useYesOrNo";

export type PickEntryDateTimeProps = StackScreenProps<
  RootStackParamList,
  "PickEntryDateTime"
>;

export const PickEntryDateTime: React.FC<PickEntryDateTimeProps> = ({
  route,
  navigation,
}) => {
  const editEntry = useEditEntry();
  const yesOrNo = useYesOrNo();

  const submitEdit = useCallback(
    async (dt: DateTime) => {
      if (!route.params.entryId) return;
      const adjustReminders = await yesOrNo(
        "Adjust Reminders?",
        "Would you also like to adjust reminders accordingly? If you choose 'No', your event or deadline will still be moved, but the times of your reminders will stay the same."
      );
      editEntry(
        route.params.entryId,
        { datetime: dt.toISO() },
        adjustReminders
      );
      navigation.goBack();
      navigation.navigate("ViewEntry", { entryId: route.params.entryId });
    },
    [route.params.entryId]
  );

  return (
    <EnterDateTime
      entryId={route.params.entryId}
      onBack={navigation.goBack}
      onSubmit={submitEdit}
    />
  );
};
