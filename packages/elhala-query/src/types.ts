export type QueryKey = ReadonlyArray<unknown>;

export type QueryStatus = "idle" | "loading" | "success" | "error";

export type QueryOptions<T> = {
  queryKey: QueryKey;
  queryFn: ({ queryKey }: { queryKey: QueryKey }) => Promise<T>;
  staleTime?: number;
};

export type QueryState<T> = {
  data: T | undefined;
  error: unknown;
  isLoading: boolean;
  isFetching: boolean;
  status: QueryStatus;
};

export type QuerySubcriber = {
  notify: () => void;
};

export type Query<T> = {
  subscribers: Array<QuerySubcriber>;
  state: QueryState<T>;
  options: QueryOptions<T> & {
    queryHash: string;
  };
  promise?: Promise<void>;
  subscribe: (subscriber: QuerySubcriber) => () => void;
  setState: (updater: (state: QueryState<T>) => QueryState<T>) => void;
  fetch: () => void;
};
