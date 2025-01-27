import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "elhala-query": path.resolve(
        __dirname,
        "../../packages/elhala-query/src"
      ),
    },
  },
});
