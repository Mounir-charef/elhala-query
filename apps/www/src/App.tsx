import { useQuery } from "elhala-query";

function App() {
  const state = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      console.log("fetching data");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "world";
    },
    staleTime: 1000,
    cacheTime: 2000,
  });

  return (
    <div className="App">
      {state.status === "loading" ? "Loading..." : state.data}
    </div>
  );
}

export default App;
