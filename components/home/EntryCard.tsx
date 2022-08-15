import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Entry, isDeadline } from "../../data/entries/Entry.type";
import { HFlex } from "../../elements/layout/HFlex";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { absoluteFormat } from "../../util/time/absoluteFormat";
import { useMinutely } from "../../hooks/time/useMinutely";
import { capitalize } from "../../util/text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { HomeProps } from "../../views/Home";
import { useEditEntry } from "../../data/entries/useEditEntry";
import { SGIcon } from "../../elements/text/SGIcon";
import { useTime } from "../../hooks/time/useTime";

type EntryCardProps = {
  entry: Entry;
};

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const theme = useTheme();
  const time = useTime();
  const min10 = useMinutely(10);
  const navigation = useNavigation<HomeProps["navigation"]>();
  const editEntry = useEditEntry();

  const absoluteFormattedDt = useMemo(() => {
    return absoluteFormat(DateTime.fromISO(entry.datetime));
  }, [entry.datetime, min10]);

  const onCheckboxPress = () => {
    if (isDeadline(entry)) {
      editEntry(entry.id, { completed: !entry.completed });
    }
  };

  const isPast = useMemo(() => {
    return DateTime.fromISO(entry.datetime) < DateTime.now();
  }, [time, entry.datetime]);

  const isToday = useMemo(() => {
    return DateTime.fromISO(entry.datetime).hasSame(DateTime.now(), "day");
  }, [time, entry.datetime]);

  const isOverdue = useMemo(() => {
    return entry.type === "deadline" && isPast;
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("ViewEntry", { entryId: entry.id })}
    >
      <HFlex
        style={{
          marginVertical: 8,
          borderLeftWidth: 3,
          borderLeftColor: theme.PRIORITY[entry.priority],
          paddingHorizontal: 12,
          paddingVertical: 8,
          opacity: isPast && entry.type === "event" ? 0.5 : 1,
        }}
      >
        <View>
          <SGText fontSize={20}>{entry.title}</SGText>
          <SGText
            fontSize={16}
            color={isOverdue ? theme.PRIORITY.HIGH : theme.OFF_PRIMARY}
            fontWeight={isToday || isOverdue ? 600 : 400}
          >
            {isOverdue ? "Overdue" : capitalize(absoluteFormattedDt)}
          </SGText>
        </View>
        {isDeadline(entry) && (
          <TouchableOpacity
            containerStyle={{ padding: 8 }}
            onPress={onCheckboxPress}
          >
            <SGIcon
              name={entry.completed ? "checkboxChecked" : "checkboxEmpty"}
              size={32}
            />
          </TouchableOpacity>
        )}
      </HFlex>
    </TouchableOpacity>
  );
};
