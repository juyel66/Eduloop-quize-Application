import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 6868,
    host: true,                 // 👈 allow external connections (needed for ngrok/local network)
    allowedHosts: ['*'],        // 👈 allow any host (so you don’t have to whitelist ngrok each time)
  },
})
