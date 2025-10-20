import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: {
    port: 5173,
    host: "0.0.0.0",
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Cross-Origin-Opener-Policy": "unsafe-none",
      "Cross-Origin-Embedder-Policy": "unsafe-none",
      "X-Frame-Options": "ALLOWALL",
    },
  },
  preview: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "X-Frame-Options": "ALLOWALL",
    },
  },
});

