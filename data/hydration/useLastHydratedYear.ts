import { atomWithStorage } from "jotai/utils";
import { asyncStorage } from "../persist";
import { DateTime } from "luxon";
import { useAtom } from "jotai";

const lastHydratedYearAtom = atomWithStorage<number>(
  "lastHydratedYear",
  DateTime.now().year + 2,
  asyncStorage
);

export function useLastHydratedYear() {
  return useAtom(lastHydratedYearAtom);
}
