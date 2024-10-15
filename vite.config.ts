import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
//import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
});
