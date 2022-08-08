export type Reminder = {
  readonly id: number;
  readonly entryId: number;
  readonly datetime: string; // ISO string
  readonly notificationId: string; // identifier for local push notification
};

export type CreateableReminder = Omit<Reminder, "id" | "notificationId">;
