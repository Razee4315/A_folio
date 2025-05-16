import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    base: isProduction ? '/A_folio/' : '/',
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      minify: isProduction ? "esbuild" : false,
      cssMinify: isProduction ? "lightningcss" : false,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            if (!assetInfo.name) return 'assets/[name]-[hash][extname]';
            
            const extType = assetInfo.name.split('.').pop()?.toLowerCase() || '';
            const isImage = /(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(extType);
            const dir = isImage ? 'img' : extType;
            
            return `assets/${dir}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        },
      },
    },
  };
});
