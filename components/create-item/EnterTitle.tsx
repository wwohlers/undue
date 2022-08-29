import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { Container } from "../../elements/layout/Container";
import { SGHeader } from "../../elements/layout/SGHeader";
import { VSpace } from "../../elements/layout/VSpace";
import { SGButton } from "../../elements/text/SGButton";
import { SGInput } from "../../elements/input/SGInput";
import { capitalize, itemTypeName } from "../../util/text";
import { CreateItemProps } from "../../views/CreateItem";
import { Item } from "../../data/items/Item.type";

export const EnterTitle: React.FC<{
  type?: Item["type"];
  onSubmit: (title: string) => void;
}> = ({ type, onSubmit }) => {
  const navigation = useNavigation<CreateItemProps["navigation"]>();
  const placeholder =
    type === "deadline" ? "Submit chemistry assignment" : "Group meeting";
  const [title, setTitle] = useState("");

  const validateThenSubmit = () => {
    if (title) {
      onSubmit(title.trim());
    }
  };

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "back", onPress: () => navigation.navigate("Home") }}
        text={"Name Your " + (type ? capitalize(itemTypeName(type)) : "")}
        rightIcons={[]}
      />
      <View style={{ paddingVertical: 16 }}>
        <SGInput
          placeholder={placeholder}
          onChangeText={setTitle}
          onSubmitEditing={validateThenSubmit}
          autoFocus={true}
        />
        <VSpace height={28} />
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
