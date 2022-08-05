import { Priority } from "../Priority.type";

export type Deadline = {
  readonly id: number;
  readonly title: string;
  readonly type: "deadline";
  readonly description?: string;
  readonly datetime: string; // as an ISO string
  readonly priority: Priority;
}

export type Event = {
  readonly id: number;
  readonly title: string;
  readonly type: "event";
  readonly description?: string;
  readonly datetime: string; // as an ISO string
  readonly priority: Priority;
  readonly location?: string;
  readonly duration?: number; // in minutes
};

export type Entry = Deadline | Event;

export type CreateableEntry = Omit<Entry, "id">;

export function isDeadline(entry: Entry): entry is Deadline {
  return entry.type === 'deadline';
}

export function isEvent(entry: Entry): entry is Event {
  return entry.type === 'event';
}