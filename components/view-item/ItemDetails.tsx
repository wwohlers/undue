import { useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { HFlex } from "../../elements/layout/HFlex";
import { SGIcon } from "../../elements/text/SGIcon";
import { SGLabel } from "../../elements/text/SGLabel";
import { SGText } from "../../elements/text/SGText";
import { usePalette } from "../../hooks/theme/usePalette";
import { useMinutely } from "../../hooks/time/useMinutely";
import { useTime } from "../../hooks/time/useTime";
import { capitalize } from "../../util/text";
import { absoluteFormat } from "../../util/time/absoluteFormat";
import { formatDuration } from "../../util/time/formatDuration";
import { relativeFormat } from "../../util/time/relativeFormat";
import { ViewItemProps } from "../../views/ViewItem";
import { Priority } from "../../data/Priority.type";
import { EditInPlace } from "../../elements/input/EditInPlace";
import { usePickCalendar } from "../../hooks/ui/usePickCalendar";
import { Item } from "../../data/items/Item.type";
import { useMoveItem } from "../../data/items/write/useMoveItem";
import { useEditItem } from "../../data/items/write/useEditItem";
import { useAreYouSure } from "../../hooks/alerts/useAreYouSure";
import { useDisableRepeat } from "../../data/items/write/useDisableRepeat";
import { getRepeatText } from "../../data/items/helpers/repeat";

export const ItemDetails: React.FC<{
  item: Item;
}> = ({ item }) => {
  const time = useTime();
  const min10 = useMinutely(10);
  const palette = usePalette();
  const navigation = useNavigation<ViewItemProps["navigation"]>();
  const moveItem = useMoveItem();
  const editItem = useEditItem();
  const pickCalendar = usePickCalendar();
  const areYouSure = useAreYouSure();
  const disableRepeat = useDisableRepeat();

  const relativeFormattedDt = useMemo(() => {
    return relativeFormat(DateTime.fromISO(item.datetime));
  }, [item.datetime, time]);

  const absoluteFormattedDt = useMemo(() => {
    return absoluteFormat(DateTime.fromISO(item.datetime));
  }, [item.datetime, min10]);

  const onPriorityPressed = () => {
    if (isOverdue) return;
    const newPriorities = {
      [Priority.LOW]: Priority.MED,
      [Priority.MED]: Priority.HIGH,
      [Priority.HIGH]: Priority.LOW,
    };
    editItem(item.id, {
      priority: newPriorities[item.priority],
    });
  };

  const fieldModifiedHandler = (field: string) => (value: string) => {
    editItem(item.id, { [field]: value });
  };

  const onDateTimePressed = async () => {
    const result = await pickCalendar(item.datetime);
    if (result) {
      moveItem(item.id, result);
    }
  };

  const onDurationPressed = () => {
    navigation.navigate("SetDuration", { itemId: item.id });
  };

  const onCheckboxPressed = () => {
    if (item.type === "deadline") {
      editItem(item.id, { completed: !item.completed });
    }
  };

  const isOverdue = useMemo(() => {
    return (
      item.type === "deadline" &&
      DateTime.fromISO(item.datetime) < DateTime.now()
    );
  }, []);

  const onRepeatTapped = async () => {
    if (item.repeatSchedule) {
      const disable = await areYouSure(
        "Disable repeat?",
        `Are you sure you want to disable repeat for this ${item.type}? All future events will be deleted.`
      );
      if (disable) {
        disableRepeat(item.id);
      }
    } else {
      navigation.navigate("SetupRepeat", { itemId: item.id });
    }
  };

  return (
    <>
      <HFlex style={{ marginVertical: 16, justifyContent: "space-evenly" }}>
        <HFlex style={{ justifyContent: "center", marginHorizontal: 16 }}>
          {item.type === "deadline" ? (
            <SGIcon
              name={item.completed ? "checkboxChecked" : "checkboxEmpty"}
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
                isOverdue
                  ? palette.PRIORITY.HIGH
                  : palette.PRIORITY[item.priority]
              }
            >
              {isOverdue ? "Overdue" : `${item.priority} priority`}
            </SGLabel>
          </TouchableOpacity>
          <TouchableWithoutFeedback onPress={onDateTimePressed}>
            <SGText fontSize={22} numberOfLines={1}>
              {capitalize(absoluteFormattedDt)}
            </SGText>
            <SGText fontSize={18} color={palette.OFF_PRIMARY} numberOfLines={1}>
              {capitalize(relativeFormattedDt)}
            </SGText>
          </TouchableWithoutFeedback>
        </View>
      </HFlex>
      <TouchableWithoutFeedback onPress={onRepeatTapped}>
        <View style={{ marginVertical: 16 }}>
          <SGLabel>Repeat</SGLabel>
          {item.repeatSchedule ? (
            <SGText>{getRepeatText(item.repeatSchedule)}</SGText>
          ) : (
            <SGText color={palette.OFF_PRIMARY}>Tap to enable repeat</SGText>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View style={{ marginVertical: 16 }}>
        <SGLabel>Description</SGLabel>
        <EditInPlace
          value={item.description}
          onSubmit={fieldModifiedHandler("description")}
          emptyText="Tap to add a description"
          placeholder="Enter a description..."
          multiline={true}
        />
      </View>
      {item.type === "event" && (
        <View style={{ marginVertical: 16 }}>
          <SGLabel>Location</SGLabel>
          <EditInPlace
            value={item.location}
            onSubmit={fieldModifiedHandler("location")}
            emptyText="Tap to add a location"
            placeholder="Enter a location..."
            multiline={true}
          />
        </View>
      )}
      {item.type === "event" && (
        <View style={{ marginVertical: 16 }}>
          <SGLabel>Duration</SGLabel>
          <TouchableWithoutFeedback onPress={onDurationPressed}>
            {item.duration ? (
              <SGText fontSize={20}>{formatDuration(item.duration)}</SGText>
            ) : (
              <SGText fontSize={18} color={palette.OFF_PRIMARY}>
                Tap to set a duration
              </SGText>
            )}
          </TouchableWithoutFeedback>
        </View>
      )}
    </>
  );
};
