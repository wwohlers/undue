import {useEntries} from "./useEntries";
import {useCallback} from "react";
import {Entry, RepeatData} from "./Entry.type";

/**
 * A master entry is the entry upon which all repeating entries are based.
 *
 * Because it is impractical to create all repeating entries at once,
 * repeating entries are created by a process of staking and hydration.
 *
 * When a repeating entry is created, rather than creating all repeating entries at once,
 * it creates only one entry per year (the first one in that year). This process is called
 * staking a master entry, and it's the purpose of this hook.
 *
 * When that year nears, that first entry of the year is "hydrated", meaning all repeating
 * entries for that year are created.
 *
 * After a master entry is staked, the first two years are immediately hydrated. For example,
 * if the year is 2022, the event is hydrated through 2024. In all years beyond, there is only
 * one event in each year. These entries are eventually hydrated by the useHydrateOnLoad hook.
 */
export function useStakeMasterEntry() {
  const [entries, setEntries] = useEntries();

  return useCallback(
    (entry: Entry, repeat: RepeatData) => {},
    [entries, setEntries]
  );
}
