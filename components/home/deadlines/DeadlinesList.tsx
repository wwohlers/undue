import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";
import { useDeadlines } from "../../../data/deadlines/useEntries";
import { Container } from "../../../elements/layout/Container";
import { SGHeader } from "../../../elements/layout/SGHeader";
import { HomeProps } from "../../../views/Home";
import { DeadlineCard } from "./DeadlineCard";

export const DeadlinesList: React.FC = () => {
  const deadlines = useDeadlines();
  const navigation = useNavigation<HomeProps["navigation"]>();

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "clock" }}
        headerText="Deadlines"
        rightIcons={[
          {
            name: "plus",
            onPress: () =>
              navigation.navigate("CreateEntry", { type: "deadline" }),
          },
        ]}
      />
      <ScrollView
        style={{ paddingTop: 8 }}
        contentContainerStyle={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        {deadlines.map((deadline) => (
          <DeadlineCard deadline={deadline} key={deadline.id} />
        ))}
      </ScrollView>
    </Container>
  );
};
