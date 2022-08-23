import type { StackScreenProps } from "@react-navigation/stack";
import React, { useMemo } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { RootStackParamList } from "../App";
import { ItemDetails } from "../components/view-item/ItemDetails";
import { ReminderCard } from "../components/view-item/ReminderCard";
import { Container } from "../elements/layout/Container";
import { SGHeader } from "../elements/layout/SGHeader";
import { VSpace } from "../elements/layout/VSpace";
import { SGButton } from "../elements/text/SGButton";
import { SGText } from "../elements/text/SGText";
import { usePalette } from "../hooks/theme/usePalette";
import { useAreYouSure } from "../hooks/alerts/useAreYouSure";
import { DateTime } from "luxon";
import { useItem } from "../data/items/useItems";
import { useItemReminders } from "../data/reminders/useReminders";
import { useDeleteItem } from "../data/items/write/useDeleteItem";
import { useAddReminder } from "../data/items/write/useAddReminder";
import { usePickReminderDateTime } from "../hooks/ui/usePickReminderDateTime";

export type ViewItemProps = StackScreenProps<RootStackParamList, "ViewItem">;

export const ViewItem: React.FC<ViewItemProps> = ({ route, navigation }) => {
  const item = useItem(route.params.itemId);
  const reminders = useItemReminders(route.params.itemId);
  const palette = usePalette();
  const deleteItem = useDeleteItem();
  const areYouSure = useAreYouSure();
  const pickReminderDateTime = usePickReminderDateTime();
  const addReminder = useAddReminder();

  const isPast = useMemo(
    () => item && DateTime.fromISO(item.datetime) < DateTime.now(),
    [item]
  );

  const onTrash = async () => {
    if (!item) return;
    if (
      await areYouSure(
        `Delete ${item.title}?`,
        `Are you sure you want to delete this ${item.type}? Reminders will also be cancelled.`
      )
    ) {
      navigation.goBack();
      deleteItem(route.params.itemId);
    }
  };

  const onAddReminder = async () => {
    if (!item || isPast) return;
    const dt = await pickReminderDateTime(item.id, item.datetime);
    if (dt) {
      addReminder(item.id, dt);
    }
  };

  return (
    <Container>
      <SGHeader
        text={item?.title ?? "Not Found"}
        leftIcon={{
          name: "back",
          onPress: () => navigation.navigate("Home"),
        }}
        rightIcons={
          item
            ? [
                {
                  name: "trash",
                  onPress: onTrash,
                },
              ]
            : []
        }
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 8 }}>
        {item ? (
          <>
            <ItemDetails item={item} />
            {!isPast && (
              <>
                <VSpace height={8} />
                {reminders.length ? (
                  reminders.map((r) => <ReminderCard key={r.id} reminder={r} />)
                ) : (
                  <SGText
                    style={{
                      textAlign: "center",
                      color: palette.OFF_PRIMARY,
                      marginVertical: 16,
                    }}
                  >
                    You don&apos;t have any reminders set
                  </SGText>
                )}
                <VSpace height={4} />
                <View
                  style={{ flexDirection: "row", justifyContent: "flex-end" }}
                >
                  <SGButton
                    icon="plus"
                    text="Add Reminder"
                    onPress={onAddReminder}
                  />
                </View>
              </>
            )}
          </>
        ) : (
          <SGText>
            Oops! We couldn&apos;t find what you&apos;re looking for.
          </SGText>
        )}
      </ScrollView>
    </Container>
  );
};
