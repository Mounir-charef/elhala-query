import { createQuery } from "./query";
import { Query, QueryOptions } from "./types";

export class ElhalaClient {
  queries: Map<string, Query<any>>;
  constructor() {
    this.queries = new Map();
  }

  getQuery<T>(options: QueryOptions<T>): Query<T> {
    let queryHash = JSON.stringify(options.queryKey);

    if (this.queries.has(queryHash)) {
      return this.queries.get(queryHash) as Query<T>;
    } else {
      let query = createQuery(options);
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
}
