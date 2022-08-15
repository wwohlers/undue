import { DateTime } from "luxon";

export type ItemRepeatData =
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
