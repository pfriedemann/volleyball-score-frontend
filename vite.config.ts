import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/all": { target: "http://paul-friedemann.de:3000", changeOrigin: true },
      "/test-backend": {
        target: "http://paul-friedemann.de:3000",
        changeOrigin: true,
      },
      "/ws": {
        target: "ws://paul-friedemann.de:3000",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ws/, ""),
      },
    },
  },
});
