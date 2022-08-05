import { useEffect, useState } from "react";
import { useTime } from "./useTime";

export function useMinutely(mins: number) {
  const time = useTime();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (time - tick >= mins * 60000) {
      setTick(tick + 1);
    }
  }, [time]);
  return tick;
}
