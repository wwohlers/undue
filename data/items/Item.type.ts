import { Priority } from "../Priority.type";

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
  repeats: boolean;
  masterId?: number | undefined;
};

export type CreatableItem = Omit<Item, "id">;
