import { useQuery } from "elhala-query";

const Child = () => {
  const { data, status } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "world";
    },
  });
  return <div>{status === "loading" ? "Loading..." : data}</div>;
};

export default Child;
