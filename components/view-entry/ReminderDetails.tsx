import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Reminder } from "../../data/reminders/Reminder.type";
import { HFlex } from "../../elements/layout/HFlex";
import { SGIcon } from "../../elements/text/SGIcon";
import { SGLabel } from "../../elements/text/SGLabel";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useMinutely } from "../../hooks/time/useMinutely";
import { useTime } from "../../hooks/time/useTime";
import { capitalize } from "../../util/capitalize";
import { absoluteFormat } from "../../util/time/absoluteFormat";
import { relativeFormat } from "../../util/time/relativeFormat";

export const ReminderDetails: React.FC<{
  reminder: Reminder;
}> = ({ reminder }) => {
  const time = useTime();
  const min10 = useMinutely(10);
  const theme = useTheme();

  const relativeFormattedDt = useMemo(() => {
    return relativeFormat(DateTime.fromISO(reminder.datetime));
  }, [reminder.datetime, time]);

  const absoluteFormattedDt = useMemo(() => {
    return absoluteFormat(DateTime.fromISO(reminder.datetime));
  }, [reminder.datetime, min10]);

  return (
    <>
      <HFlex style={{ marginVertical: 12, justifyContent: "space-evenly" }}>
        <HFlex style={{ justifyContent: "center", marginHorizontal: 16 }}>
          <SGIcon name="bell" size={36} />
        </HFlex>
        <View style={{ marginVertical: 16, flex: 1 }}>
          <SGLabel>Reminder</SGLabel>
          <SGText fontSize={20} numberOfLines={1}>{capitalize(absoluteFormattedDt)}</SGText>
          <SGText fontSize={16} color={theme.OFF_PRIMARY} numberOfLines={1}>
            {capitalize(relativeFormattedDt)}
          </SGText>
        </View>
      </HFlex>
      <View style={{ marginVertical: 12 }}>
        <SGLabel>Notes</SGLabel>
        {reminder.notes ? (
          <SGText fontSize={20}>{reminder.notes}</SGText>
        ) : (
          <SGText fontSize={20} color={theme.OFF_PRIMARY_DARK}>
            Add notes...
          </SGText>
        )}
      </View>
    </>
  );
};
