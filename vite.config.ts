import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import uniImport from "@dcloudio/vite-plugin-uni";

const uniPluginFactory = ((uniImport as unknown as { default?: () => unknown }).default ?? (uniImport as unknown as () => unknown));

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  plugins: [uniPluginFactory() as any]
});

