import { Priority } from "../Priority.type";
import { DateTime } from "luxon";

export type Deadline = {
  readonly id: number;
  readonly title: string;
  readonly type: "deadline";
  readonly description?: string;
  readonly datetime: string; // as an ISO string
  readonly priority: Priority;
  readonly completed: boolean;
  readonly repeat: RepeatData;
};

export type Event = {
  readonly id: number;
  readonly title: string;
  readonly type: "event";
  readonly description?: string;
  readonly datetime: string; // as an ISO string
  readonly priority: Priority;
  readonly location?: string;
  readonly duration?: number; // in minutes
  readonly repeat: RepeatData;
};

export type RepeatData =
  | {
      readonly repeats: false;
    }
  | ({
      readonly repeats: true;
      readonly masterId: number | undefined;
      readonly isHydrated: boolean;
      readonly startDate: DateTime;
      readonly endDate: DateTime;
    } & (
      | {
          readonly interval: "daily" | "monthly" | "yearly";
        }
      | {
          readonly interval: "weekly";
          readonly days: number[];
          readonly skipEveryOther: boolean;
        }
    ));

export type Entry = Deadline | Event;

export type CreateableEntry = Omit<Entry, "id">;

export function isDeadline(entry: Entry): entry is Deadline {
  return entry.type === "deadline";
}

export function isEvent(entry: Entry): entry is Event {
  return entry.type === "event";
}
