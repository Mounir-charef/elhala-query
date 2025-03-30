export type QueryKey = ReadonlyArray<unknown>;
export type MutationKey = ReadonlyArray<unknown>;

export type QueryStatus = "idle" | "loading" | "success" | "error";
export type MutationStatus = "idle" | "loading" | "success" | "error";

export type QueryOptions<T> = {
  queryKey: QueryKey;
  queryFn: ({ queryKey }: { queryKey: QueryKey }) => Promise<T>;
  cacheTime?: number;
};
export type useQueryOptions<T> = QueryOptions<T> & {
  staleTime?: number;
};
export type QueryState<T> = {
  data: T | undefined;
  error?: Error;
  isLoading: boolean;
  isFetching: boolean;
  status: QueryStatus;
  lastUpdated: number | undefined;
  refetch: () => void;
};

export type Subcriber = {
  notify: () => void;
};

export type Query<T> = {
  subscribers: Array<Subcriber>;
  state: QueryState<T>;
  options: QueryOptions<T> & {
    queryHash: string;
  };
  promise?: Promise<void>;
  gcTimeout?: ReturnType<typeof setTimeout>;
  subscribe: (subscriber: Subcriber) => () => void;
  setState: (updater: (state: QueryState<T>) => QueryState<T>) => void;
  fetch: () => void;
  scheduleGC: () => void;
  unscheduleGC: () => void;
};

export type QueryObserver<T> = {
  notify: () => void;
  getResults: () => QueryState<T>;
  subscribe: (callback: () => void) => () => void;
  fetch: () => void;
};

export type MutationOptions<T> = {
  mutationFn: (variables?: unknown) => Promise<T>;
  mutationKey?: MutationKey;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  onMutate?: () => void;
};

export type MutationState<T> = {
  data: T | undefined;
  error?: Error;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  status: QueryStatus;
  mutate: (variables?: unknown) => Promise<void>;
};

export type Mutation<T> = {
  subscribers: Array<Subcriber>;
  state: MutationState<T>;
  options: MutationOptions<T> & {
    mutationHash: string;
  };
  subscribe: (subscriber: Subcriber) => () => void;
  setState: (updater: (state: MutationState<T>) => MutationState<T>) => void;
};

export type MutationObserver<T> = {
  notify: () => void;
  getResults: () => MutationState<T>;
  subscribe: (callback: () => void) => () => void;
};
