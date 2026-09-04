import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig(({ isSsrBuild }) => {
  return {
    plugins: [react(), tailwindcss()],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      rollupOptions: isSsrBuild ? undefined : {
        output: {
          manualChunks(moduleId) {
            if (!moduleId.includes('node_modules')) return;
            if (/node_modules[\\/](?:react|react-dom|react-router|react-router-dom)[\\/]/.test(moduleId)) {
              return 'vendor-react';
            }
            if (/node_modules[\\/](?:motion|motion-dom|motion-utils)[\\/]/.test(moduleId)) {
              return 'vendor-motion';
            }
            if (/node_modules[\\/]lucide-react[\\/]/.test(moduleId)) {
              return 'vendor-icons';
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': import.meta.dirname,
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
