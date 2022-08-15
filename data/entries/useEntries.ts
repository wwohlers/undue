import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { asyncStorage } from "../persist";
import { Entry, isDeadline, isEvent } from "./Entry.type";
import { useFilterEvents } from "../filter-sort/useFilterEvents";
import { useSortEntries } from "../filter-sort/useSortEntries";
import { useFilterDeadlines } from "../filter-sort/useFilterDeadlines";

const entriesAtom = atomWithStorage<Entry[]>("entries", [], asyncStorage);

export function useEntries() {
  return useAtom(entriesAtom);
}

export function useEvents() {
  const [entries] = useEntries();
  return useMemo(() => {
    return entries.filter(isEvent);
  }, [entries]);
}

export function useFilteredSortedEvents() {
  const events = useEvents();
  const filtered = useFilterEvents(events);
  return useSortEntries("events", filtered);
}

export function useDeadlines() {
  const [entries] = useEntries();
  return useMemo(() => {
    return entries.filter(isDeadline);
  }, [entries]);
}

export function useFilteredSortedDeadlines() {
  const deadlines = useDeadlines();
  const filtered = useFilterDeadlines(deadlines);
  return useSortEntries("deadlines", filtered);
}

export function useEntry(id: number) {
  const [entries] = useEntries();
  return useMemo(() => {
    return entries.find((e) => e.id === id);
  }, [entries]);
}

export function useEntriesByDay(day: DateTime) {
  const [entries] = useEntries();
  return useMemo(() => {
    return entries.filter((e) => {
      const dt = DateTime.fromISO(e.datetime);
      return dt > day.startOf("day") && dt < day.endOf("day");
    });
  }, [entries]);
}

export function useNumEntries(type: Entry["type"]) {
  const [entries] = useEntries();
  return useMemo(() => {
    return entries.filter((e) => e.type === type).length;
  }, [entries]);
}
