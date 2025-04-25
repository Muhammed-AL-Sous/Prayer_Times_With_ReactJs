import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: '/Prayer_Times_With_ReactJs/',
  plugins: [react()],
});
