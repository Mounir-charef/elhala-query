import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ElhalaClient, ElhalaProvider } from "elhala-query";
import "./index.css";

const elhalaClient = new ElhalaClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ElhalaProvider client={elhalaClient}>
      <App />
    </ElhalaProvider>
  </StrictMode>
);
