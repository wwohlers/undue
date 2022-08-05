import React from "react";
import { View } from "react-native";
import { Event } from "../../../data/deadlines/Entry.type";
import { SGText } from "../../../elements/text/SGText";

type EventCardProps = {
  event: Event;
};

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <View>
      <SGText>{event.title}</SGText>
    </View>
  );
};
