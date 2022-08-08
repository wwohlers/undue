import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import { useEvents } from "../../data/entries/useEntries";
import { Container } from "../../elements/layout/Container";
import { SGHeader } from "../../elements/layout/SGHeader";
import { HomeProps } from "../../views/Home";
import { EntryCard } from "./EntryCard";

export const EventsList: React.FC = () => {
  const events = useEvents();
  const navigation = useNavigation<HomeProps["navigation"]>();

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "calendar" }}
        text="Events"
        rightIcons={[
          {
            name: "plus",
            onPress: () =>
              navigation.navigate("CreateOrEditEntry", { type: "event" }),
          },
        ]}
      />
      <ScrollView style={{ paddingTop: 8 }}>
        {events.map((event) => (
          <EntryCard entry={event} key={event.id} />
        ))}
      </ScrollView>
    </Container>
  );
};
