import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import { useEvents } from "../../../data/deadlines/useEntries";
import { Container } from "../../../elements/layout/Container";
import { SGHeader } from "../../../elements/layout/SGHeader";
import { HomeProps } from "../../../views/Home";
import { EventCard } from "./EventCard";

export const EventsList: React.FC = () => {
  const events = useEvents();
  const navigation = useNavigation<HomeProps["navigation"]>();

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "calendar" }}
        headerText="Events"
        rightIcons={[
          {
            name: "plus",
            onPress: () =>
              navigation.navigate("CreateEntry", { type: "deadline" }),
          },
        ]}
      />
      <ScrollView style={{ paddingTop: 8 }}>
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </ScrollView>
    </Container>
  );
};
