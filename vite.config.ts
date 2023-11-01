import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/all": { target: "http://localhost:3001", changeOrigin: true },
      "/test-backend": { target: "http://localhost:3001", changeOrigin: true },
      "/ws": {
        target: "ws://localhost:3001",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, ""),
      },
    },
  },
});
