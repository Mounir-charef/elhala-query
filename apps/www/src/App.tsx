import { useQuery } from "elhala-query";

function App() {
  const { refetch, ...state } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "world";
    },
    staleTime: 1000,
    cacheTime: 2000,
  });
  if (state.error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{state.error.message}</p>
        <button onClick={refetch}>Refetch</button>
      </div>
    );
  }
  return (
    <div className="App">
      {JSON.stringify(state)}
      <button onClick={refetch}>Refetch</button>
    </div>
  );
}

export default App;
