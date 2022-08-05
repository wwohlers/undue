import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Entry } from "../../data/deadlines/Entry.type";
import { SGLabel } from "../../elements/text/SGLabel";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useMinutely } from "../../hooks/time/useMinutely";
import { useTime } from "../../hooks/time/useTime";
import { capitalize } from "../../util/capitalize";
import { absoluteFormat } from "../../util/time/absoluteFormat";
import { formatDuration } from "../../util/time/formatDuration";
import { relativeFormat } from "../../util/time/relativeFormat";

export const EntryDetails: React.FC<{
  entry: Entry;
}> = ({ entry }) => {
  const time = useTime();
  const min10 = useMinutely(10);
  const theme = useTheme();

  const relativeFormattedDt = useMemo(() => {
    return relativeFormat(DateTime.fromISO(entry.datetime));
  }, [entry.datetime, time]);

  const absoluteFormattedDt = useMemo(() => {
    return absoluteFormat(DateTime.fromISO(entry.datetime));
  }, [entry.datetime, min10]);

  return (
    <>
      <View style={{ marginVertical: 8 }}>
        <SGLabel color={theme.PRIORITY[entry.priority]}>
          {entry.priority}
        </SGLabel>
        <SGText fontSize={24}>
          {capitalize(entry.type + " ")}
          {relativeFormattedDt}
        </SGText>
        <SGText fontSize={18} color={theme.OFF_PRIMARY}>
          {capitalize(absoluteFormattedDt)}
        </SGText>
      </View>
      <View style={{ marginVertical: 8 }}>
        <SGLabel>Description</SGLabel>
        {entry.description ? (
          <SGText fontSize={20}>{entry.description}</SGText>
        ) : (
          <SGText fontSize={20} color={theme.OFF_PRIMARY_DARK}>
            Add a description...
          </SGText>
        )}
      </View>
      {entry.type === "event" && (
        <View style={{ marginVertical: 8 }}>
          <SGLabel>Location</SGLabel>
          {entry.location ? (
            <SGText fontSize={20}>{entry.location}</SGText>
          ) : (
            <SGText fontSize={20} color={theme.OFF_PRIMARY_DARK}>
              Add a location...
            </SGText>
          )}
        </View>
      )}
      {entry.type === "event" && (
        <View style={{ marginVertical: 8 }}>
          <SGLabel>Duration</SGLabel>
          <SGText fontSize={20}>{}</SGText>
          {entry.duration ? (
            <SGText fontSize={20}>{formatDuration(entry.duration)}</SGText>
          ) : (
            <SGText fontSize={20} color={theme.OFF_PRIMARY_DARK}>
              Set a duration...
            </SGText>
          )}
        </View>
      )}
    </>
  );
};
