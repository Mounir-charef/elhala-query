import { createMutation } from "./mutation";
import { createQuery } from "./query";
import {
  Query,
  QueryOptions,
  Mutation,
  MutationOptions,
  QueryKey,
} from "./types";

export class ElhalaClient {
  queries: Map<string, Query<any>>;
  mutations: Map<string, Mutation<any>>;
  constructor() {
    this.queries = new Map();
    this.mutations = new Map();
  }

  getQuery<T>(options: QueryOptions<T>): Query<T> {
    let queryHash = JSON.stringify(options.queryKey);

    if (this.queries.has(queryHash)) {
      return this.queries.get(queryHash) as Query<T>;
    } else {
      let query = createQuery(this, options);
      this.queries.set(queryHash, query);

      return query;
    }
  }

  getQueryData<T>(options: QueryOptions<T>): T | undefined {
    return this.getQuery(options).state.data;
  }

  setQueryData<T>(options: QueryOptions<T>, data: T) {
    let query = this.getQuery(options);
    query.setState((state) => ({
      ...state,
      data: data,
    }));
  }

  removeQuery(query: Query<any>) {
    this.queries.delete(query.options.queryHash);
  }

  invalidateQueries({ queryKey }: { queryKey: QueryKey }) {
    this.queries.forEach((query) => {
      if (
        queryKey.length === 0 ||
        queryKey.some((key) => query.options.queryKey.includes(key))
      ) {
        query.setState((state) => ({
          ...state,
          isLoading: true,
          isFetching: true,
        }));
        query.fetch();
      }
    });
  }

  clearQueriesCache() {
    this.queries.clear();
  }

  getMutation<T>(options: MutationOptions<T>): Mutation<T> {
    let mutationHash = JSON.stringify(options.mutationKey);

    if (this.mutations.has(mutationHash)) {
      return this.mutations.get(mutationHash) as Mutation<T>;
    } else {
      let mutation = createMutation(options);
      this.mutations.set(mutationHash, mutation);

      return mutation;
    }
  }

  clearMutationsCache() {
    this.mutations.clear();
  }
}
