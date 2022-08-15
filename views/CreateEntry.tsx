import { StackScreenProps } from "@react-navigation/stack";
import { DateTime } from "luxon";
import React, { useCallback, useState } from "react";
import { RootStackParamList } from "../App";
import { EnterDateTime } from "../components/create-entry/EnterDateTime";
import { EnterTitle } from "../components/create-entry/EnterTitle";
import { useCreateEntry } from "../data/entries/useCreateEntry";
import { Priority } from "../data/Priority.type";
import { Swiper } from "../elements/layout/Swiper";
import { useCheckOverlappingEvents } from "../data/entries/useCheckOverlappingEvents";
import { useYesOrNo } from "../hooks/alerts/useYesOrNo";

export type CreateEntryProps = StackScreenProps<
  RootStackParamList,
  "CreateOrEditEntry"
>;

export const CreateEntry: React.FC<CreateEntryProps> = ({
  route,
  navigation,
}) => {
  const [screen, setScreen] = useState(0);
  const [title, setTitle] = useState("");
  const createEntry = useCreateEntry();
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
      const entry = createEntry({
        type: route.params.type,
        title,
        datetime: dt.toISO(),
        priority: Priority.LOW,
      });
      navigation.goBack();
      navigation.navigate("ViewEntry", { entryId: entry.id });
    },
    [route.params.type, title, createEntry, navigation]
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
