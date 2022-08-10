import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { useCalendarPicker } from "../../data/calendar/useCalendarPicker";
import { rootNavigationRef } from "../../rootNavigation";

export function usePickCalendar() {
  const [calendarPicker, setCalendarPicker] = useCalendarPicker();
  const [resolver, setResolver] = useState<
    undefined | ((value: DateTime | undefined) => void)
  >(undefined);

  useEffect(() => {
    if (calendarPicker.completed && resolver) {
      resolver(calendarPicker.selectedValue);
    }
  }, [resolver, calendarPicker]);

  return useCallback(
    (initialDateTime?: string): Promise<DateTime | undefined> => {
      setCalendarPicker({
        selectedValue: undefined,
        completed: false,
      });
      rootNavigationRef.navigate("CalendarView", {
        pickMode: true,
        initialDateTime,
      });
      return new Promise((resolve) => {
        setResolver(() => resolve);
      });
    },
    [calendarPicker, setCalendarPicker]
  );
}
