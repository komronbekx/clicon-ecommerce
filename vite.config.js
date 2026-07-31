import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Vercel va SPA routing to'g'ri ishlashi uchun asosiy yo'l
});
