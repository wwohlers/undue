import { DateTime } from "luxon";

export async function createNotifications(
  datetimes: DateTime[]
): Promise<string[]> {
  // schedule local notifications, return ids
}

export async function cancelNotifications(ids: string[]): Promise<void> {
  // cancel local notifications
}
