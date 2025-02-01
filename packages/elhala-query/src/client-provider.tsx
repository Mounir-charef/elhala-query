import { useContext, createContext, ReactNode } from "react";
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
  return (
    <elhalaClientContext.Provider value={client}>
      {children}
    </elhalaClientContext.Provider>
  );
};
