import { ElhalaClient } from "./elhalaClient";
import { QueryObserver, QueryOptions } from "./types";

export function createQueryObserver<T>(
  client: ElhalaClient,
  options: QueryOptions<T>
): QueryObserver<T> {
  const query = client.getQuery(options);
  const observer: QueryObserver<T> = {
    notify: () => query.fetch(),
    getResults: () => query.state,
    subscribe: (callback) => {
      observer.notify = callback;
      const unsub = query.subscribe(observer);

      // fetch the data immediately
      query.fetch();

      return unsub;
    },
  };
  return observer;
}
