import { ElhalaClient } from "./elhalaClient";
import { Query, QueryOptions } from "./types";

export function createQuery<T>(
  client: ElhalaClient,
  { queryFn, queryKey, staleTime }: QueryOptions<T>
): Query<T> {
  let queryHash = JSON.stringify(queryKey);

  let query: Query<T> = {
    subscribers: [],
    state: {
      data: undefined,
      error: undefined,
      isLoading: true,
      isFetching: true,
      status: "loading",
    },
    promise: undefined,
    options: {
      queryFn: queryFn,
      queryHash: queryHash,
      queryKey: queryKey,
      staleTime: staleTime,
    },
    subscribe: (subscriber) => {
      query.subscribers.push(subscriber);

      return () => {
        query.subscribers = query.subscribers.filter(
          (sub) => sub !== subscriber
        );
      };
    },
    setState: (updater) => {
      query.state = updater(query.state);

      query.subscribers.forEach((sub) => sub.notify());
    },

    fetch: () => {
      if (!query.promise) {
        query.promise = (async () => {
          query.setState((state) => ({ ...state, isFetching: true }));
          try {
            let data = await query.options.queryFn({
              queryKey: query.options.queryKey,
            });
            query.setState((state) => ({
              ...state,
              data: data,
              status: "success",
            }));
          } catch (error) {
            query.setState((state) => ({
              ...state,
              error: error,
              status: "error",
            }));
          } finally {
            query.promise = undefined;
            query.setState((state) => ({ ...state, isFetching: false }));
          }
        })();
      }
    },
  };

  return query;
}
