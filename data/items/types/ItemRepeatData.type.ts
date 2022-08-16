export type ItemRepeatData =
  | {
      readonly repeats: false;
    }
  | ({
      readonly repeats: true;
      readonly masterId: number | undefined;
      readonly isHydrated: boolean;
      readonly endDate: string;
    } & (
      | {
          readonly interval: "daily" | "monthly" | "yearly";
        }
      | {
          readonly interval: "weekly";
          readonly days: number[];
        }
    ));
