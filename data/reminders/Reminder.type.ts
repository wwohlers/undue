export type Reminder = {
  readonly id: number;
  readonly notificationId: string; // identifier for local push notification
  readonly datetime: string; // ISO 8601
  readonly itemId: number;
  readonly itemTitle: string;
  readonly itemDateTime: string; // ISO 8601
};

export type CreatableReminder = Omit<Reminder, "id" | "notificationId">;
