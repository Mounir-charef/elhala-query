import { MutationOptions, Mutation } from "./types";

export function createMutation<T>({
  mutationFn,
  mutationKey,
  onError,
  onMutate,
  onSettled,
  onSuccess,
}: MutationOptions<T>): Mutation<T> {
  let mutation: Mutation<T> = {
    subscribers: [],
    subscribe: (subscriber) => {
      mutation.subscribers.push(subscriber);

      return () => {
        mutation.subscribers = mutation.subscribers.filter(
          (sub) => sub !== subscriber
        );
      };
    },
    setState: (updater) => {
      mutation.state = updater(mutation.state);
      mutation.subscribers.forEach((sub) => sub.notify());
    },
    options: {
      mutationFn: mutationFn,
      mutationKey: mutationKey,
      onError: onError,
      onMutate: onMutate,
      onSettled: onSettled,
      onSuccess: onSuccess,
      mutationHash: JSON.stringify(mutationKey),
    },
    state: {
      data: undefined,
      error: undefined,
      isLoading: false,
      isSuccess: false,
      isError: false,
      status: "idle",
      promise: undefined,
      mutate: async (variables) => {
        mutation.setState((state) => ({
          ...state,
          isLoading: true,
          isSuccess: false,
          isError: false,
          status: "loading",
        }));
        mutation.options.onMutate?.();

        try {
          const data = await mutation.options.mutationFn(variables);
          mutation.setState((state) => ({
            ...state,
            data: data,
            isSuccess: true,
            isError: false,
            status: "success",
          }));

          mutation.options.onSuccess?.(data);
        } catch (error) {
          mutation.setState((state) => ({
            ...state,
            isSuccess: false,
            isError: true,
            status: "error",
            error: error as Error,
          }));

          mutation.options.onError?.(error as Error);
        } finally {
          mutation.setState((state) => ({
            ...state,
            isLoading: false,
          }));
          mutation.options.onSettled?.();
        }
      },
    },
  };

  return mutation;
}
