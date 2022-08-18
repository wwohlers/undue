import { Priority } from "../Priority.type";
import { RepeatSchedule } from "./helpers/repeat";

export type Item = {
  id: number;
  datetime: string; // ISO 8601
  type: "event" | "deadline";
  title: string;
  completed: boolean;
  description?: string;
  duration?: number;
  location?: string;
  priority: Priority;
  repeatSchedule: RepeatSchedule | undefined;
  masterId?: number | undefined;
};

export type CreatableItem = Omit<Item, "id">;
