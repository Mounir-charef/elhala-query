import { useQuery, useMutation, useElhalaClient } from "elhala-query";
import { Suspense } from "react";
import Child from "./Child";

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
      console.log("✅ Success:", data);
    },
    onError: (error) => {
      console.log("❌ Error:", error);
    },
    onSettled: () => {
      console.log("🔄 Settled");
    },
    onMutate: () => {
      console.log("⚙️ Mutating...");
    },
  });

  if (state.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-800">
        <div className="bg-white shadow-xl p-6 rounded-xl max-w-md text-center space-y-4">
          <h1 className="text-3xl font-bold">❌ Error</h1>
          <p>{state.error.message}</p>
          <button
            onClick={refetch}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-6 py-10 text-gray-800">
      <header className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
          🧪 El Hala Query
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          <span className="italic">"El Hala"</span> means "state" in Arabic — a
          tiny React Query alternative for learning and exploring how server
          state management works.
        </p>
        <div className="mt-4">
          <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
            ⚠️ Educational use only
          </span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Query Panel */}
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
        {/* Child Component */}
        <Suspense fallback={<div>Loading...</div>}>
          <Child />
        </Suspense>
        {/* Mutation Panel */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            ⚙️ Mutation State
          </h2>
          <pre className="bg-gray-100 text-sm p-4 rounded-lg overflow-x-auto">
            {JSON.stringify(mutationState, null, 2)}
          </pre>
          <div className="mt-4 text-right">
            <button
              onClick={() => mutate()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Mutate
            </button>
          </div>
        </section>
      </div>

      <footer className="mt-16 text-center text-sm text-gray-500">
        Built with 💻 by <span className="font-medium">Mounir</span>.{" "}
        <a
          rel="noopener noreferrer"
          href="https://github.com/Mounir-charef/elhala-query"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          View on GitHub →
        </a>
      </footer>
    </main>
  );
}

export default App;
