import { useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Entry, isDeadline } from "../../data/entries/Entry.type";
import { useEditEntry } from "../../data/entries/useEditEntry";
import { HFlex } from "../../elements/layout/HFlex";
import { SGIcon } from "../../elements/text/SGIcon";
import { SGLabel } from "../../elements/text/SGLabel";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { useMinutely } from "../../hooks/time/useMinutely";
import { useTime } from "../../hooks/time/useTime";
import { capitalize } from "../../util/text";
import { absoluteFormat } from "../../util/time/absoluteFormat";
import { formatDuration } from "../../util/time/formatDuration";
import { relativeFormat } from "../../util/time/relativeFormat";
import { ViewEntryProps } from "../../views/ViewEntry";
import { Priority } from "../../data/Priority.type";
import { EditInPlace } from "../../elements/input/EditInPlace";
import { usePickCalendar } from "../../hooks/ui/usePickCalendar";
import { useYesOrNo } from "../../hooks/alerts/useYesOrNo";
import { useEntryReminders } from "../../data/reminders/useReminders";

export const EntryDetails: React.FC<{
  entry: Entry;
}> = ({ entry }) => {
  const time = useTime();
  const min10 = useMinutely(10);
  const theme = useTheme();
  const navigation = useNavigation<ViewEntryProps["navigation"]>();
  const editEntry = useEditEntry();
  const pickCalendar = usePickCalendar();
  const yesOrNo = useYesOrNo();
  const numReminders = useEntryReminders(entry.id).length;

  const relativeFormattedDt = useMemo(() => {
    return relativeFormat(DateTime.fromISO(entry.datetime));
  }, [entry.datetime, time]);

  const absoluteFormattedDt = useMemo(() => {
    return absoluteFormat(DateTime.fromISO(entry.datetime));
  }, [entry.datetime, min10]);

  const onPriorityPressed = () => {
    if (isOverdue) return;
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
    if (result) {
      const adjustReminders =
        numReminders === 0 ||
        (await yesOrNo(
          "Adjust reminders?",
          `Do you also want to adjust your reminders for this ${entry.type}? If you select "No", the ${entry.type}'s time will still be changed.`
        ));
      editEntry(entry.id, { datetime: result.toISO() }, adjustReminders);
    }
  };

  const onDurationPressed = () => {
    navigation.navigate("SetDuration", { entryId: entry.id });
  };

  const onCheckboxPressed = () => {
    if (isDeadline(entry)) {
      editEntry(entry.id, { completed: !entry.completed });
    }
  };

  const isOverdue = useMemo(() => {
    return (
      entry.type === "deadline" &&
      DateTime.fromISO(entry.datetime) < DateTime.now()
    );
  }, []);

  return (
    <>
      <HFlex style={{ marginVertical: 16, justifyContent: "space-evenly" }}>
        <HFlex style={{ justifyContent: "center", marginHorizontal: 16 }}>
          {isDeadline(entry) ? (
            <SGIcon
              name={entry.completed ? "checkboxChecked" : "checkboxEmpty"}
              onPress={onCheckboxPressed}
              size={42}
            />
          ) : (
            <SGIcon name="calendar" size={42} />
          )}
        </HFlex>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onPriorityPressed}>
            <SGLabel
              fontSize={14}
              color={
                isOverdue ? theme.PRIORITY.HIGH : theme.PRIORITY[entry.priority]
              }
            >
              {isOverdue ? "Overdue" : `${entry.priority} priority`}
            </SGLabel>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={onDateTimePressed}>
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
          <TouchableWithoutFeedback onPress={onDurationPressed}>
            {entry.duration ? (
              <SGText fontSize={20}>{formatDuration(entry.duration)}</SGText>
            ) : (
              <SGText fontSize={18} color={theme.OFF_PRIMARY}>
                Tap to set a duration
              </SGText>
            )}
          </TouchableWithoutFeedback>
        </View>
      )}
    </>
  );
};
