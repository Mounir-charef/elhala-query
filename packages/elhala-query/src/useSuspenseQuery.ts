import { useSyncExternalStore, useRef, useCallback } from "react";
import { useElhalaClient } from "./client-provider";
import { createQueryObserver } from "./queryObserver";
import { QueryObserver, useQueryOptions, SuspenseQueryState } from "./types";

export function useSuspenseQuery<T>(
  options: useQueryOptions<T>
): SuspenseQueryState<T> {
  const client = useElhalaClient();
  const observer = useRef<QueryObserver<T> | null>(null);

  if (!observer.current) {
    observer.current = createQueryObserver(client, options);
  }

  const state = useSyncExternalStore(
    useCallback(
      (onStoreChange) => observer.current!.subscribe(onStoreChange),
      []
    ),
    () => observer.current?.getResults(),
    () => observer.current?.getResults()
  );

  if (state?.isFetching) {
    const promise = observer.current.fetchOptimistic();
    if (promise) throw promise;
    throw new Promise(() => {});
  }

  if (state?.status === "error") {
    throw state.error;
  }

  return state as SuspenseQueryState<T>;
}
