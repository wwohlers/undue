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
    if (resolver && (calendarPicker.confirmed || calendarPicker.cancelled)) {
      if (calendarPicker.confirmed) {
        resolver(calendarPicker.selectedValue);
      } else {
        resolver(undefined);
      }
    }
  }, [resolver, calendarPicker]);

  return useCallback(
    (initialDateTime?: string): Promise<DateTime | undefined> => {
      setCalendarPicker({
        selectedValue: undefined,
        confirmed: false,
        cancelled: false,
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
