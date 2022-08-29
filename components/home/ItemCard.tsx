import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { HFlex } from "../../elements/layout/HFlex";
import { SGText } from "../../elements/text/SGText";
import { usePalette } from "../../hooks/theme/usePalette";
import { useMinutely } from "../../hooks/time/useMinutely";
import { capitalize } from "../../util/text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { HomeProps } from "../../views/Home";
import { SGIcon } from "../../elements/text/SGIcon";
import { useTime } from "../../hooks/time/useTime";
import { useEditItem } from "../../data/items/write/useEditItem";
import { Item } from "../../data/items/Item.type";
import { smartFormat } from "../../util/time/smartFormat";
import { overdueFormat } from "../../util/time/overdueFormat";

export const ItemCard: React.FC<{
  item: Item;
}> = ({ item }) => {
  const palette = usePalette();
  const time = useTime();
  const min10 = useMinutely(10);
  const navigation = useNavigation<HomeProps["navigation"]>();
  const editItem = useEditItem();

  const onCheckboxPress = () => {
    if (item.type === "deadline") {
      editItem(item.id, { completed: !item.completed });
    }
  };

  const isPast = useMemo(() => {
    return DateTime.fromISO(item.datetime) < DateTime.now();
  }, [time, item]);

  const isOverdue = useMemo(() => {
    return item.type === "deadline" && isPast;
  }, [item, isPast]);

  const opacity = useMemo(() => {
    if (isPast && item.type === "event") return 0.5;
    const daysDiff = Math.max(
      1,
      DateTime.fromISO(item.datetime).diff(DateTime.now(), "days").days
    );
    return 1 / Math.pow(Math.ceil(daysDiff), 0.2);
  }, [time, item]);

  const subText = useMemo(() => {
    const dt = DateTime.fromISO(item.datetime);
    return isOverdue ? overdueFormat(dt) : smartFormat(dt);
  }, [item, min10, isOverdue]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ViewItem", { itemId: item.id })}
    >
      <HFlex
        style={{
          marginVertical: 4,
          borderLeftWidth: 3,
          borderLeftColor: palette.PRIORITY[item.priority],
          paddingHorizontal: 12,
          paddingVertical: 8,
          opacity,
        }}
      >
        <View>
          <SGText fontSize={20}>{item.title}</SGText>
          <SGText
            fontSize={16}
            color={isOverdue ? palette.PRIORITY.HIGH : palette.OFF_PRIMARY}
          >
            {capitalize(subText)}
          </SGText>
        </View>
        {item.type === "deadline" && (
          <TouchableOpacity
            containerStyle={{ padding: 8 }}
            onPress={onCheckboxPress}
          >
            <SGIcon
              name={item.completed ? "checkboxChecked" : "checkboxEmpty"}
              size={32}
            />
          </TouchableOpacity>
        )}
      </HFlex>
    </TouchableOpacity>
  );
};
