import { useEffect, useReducer, useRef } from "react";
import { useElhalaClient } from "./client-provider";
import { QueryOptions, QueryState } from "./types";
import { createQueryObserver } from "./queryObserver";

export function useQuery<T>(options: QueryOptions<T>): QueryState<T> {
  const client = useElhalaClient();

  const [renders, rerender] = useReducer((x: number) => x + 1, 0);

  const observer = useRef(createQueryObserver(client, options));

  useEffect(() => {
    console.log("subscribing", renders);
    if (!observer.current) {
      return;
    }
    return observer.current.subscribe(rerender);
  }, [renders, observer]);

  return observer.current.getResults();
}
