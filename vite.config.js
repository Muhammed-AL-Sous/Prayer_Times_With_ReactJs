import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/pryer_times_with_react_and_api/",
  plugins: [react()],
});
