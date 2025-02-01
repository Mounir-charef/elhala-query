import { useState } from "react";

export const useQuery = () => {
  const [query, _] = useState("INITAL_QUERY222");

  return {
    query,
  };
};
