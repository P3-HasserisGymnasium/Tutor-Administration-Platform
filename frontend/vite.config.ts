import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import path from 'path';

const root = resolve(__dirname, './src');
console.log("dirname", __dirname);
console.log("root", root);
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
});
