import { ItemReminder } from "./ItemReminder.type";
import { ItemRepeatData } from "./ItemRepeatData.type";
import { Priority } from "../../Priority.type";

type BaseItem = {
  id: number;
  datetime: string; // ISO8601 datetime
  reminders: ItemReminder[];
  repeatData: ItemRepeatData;
};

export type Event = BaseItem & {
  type: "event";
  metadata: {
    title: string;
    description?: string;
    duration?: number;
    location?: string;
    priority: Priority;
  };
};

export type Deadline = BaseItem & {
  type: "deadline";
  completed: boolean;
  metadata: {
    title: string;
    description?: string;
    priority: Priority;
  };
};

export type Item = Event | Deadline;

export type CreatableItem = Omit<Item, "id">;
