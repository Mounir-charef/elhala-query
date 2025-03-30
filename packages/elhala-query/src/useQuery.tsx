import { useSyncExternalStore, useRef, useCallback } from "react";
import { useElhalaClient } from "./client-provider";
import { createQueryObserver } from "./queryObserver";
import { QueryObserver, QueryState, useQueryOptions } from "./types";

export function useQuery<T>(options: useQueryOptions<T>): QueryState<T> {
  const client = useElhalaClient();

  const observer = useRef<QueryObserver<T> | null>(null);
  if (!observer.current) {
    observer.current = createQueryObserver(client, options);
  }

  useSyncExternalStore(
    useCallback((onStoreChange) => {
      return observer.current!.subscribe(onStoreChange);
    }, []),
    () => observer.current?.getResults(),
    () => observer.current?.getResults()
  );

  return observer.current.getResults();
}
