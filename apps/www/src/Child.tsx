import { useSuspenseQuery } from "elhala-query";

const Child = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "world";
    },
  });
  return (
    <div>
      <div className="bg-gray-100 text-sm p-4 rounded-lg">
        <p className="text-center">{data}</p>
      </div>
    </div>
  );
};

export default Child;
