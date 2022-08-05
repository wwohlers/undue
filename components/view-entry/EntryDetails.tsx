import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Entry } from "../../data/deadlines/Entry.type";
import { HFlex } from "../../elements/layout/HFlex";
import { SGIcon } from "../../elements/text/SGIcon";
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
      <HFlex style={{ marginVertical: 16, justifyContent: "space-evenly" }}>
        <HFlex style={{ justifyContent: "center" }}>
          <SGIcon name={entry.type === "deadline" ? "clock" : "calendar"} size={42} />
        </HFlex>
        <View>
          <SGLabel color={theme.PRIORITY[entry.priority]}>
            {entry.priority} priority
          </SGLabel>
          <SGText fontSize={24} numberOfLines={1}>
            {capitalize(entry.type + " ")}
            {relativeFormattedDt}
          </SGText>
          <SGText fontSize={18} color={theme.OFF_PRIMARY} numberOfLines={1}>
            {capitalize(absoluteFormattedDt)}
          </SGText>
        </View>
      </HFlex>
      <View style={{ marginVertical: 16 }}>
        <SGLabel>Description</SGLabel>
        {entry.description ? (
          <SGText fontSize={20}>{entry.description}</SGText>
        ) : (
          <SGText fontSize={20} color={theme.OFF_PRIMARY}>
            Tap to add a description
          </SGText>
        )}
      </View>
      {entry.type === "event" && (
        <View style={{ marginVertical: 16 }}>
          <SGLabel>Location</SGLabel>
          {entry.location ? (
            <SGText fontSize={20}>{entry.location}</SGText>
          ) : (
            <SGText fontSize={20} color={theme.OFF_PRIMARY_DARK}>
              Tap to add a location
            </SGText>
          )}
        </View>
      )}
      {entry.type === "event" && (
        <View style={{ marginVertical: 16 }}>
          <SGLabel>Duration</SGLabel>
          <SGText fontSize={20}>{}</SGText>
          {entry.duration ? (
            <SGText fontSize={20}>{formatDuration(entry.duration)}</SGText>
          ) : (
            <SGText fontSize={20} color={theme.OFF_PRIMARY_DARK}>
              Tap to set a duration
            </SGText>
          )}
        </View>
      )}
    </>
  );
};
