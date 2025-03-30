import { ElhalaClient } from "./elhalaClient";
import { Query, QueryOptions } from "./types";

const DEFAULT_CACHE_TIME = 1000 * 60 * 5;

export function createQuery<T>(
  client: ElhalaClient,
  { queryFn, queryKey, cacheTime = DEFAULT_CACHE_TIME }: QueryOptions<T>
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
      lastUpdated: undefined,
      refetch: () => {
        query.fetch();
      },
    },
    promise: undefined,
    options: {
      queryFn: queryFn,
      queryHash: queryHash,
      queryKey: queryKey,
    },
    gcTimeout: undefined,

    scheduleGC: () => {
      query.gcTimeout = setTimeout(() => {
        client.removeQuery(query);
      }, cacheTime);
    },

    unscheduleGC: () => {
      clearTimeout(query.gcTimeout);
    },

    subscribe: (subscriber) => {
      query.subscribers.push(subscriber);

      query.unscheduleGC();

      return () => {
        query.subscribers = query.subscribers.filter(
          (sub) => sub !== subscriber
        );

        if (query.subscribers.length === 0) {
          query.scheduleGC();
        }
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
              lastUpdated: Date.now(),
            }));
          } catch (error) {
            query.setState((state) => ({
              ...state,
              error: error as Error,
              status: "error",
            }));
          } finally {
            query.promise = undefined;
            query.setState((state) => ({
              ...state,
              isFetching: false,
              isLoading: false,
            }));
          }
        })();
      }
    },
  };

  return query;
}
