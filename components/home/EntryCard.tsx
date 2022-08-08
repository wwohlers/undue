import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Deadline, Entry } from "../../data/entries/Entry.type";
import { HFlex } from "../../elements/layout/HFlex";
import { HSpace } from "../../elements/layout/HSpace";
import { SGText } from "../../elements/text/SGText";
import { useTheme } from "../../hooks/theme/useTheme";
import { absoluteFormat } from "../../util/time/absoluteFormat";
import { relativeFormat } from "../../util/time/relativeFormat";
import { useMinutely } from "../../hooks/time/useMinutely";
import { useTime } from "../../hooks/time/useTime";
import { capitalize } from "../../util/capitalize";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { HomeProps } from "../../views/Home";

type EntryCardProps = {
  entry: Entry;
};

export const EntryCard: React.FC<EntryCardProps> = ({ entry }) => {
  const theme = useTheme();
  const time = useTime();
  const min10 = useMinutely(10);
  const navigation = useNavigation<HomeProps['navigation']>();

  const relativeFormattedDt = useMemo(() => {
    return relativeFormat(DateTime.fromISO(entry.datetime));
  }, [entry.datetime, time]);

  const absoluteFormattedDt = useMemo(() => {
    return absoluteFormat(DateTime.fromISO(entry.datetime));
  }, [entry.datetime, min10]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ViewEntry", { entryId: entry.id })}>
      <HFlex
        style={{
          marginVertical: 8,
          borderLeftWidth: 3,
          borderLeftColor: theme.PRIORITY[entry.priority],
          paddingHorizontal: 12,
          paddingVertical: 12,
        }}
      >
        <View>
          <SGText fontSize={22}>{entry.title}</SGText>
          <SGText fontSize={16} color={theme.OFF_PRIMARY}>
            {capitalize(absoluteFormattedDt)} ({relativeFormattedDt})
          </SGText>
        </View>
      </HFlex>
    </TouchableOpacity>
  );
};
