import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = defineConfig({
  plugins: [react()],
});

export default config;
