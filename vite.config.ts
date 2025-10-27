import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// cambia "cr-forgesite" por el nombre de tu repo si es distinto
export default defineConfig({
  plugins: [react()],
  base: "/cr-forgesite/",
});
