import { useSyncExternalStore, useRef, useCallback } from "react";
import { useElhalaClient } from "./client-provider";
import { createMutationObserver } from "./mutationObserver";
import { MutationObserver, MutationState, MutationOptions } from "./types";

export function useMutation<T>(options: MutationOptions<T>): MutationState<T> {
  const client = useElhalaClient();

  const observer = useRef<MutationObserver<T> | null>(null);
  if (!observer.current) {
    observer.current = createMutationObserver(client, options);
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
