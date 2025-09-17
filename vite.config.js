import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Only run eslint in development (not in Netlify production build)
    process.env.NODE_ENV !== "production" && eslint(),
  ].filter(Boolean),
});
