import { useQuery, useMutation, useElhalaClient } from "elhala-query";

function App() {
  const client = useElhalaClient();

  const { refetch, ...state } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "world";
    },
    staleTime: 1000,
    cacheTime: 2000,
  });

  const { mutate, ...mutationState } = useMutation({
    mutationKey: ["hello"],
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "world";
    },
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["hello"] });
      console.log("onSuccess", data);
    },
    onError: (error) => {
      console.log("onError", error);
    },
    onSettled: () => {
      console.log("onSettled");
    },
    onMutate: () => {
      console.log("onMutate");
    },
  });

  if (state.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-800">
        <h1 className="text-2xl font-bold mb-2">❌ Error</h1>
        <p className="mb-4">{state.error.message}</p>
        <button
          onClick={refetch}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Refetch
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8 font-mono">
      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">🔍 Query State</h2>
        <pre className="bg-gray-200 p-4 rounded overflow-x-auto">
          {JSON.stringify(state, null, 2)}
        </pre>
        <button
          onClick={refetch}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Refetch
        </button>
      </section>

      <section className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">⚙️ Mutation State</h2>
        <pre className="bg-gray-200 p-4 rounded overflow-x-auto">
          {JSON.stringify(mutationState, null, 2)}
        </pre>
        <button
          onClick={() => mutate()}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Mutate
        </button>
      </section>
    </div>
  );
}

export default App;
