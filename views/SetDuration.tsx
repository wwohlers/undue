import React from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import { DurationPicker } from "../components/set-duration/DurationPicker";
import { DateTime } from "luxon";
import { useItem } from "../data/items/useItems";
import { useEditItem } from "../data/items/write/useEditItem";

export type SetDurationProps = StackScreenProps<
  RootStackParamList,
  "SetDuration"
>;

export const SetDuration: React.FC<SetDurationProps> = ({
  route,
  navigation,
}) => {
  const item = useItem(route.params.itemId);
  const editItem = useEditItem();
  const [duration, setDuration] = React.useState(
    item && item.type === "event" ? item.duration || 30 : 0
  );

  const onBack = () => {
    if (!item) return;
    editItem(item.id, {
      duration,
    });
    navigation.goBack();
  };

  if (!item || item.type === "deadline") {
    navigation.goBack();
    return null;
  }

  return (
    <Container>
      <SGHeader
        leftIcon={{ name: "back", onPress: onBack }}
        text={"Set Duration"}
        rightIcons={[]}
      />
      <View style={{ paddingVertical: 16 }}>
        <DurationPicker
          value={duration}
          onChange={setDuration}
          itemStartTime={DateTime.fromISO(item.datetime)}
        />
      </View>
    </Container>
  );
};
