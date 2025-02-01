import { useEffect, useReducer, useRef } from "react";
import { useElhalaClient } from "./client-provider";
import { createQueryObserver } from "./queryObserver";
import { QueryState, useQueryOptions } from "./types";

export function useQuery<T>(options: useQueryOptions<T>): QueryState<T> {
  const client = useElhalaClient();

  const [_, rerender] = useReducer((x: number) => x + 1, 0);

  const observer = useRef(createQueryObserver(client, options));

  useEffect(() => {
    console.log("subscribing (should only happen once per component !!)");
    if (!observer.current) {
      return;
    }
    return observer.current.subscribe(rerender);
  }, [observer]);

  return observer.current.getResults();
}
