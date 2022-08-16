import { DateTime } from "luxon";
import { capitalize } from "../../../util/text";
import { relativeFormat } from "../../../util/time/relativeFormat";
import { absoluteFormat } from "../../../util/time/absoluteFormat";
import {
  cancelScheduledNotificationAsync,
  scheduleNotificationAsync,
} from "expo-notifications";

export type NotificationCreatable = {
  datetime: DateTime;
  title: string;
  itemDt: DateTime;
  itemId: number;
};

export async function createNotifications(
  createables: NotificationCreatable[]
): Promise<string[]> {
  return Promise.all(
    createables.map(({ datetime, title, itemDt, itemId }) => {
      const body = capitalize(
        `${relativeFormat(itemDt, false, datetime)} (${absoluteFormat(
          itemDt,
          datetime
        )})`
      );
      return scheduleNotificationAsync({
        content: {
          title,
          body,
          data: {
            itemId,
          },
        },
        trigger: datetime.toMillis(),
      });
    })
  );
}

export async function cancelNotifications(ids: string[]): Promise<void[]> {
  return Promise.all(ids.map((id) => cancelScheduledNotificationAsync(id)));
}
