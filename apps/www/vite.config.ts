import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/elhala-query/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "elhala-query": path.resolve(
        __dirname,
        "../../packages/elhala-query/src"
      ),
    },
  },
});
