import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useMemo } from "react";
import { asyncStorage } from "../persist";
import { Entry, isDeadline, isEvent } from "./Entry.type";

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

export function useDeadlines() {
  const [entries] = useEntries();
  return useMemo(() => {
    return entries.filter(isDeadline);
  }, [entries]);
}

export function useEntry(id: number) {
  const [entries] = useEntries();
  return useMemo(() => {
    return entries.find((e) => e.id === id);
  }, [entries]);
}
