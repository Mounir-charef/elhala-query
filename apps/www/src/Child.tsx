import { useSuspenseQuery } from "elhala-query";

const Child = () => {
  const { refetch, ...state } = useSuspenseQuery({
    queryKey: ["suspense-query"],
    queryFn: async () => {
      console.log("Fetching data...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "world";
    },
  });
  return (
    <section className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        🔍 Query State
      </h2>
      <pre className="bg-gray-100 text-sm p-4 rounded-lg overflow-x-auto">
        {JSON.stringify(state, null, 2)}
      </pre>
      <div className="mt-4 text-right">
        <button
          onClick={refetch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Refetch
        </button>
      </div>
    </section>
  );
};

export default Child;
