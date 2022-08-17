import { useFilterEvents } from "../../filter-sort/useFilterEvents";
import { useSortItems } from "../../filter-sort/useSortItems";
import { useFilterDeadlines } from "../../filter-sort/useFilterDeadlines";
import { useItemsByType } from "../useItems";

export function useFilteredSortedEvents() {
  const events = useItemsByType("event");
  const filtered = useFilterEvents(events);
  return useSortItems("events", filtered);
}

export function useFilteredSortedDeadlines() {
  const deadlines = useItemsByType("deadline");
  const filtered = useFilterDeadlines(deadlines);
  return useSortItems("deadlines", filtered);
}
