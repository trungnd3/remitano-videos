/// <reference types="vitest" />
import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/src': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: true,
    port: 3000,
    hmr: false,
    // hmr: {
    //   host: 'localhost',
    //   port: 3300,
    //   protocol: 'ws',
    // },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    alias: {
      '@/tests': path.resolve(__dirname, './tests'),
    },
  },
});
