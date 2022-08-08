import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { Entry } from "../../data/entries/Entry.type";
import { Container } from "../../elements/layout/Container";
import { SGHeader } from "../../elements/layout/SGHeader";
import { VSpace } from "../../elements/layout/VSpace";
import { SGButton } from "../../elements/text/SGButton";
import { SGInput } from "../../elements/input/SGInput";
import { SGText } from "../../elements/text/SGText";
import { capitalize } from "../../util/capitalize";
import { CreateEntryProps } from "../../views/CreateEntry";

export const EnterTitle: React.FC<{
  type?: Entry["type"];
  onSubmit: (title: string) => void;
}> = ({ type, onSubmit }) => {
  const navigation = useNavigation<CreateEntryProps["navigation"]>();
  const placeholder =
    type === "deadline" ? "Submit chemistry assignment" : "Group meeting";
  const [title, setTitle] = useState("");

  const validateThenSubmit = () => {
    if (title) {
      onSubmit(title);
    }
  };

  return (
    <Container>
      <SGHeader
        size={24}
        leftIcon={{ name: "back", onPress: () => navigation.navigate("Home") }}
        text={"Name Your " + capitalize(type ?? "")}
        rightIcons={[]}
      />
      <View style={{ paddingVertical: 16 }}>
        <SGText fontSize={20}>What&apos;s on your list?</SGText>
        <VSpace height={12} />
        <SGInput
          placeholder={placeholder}
          onChangeText={setTitle}
          onSubmitEditing={validateThenSubmit}
          autoFocus={true}
        />
        <VSpace height={20} />
        <SGButton
          text="Next"
          style={{ width: "100%" }}
          onPress={validateThenSubmit}
          disabled={!title}
        />
      </View>
    </Container>
  );
};
