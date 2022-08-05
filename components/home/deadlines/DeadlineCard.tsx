import { DateTime } from "luxon";
import React, { useMemo } from "react";
import { View } from "react-native";
import { Deadline } from "../../../data/deadlines/Entry.type";
import { HFlex } from "../../../elements/layout/HFlex";
import { HSpace } from "../../../elements/layout/HSpace";
import { SGText } from "../../../elements/text/SGText";
import { useTheme } from "../../../hooks/theme/useTheme";
import { absoluteFormat } from "../../../util/time/absoluteFormat";
import { relativeFormat } from "../../../util/time/relativeFormat";
import { useMinutely } from "../../../hooks/time/useMinutely";
import { useTime } from "../../../hooks/time/useTime";
import { capitalize } from "../../../util/capitalize";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { HomeProps } from "../../../views/Home";

type DeadlineCardProps = {
  deadline: Deadline;
};

export const DeadlineCard: React.FC<DeadlineCardProps> = ({ deadline }) => {
  const theme = useTheme();
  const time = useTime();
  const min10 = useMinutely(10);
  const navigation = useNavigation<HomeProps['navigation']>();

  const relativeFormattedDt = useMemo(() => {
    return relativeFormat(DateTime.fromISO(deadline.datetime));
  }, [deadline.datetime, time]);

  const absoluteFormattedDt = useMemo(() => {
    return absoluteFormat(DateTime.fromISO(deadline.datetime));
  }, [deadline.datetime, min10]);

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ViewEntry", { entryId: deadline.id })}>
      <View
        style={{
          marginVertical: 8,
          borderLeftWidth: 3,
          borderLeftColor: theme.PRIORITY[deadline.priority],
          paddingHorizontal: 8,
          paddingVertical: 12,
        }}
      >
        <HFlex style={{ justifyContent: "flex-start", alignItems: "flex-end" }}>
          <SGText fontSize={22}>{deadline.title}</SGText>
          <HSpace width={5} />
          <SGText
            fontSize={18}
            color={theme.OFF_PRIMARY_DARK}
            style={{ marginBottom: 1 }}
          >
            {relativeFormattedDt}
          </SGText>
        </HFlex>
        <SGText fontSize={16} color={theme.OFF_PRIMARY_LIGHT}>
          {capitalize(absoluteFormattedDt)}
        </SGText>
      </View>
    </TouchableOpacity>
  );
};
