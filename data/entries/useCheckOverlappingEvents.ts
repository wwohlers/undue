import { useEvents } from "./useEntries";
import { useCallback } from "react";
import { DateTime, Interval } from "luxon";

export function useCheckOverlappingEvents() {
  const events = useEvents();

  return useCallback(
    (startTime: DateTime) => {
      const endTime = startTime.plus({ minute: 59 });
      const interval = Interval.fromDateTimes(startTime, endTime);
      return events.find((event) => {
        const eventStart = DateTime.fromISO(event.datetime);
        const eventEnd = eventStart.plus({ minute: event.duration ?? 59 });
        return interval.overlaps(Interval.fromDateTimes(eventStart, eventEnd));
      });
    },
    [events]
  );
}
