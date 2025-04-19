import { ElhalaClient } from "./elhalaClient";
import { QueryObserver, useQueryOptions } from "./types";

export function createQueryObserver<T>(
  client: ElhalaClient,
  { queryFn, queryKey, cacheTime, staleTime = 0 }: useQueryOptions<T>
): QueryObserver<T> {
  const query = client.getQuery({ queryFn, queryKey, cacheTime });
  let staleCheckTimer: ReturnType<typeof setTimeout> | null = null;

  const setupStaleCheck = () => {
    if (staleTime <= 0 || !query.state.lastUpdated) return;

    if (staleCheckTimer) {
      clearTimeout(staleCheckTimer);
      staleCheckTimer = null;
    }

    const timeUntilStale = staleTime - (Date.now() - query.state.lastUpdated);

    if (timeUntilStale > 0) {
      staleCheckTimer = setTimeout(() => {
        query.fetch();
      }, timeUntilStale);
    }
  };

  const observer: QueryObserver<T> = {
    notify: () => {
      setupStaleCheck();
      return query.state;
    },
    getResults: () => query.state,
    fetch: () => {
      if (
        !query.state.lastUpdated ||
        Date.now() - query.state.lastUpdated > staleTime
      ) {
        query.fetch();
      }
    },
    subscribe: (callback) => {
      observer.notify = () => {
        setupStaleCheck();
        callback();
        return query.state;
      };

      const unsub = query.subscribe(observer);

      // fetch the data immediately !!IMPORTANT!!
      observer.fetch();

      setupStaleCheck();

      return () => {
        unsub();
        if (staleCheckTimer) {
          clearTimeout(staleCheckTimer);
          staleCheckTimer = null;
        }
      };
    },
    fetchOptimistic: () => {
      return query.fetch();
    },
  };
  return observer;
}
