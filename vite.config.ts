import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  // For GitHub Pages deployment
  const base = env.NODE_ENV === 'production' ? '/A_folio/' : '/';
  
  return {
    base,
    server: {
      host: '::',
      port: 8080,
      strictPort: true,
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
      cssMinify: true,
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
    define: {
      'process.env': {
        ...Object.entries(env).reduce<Record<string, string>>((prev, [key, val]) => {
          prev[`process.env.${key}`] = `"${val}"`;
          return prev;
        }, {}),
      },
    },
  };
});
