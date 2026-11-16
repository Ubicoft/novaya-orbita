import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // Served under main site Pages: https://ubicoft.github.io/novaya-orbita/forum/
  // (sibling repo Ubicoft/novaya-orbita-forum stays the product home; agent token cannot push there yet)
  base: "/novaya-orbita/forum/",
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5174,
    strictPort: true,
  },
});
