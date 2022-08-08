import { useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { Reminder } from "../../data/reminders/Reminder.type";
import { useRemoveReminder } from "../../data/reminders/useRemoveReminder";
import { HFlex } from "../../elements/layout/HFlex";
import { SGIcon } from "../../elements/text/SGIcon";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useMinutely } from "../../hooks/time/useMinutely";
import { useTime } from "../../hooks/time/useTime";
import { useAreYouSure } from "../../hooks/alerts/useAreYouSure";
import { capitalize } from "../../util/capitalize";
import { absoluteFormat } from "../../util/time/absoluteFormat";
import { relativeFormat } from "../../util/time/relativeFormat";
import { ViewEntryProps } from "../../views/ViewEntry";

export const ReminderCard: React.FC<{
  reminder: Reminder;
}> = ({ reminder }) => {
  const time = useTime();
  const min10 = useMinutely(10);
  const theme = useTheme();
  const navigation = useNavigation<ViewEntryProps["navigation"]>();
  const areYouSure = useAreYouSure();
  const removeReminder = useRemoveReminder();

  const relativeFormattedDt = useMemo(() => {
    return relativeFormat(DateTime.fromISO(reminder.datetime));
  }, [reminder.datetime, time]);

  const absoluteFormattedDt = useMemo(() => {
    return absoluteFormat(DateTime.fromISO(reminder.datetime));
  }, [reminder.datetime, min10]);

  const editable = useMemo(() => {
    return DateTime.fromISO(reminder.datetime) > DateTime.now().plus({ minute: 1 });
  }, [time]);

  const onTrash = async () => {
    if (
      await areYouSure(
        `Delete reminder?`,
        `Are you sure you want to delete this reminder?`
      )
    ) {
      removeReminder(reminder.id);
    }
  };

  return (
    <TouchableHighlight
      underlayColor={theme.BORDER}
      style={{
        marginVertical: 4,
        backgroundColor: theme.OFF_BACKGROUND,
        padding: 12,
        borderRadius: 8,
        elevation: 1,
      }}
      onPress={() =>
        navigation.navigate("PickReminderDateTime", { reminderId: reminder.id })
      }
      disabled={!editable}
    >
      <HFlex>
        <HFlex style={{ justifyContent: "flex-start" }}>
          <SGIcon name="bell" size={28} style={{ marginHorizontal: 4 }} />
          <View style={{ paddingHorizontal: 8, flex: 1 }}>
            <SGText fontSize={18} style={{ flex: 1 }} numberOfLines={1}>
              {capitalize(absoluteFormattedDt)}
            </SGText>
            <SGText fontSize={15} color={theme.OFF_PRIMARY}>
              {capitalize(relativeFormattedDt)}
            </SGText>
          </View>
          <SGIcon name="trash" size={24} style={{ marginHorizontal: 4 }} onPress={onTrash} />
        </HFlex>
      </HFlex>
    </TouchableHighlight>
  );
};
