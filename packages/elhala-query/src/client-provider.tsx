import {
  useContext,
  createContext,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { ElhalaClient } from "./elhalaClient";

const elhalaClientContext = createContext<ElhalaClient | null>(null);

export const useElhalaClient = () => {
  const client = useContext(elhalaClientContext);
  if (!client) {
    throw new Error(
      "useElhalaClient must be used within an ElhalaClientProvider"
    );
  }
  return client;
};

export const ElhalaProvider = ({
  client,
  children,
}: {
  client: ElhalaClient;
  children: ReactNode;
}) => {
  const onFocus = useCallback(() => {
    client.queries.forEach((query) => {
      query.subscribers.forEach((sub) => sub.notify());
    });
  }, [client]);

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener("focus", onFocus, { signal: controller.signal });
    window.addEventListener("visibilitychange", onFocus, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [onFocus]);
  return (
    <elhalaClientContext.Provider value={client}>
      {children}
    </elhalaClientContext.Provider>
  );
};
