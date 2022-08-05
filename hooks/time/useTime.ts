import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const timeAtom = atom(Date.now());

let interval: NodeJS.Timer | undefined;

export function useTime() {
  const [time, setTime] = useAtom(timeAtom);
  useEffect(() => {
    if (!interval) {
      setTime(Date.now());
      interval = setInterval(() => {
        setTime(Date.now());
      }, 60 * 1000);
      return () => {
        interval = undefined;
      }
    }
  }, []);
  return time;
}