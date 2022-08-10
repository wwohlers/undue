import { useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Entry } from "../../data/entries/Entry.type";
import { useEditEntry } from "../../data/entries/useEditEntry";
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
import { ViewEntryProps } from "../../views/ViewEntry";
import { Priority } from "../../data/Priority.type";
import { EditInPlace } from "../../elements/input/EditInPlace";
import { usePickCalendar } from "../../hooks/ui/usePickCalendar";

export const EntryDetails: React.FC<{
  entry: Entry;
}> = ({ entry }) => {
  const time = useTime();
  const min10 = useMinutely(10);
  const theme = useTheme();
  const navigation = useNavigation<ViewEntryProps["navigation"]>();
  const editEntry = useEditEntry();
  const pickCalendar = usePickCalendar();

  const relativeFormattedDt = useMemo(() => {
    return relativeFormat(DateTime.fromISO(entry.datetime));
  }, [entry.datetime, time]);

  const absoluteFormattedDt = useMemo(() => {
    return absoluteFormat(DateTime.fromISO(entry.datetime));
  }, [entry.datetime, min10]);

  const onPriorityPressed = () => {
    const newPriorities = {
      [Priority.LOW]: Priority.MED,
      [Priority.MED]: Priority.HIGH,
      [Priority.HIGH]: Priority.LOW,
    };
    editEntry(entry.id, {
      priority: newPriorities[entry.priority],
    });
  };

  const fieldModifiedHandler = (field: string) => (value: string) => {
    editEntry(entry.id, { [field]: value });
  };

  const onDateTimePressed = async () => {
    const result = await pickCalendar(entry.datetime);
    // console.log(1, result);
  }

  return (
    <>
      <HFlex style={{ marginVertical: 16, justifyContent: "space-evenly" }}>
        <HFlex style={{ justifyContent: "center", marginHorizontal: 16 }}>
          <SGIcon
            name={entry.type === "deadline" ? "clock" : "calendar"}
            size={42}
          />
        </HFlex>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onPriorityPressed}>
            <SGLabel fontSize={14} color={theme.PRIORITY[entry.priority]}>
              {entry.priority} priority
            </SGLabel>
          </TouchableOpacity>
          <TouchableWithoutFeedback
            onPress={onDateTimePressed}
          >
            <SGText fontSize={22} numberOfLines={1}>
              {capitalize(absoluteFormattedDt)}
            </SGText>
            <SGText fontSize={18} color={theme.OFF_PRIMARY} numberOfLines={1}>
              {capitalize(relativeFormattedDt)}
            </SGText>
          </TouchableWithoutFeedback>
        </View>
      </HFlex>
      <View style={{ marginVertical: 16 }}>
        <SGLabel>Description</SGLabel>
        <EditInPlace
          value={entry.description}
          onSubmit={fieldModifiedHandler("description")}
          emptyText="Tap to add a description"
          placeholder="Enter a description..."
          multiline={true}
        />
      </View>
      {entry.type === "event" && (
        <View style={{ marginVertical: 16 }}>
          <SGLabel>Location</SGLabel>
          <EditInPlace
            value={entry.location}
            onSubmit={fieldModifiedHandler("location")}
            emptyText="Tap to add a location"
            placeholder="Enter a location..."
            multiline={true}
          />
        </View>
      )}
      {entry.type === "event" && (
        <View style={{ marginVertical: 16 }}>
          <SGLabel>Duration</SGLabel>
          {entry.duration ? (
            <SGText fontSize={20}>{formatDuration(entry.duration)}</SGText>
          ) : (
            <SGText fontSize={18} color={theme.OFF_PRIMARY}>
              Tap to set a duration
            </SGText>
          )}
        </View>
      )}
    </>
  );
};
