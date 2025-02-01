import { useQuery } from "elhala-query";
import Child from "./child";

function App() {
  const state = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return "world";
    },
  });

  return (
    <div className="App">
      {state.status === "loading" ? "Loading..." : state.data}
      {/* 10 <Child /> */}
      {Array.from({ length: 10 }).map((_, i) => (
        <Child key={i} />
      ))}
    </div>
  );
}

export default App;
