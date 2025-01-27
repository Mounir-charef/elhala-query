import { useState } from "react";

export const useQuery = () => {
  const [query, _] = useState("INITAL_QUERY");

  return {
    query,
  };
};
