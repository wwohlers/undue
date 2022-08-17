import { DateTime } from "luxon";
import { useCallback, useEffect, useState } from "react";
import { rootNavigationRef } from "../../rootNavigation";
import { useReminderPicker } from "../../data/reminder-picker/useReminderPicker";

export function usePickReminderDateTime() {
  const [reminderPicker, setReminderPicker] = useReminderPicker();
  const [resolver, setResolver] = useState<
    undefined | ((value: DateTime | undefined) => void)
  >(undefined);

  useEffect(() => {
    if (resolver && (reminderPicker.confirmed || reminderPicker.cancelled)) {
      if (reminderPicker.confirmed) {
        resolver(reminderPicker.selectedValue);
      } else {
        resolver(undefined);
      }
    }
  }, [resolver, reminderPicker]);

  return useCallback(
    (
      itemId: number,
      initialDateTime: string
    ): Promise<DateTime | undefined> => {
      setReminderPicker({
        selectedValue: undefined,
        confirmed: false,
        cancelled: false,
      });
      rootNavigationRef.navigate("PickReminderDateTime", {
        itemId,
        initialDateTime,
      });
      return new Promise((resolve) => {
        setResolver(() => resolve);
      });
    },
    [reminderPicker, setReminderPicker]
  );
}
