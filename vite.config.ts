import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  // Always use the repository name as base in production
  const isProduction = process.env.NODE_ENV === 'production' || env.NODE_ENV === 'production';
  const base = isProduction ? '/A_folio/' : '/';
  
  console.log('Vite config - isProduction:', isProduction);
  console.log('Vite config - base:', base);
  
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
          // Ensure all assets are referenced with the correct base path
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
      'import.meta.env.BASE_URL': JSON.stringify(base),
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
    },
  };
});
