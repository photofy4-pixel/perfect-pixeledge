import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        "image-converter": resolve(__dirname, "image-converter.html"),
        "excel-converter": resolve(__dirname, "excel-converter.html"),
        "jpg-to-excel": resolve(__dirname, "jpg-to-excel.html"),
        "how-it-works": resolve(__dirname, "how-it-works.html"),
        features: resolve(__dirname, "features.html"),
        faq: resolve(__dirname, "faq.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
}));
