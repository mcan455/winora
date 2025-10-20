import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // ⬅️ Farcaster embed için mutlaka "/" olmalı
  server: {
    host: "0.0.0.0",
    port: 5173,
    cors: true, // basitleştirildi
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

