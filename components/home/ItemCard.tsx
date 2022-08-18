import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { HFlex } from "../../elements/layout/HFlex";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { absoluteFormat } from "../../util/time/absoluteFormat";
import { useMinutely } from "../../hooks/time/useMinutely";
import { capitalize } from "../../util/text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { HomeProps } from "../../views/Home";
import { SGIcon } from "../../elements/text/SGIcon";
import { useTime } from "../../hooks/time/useTime";
import { useEditItem } from "../../data/items/write/useEditItem";
import { Item } from "../../data/items/Item.type";

export const ItemCard: React.FC<{
  item: Item;
}> = ({ item }) => {
  const theme = useTheme();
  const time = useTime();
  const min10 = useMinutely(10);
  const navigation = useNavigation<HomeProps["navigation"]>();
  const editItem = useEditItem();

  const absoluteFormattedDt = useMemo(() => {
    return absoluteFormat(DateTime.fromISO(item.datetime));
  }, [item.datetime, min10]);

  const onCheckboxPress = () => {
    if (item.type === "deadline") {
      editItem(item.id, { completed: !item.completed });
    }
  };

  const isPast = useMemo(() => {
    return DateTime.fromISO(item.datetime) < DateTime.now();
  }, [time, item.datetime]);

  const isToday = useMemo(() => {
    return DateTime.fromISO(item.datetime).hasSame(DateTime.now(), "day");
  }, [time, item.datetime]);

  const isOverdue = useMemo(() => {
    return item.type === "deadline" && isPast;
  }, []);

  const opacity = useMemo(() => {
    if (isPast && item.type === "event") return 0.5;
    const daysDiff = DateTime.fromISO(item.datetime).diff(
      DateTime.now(),
      "days"
    ).days;
    return 1 / Math.pow(Math.ceil(daysDiff), 0.2);
  }, [time, item.datetime]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ViewItem", { itemId: item.id })}
    >
      <HFlex
        style={{
          marginVertical: 8,
          borderLeftWidth: 3,
          borderLeftColor: theme.PRIORITY[item.priority],
          paddingHorizontal: 12,
          paddingVertical: 8,
          opacity,
        }}
      >
        <View>
          <SGText fontSize={20}>{item.title}</SGText>
          <SGText
            fontSize={16}
            color={isOverdue ? theme.PRIORITY.HIGH : theme.OFF_PRIMARY}
          >
            {isOverdue ? "Overdue" : capitalize(absoluteFormattedDt)}
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
