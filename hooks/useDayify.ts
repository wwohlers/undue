import { suggest } from "dayify";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";

export function useDayify(input: string) {
  const debouncedInput = useDebounce(input, 500);
  const [results, setResults] = useState<DateTime[]>([]);

  useEffect(() => {
    setResults(suggest(debouncedInput, "future"));
  }, [debouncedInput]);

  return results;
}