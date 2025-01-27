import { useQuery } from "elhala-query";

function App() {
  const { query } = useQuery();

  return <div className="App">{query}</div>;
}

export default App;
