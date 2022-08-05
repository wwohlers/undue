import { createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Deadline } from "./deadlines/Entry.type";
import * as luxon from "luxon";
import { Priority } from "./Priority.type";
import { Reminder } from "./reminders/Reminder.type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncStorage = createJSONStorage<any>(() => AsyncStorage);

asyncStorage.setItem('entries', [
  {
    id: 1,
    title: "Do dishes",
    type: "deadline",
    description: "Do the goddamn dishes!",
    datetime: luxon.DateTime.now().endOf('day').toISO(),
    duration: 20,
    priority: Priority.MED,
  },
  {
    id: 2,
    title: "Go to gym",
    type: "deadline",
    datetime: luxon.DateTime.now().endOf('hour').toISO(),
    duration: 90,
    priority: Priority.LOW,
  },
  {
    id: 3,
    title: "Submit hw",
    type: "deadline",
    datetime: luxon.DateTime.now().endOf('week').toISO(),
    priority: Priority.HIGH,
  }
] as Deadline[]);

asyncStorage.setItem('reminders', [
  {
    id: 1,
    entryId: 1,
    notes: "Come lol on man get ur ass up yada yada!",
    datetime: luxon.DateTime.now().endOf('day').minus({ hour: 1 }).toISO(),
    notificationId: "fsadfs",
  },
  {
    id: 2,
    entryId: 1,
    datetime: luxon.DateTime.now().endOf('day').minus({ minutes: 30 }).toISO(),
    notificationId: "fsadfsdfss",
  },
] as Reminder[]);