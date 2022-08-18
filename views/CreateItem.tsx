import { StackScreenProps } from "@react-navigation/stack";
import { DateTime } from "luxon";
import React, { useCallback, useState } from "react";
import { RootStackParamList } from "../App";
import { EnterDateTime } from "../components/create-item/EnterDateTime";
import { EnterTitle } from "../components/create-item/EnterTitle";
import { Priority } from "../data/Priority.type";
import { Swiper } from "../elements/layout/Swiper";
import { useYesOrNo } from "../hooks/alerts/useYesOrNo";
import { useCheckOverlappingEvents } from "../data/items/write/useCheckOverlappingEvents";
import { useCreateItem } from "../data/items/write/useCreateItem";

export type CreateItemProps = StackScreenProps<
  RootStackParamList,
  "CreateItem"
>;

export const CreateItem: React.FC<CreateItemProps> = ({
  route,
  navigation,
}) => {
  const [screen, setScreen] = useState(0);
  const [title, setTitle] = useState("");
  const createItem = useCreateItem();
  const checkOverlappingEvents = useCheckOverlappingEvents();
  const yesNo = useYesOrNo();

  const onTitleSubmitted = (title: string) => {
    setTitle(title);
    setScreen(1);
  };

  const onSubmit = useCallback(
    async (dt: DateTime) => {
      if (!title) return;
      const overlappingEvent =
        route.params.type === "event" && checkOverlappingEvents(dt);
      if (overlappingEvent) {
        const proceed = await yesNo(
          "Overlapping event",
          `Your event might overlap with ${overlappingEvent.title}. Do you still want to proceed?`
        );
        if (!proceed) return;
      }
      const item = createItem({
        type: route.params.type,
        title,
        datetime: dt.toISO(),
        priority: Priority.LOW,
        completed: false,
        repeatSchedule: undefined,
      });
      navigation.goBack();
      navigation.navigate("ViewItem", { itemId: item.id });
    },
    [route.params.type, title, createItem, navigation]
  );

  const onBack = () => {
    if (route.params.type) {
      setScreen(0);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Swiper screen={screen} scrollEnabled={false}>
      <EnterTitle type={route.params.type} onSubmit={onTitleSubmitted} />
      <EnterDateTime
        type={route.params.type}
        onBack={onBack}
        onSubmit={onSubmit}
        isActive={screen === 1}
      />
    </Swiper>
  );
};
