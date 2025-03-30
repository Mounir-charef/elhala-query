import { ElhalaClient } from "./elhalaClient";
import { MutationObserver, MutationOptions } from "./types";

export function createMutationObserver<T>(
  client: ElhalaClient,
  options: MutationOptions<T>
): MutationObserver<T> {
  const mutation = client.getMutation(options);
  const observer: MutationObserver<T> = {
    notify: () => mutation.state,
    getResults: () => mutation.state,
    subscribe: (callback) => {
      observer.notify = callback;
      const unsub = mutation.subscribe(observer);

      return unsub;
    },
  };
  return observer;
}
