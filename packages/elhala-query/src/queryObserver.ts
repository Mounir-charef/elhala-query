import { ElhalaClient } from "./elhalaClient";
import { QueryObserver, useQueryOptions } from "./types";

export function createQueryObserver<T>(
  client: ElhalaClient,
  { queryFn, queryKey, cacheTime, staleTime = 0 }: useQueryOptions<T>
): QueryObserver<T> {
  // query options are the use query options but without staleTime

  const query = client.getQuery({ queryFn, queryKey, cacheTime });
  const observer: QueryObserver<T> = {
    notify: () => query.fetch(),
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
      observer.notify = callback;
      const unsub = query.subscribe(observer);

      // fetch the data immediately !!IMPORTANT!!
      observer.fetch();

      return unsub;
    },
  };
  return observer;
}
