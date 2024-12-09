/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
      '~': path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      api: path.resolve(__dirname, './src/api'),
      utilities: path.resolve(__dirname, './src/utilities'),
      public: '/public',
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  test: {
    globals: true, // Allows you to use `describe`, `test`, and `expect` globally
    environment: 'jsdom', // Simulates a browser environment
    setupFiles: './src/tests/test-setup.ts', // Optional: setup file to configure the testing environment
  },
});
