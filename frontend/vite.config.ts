import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import path from 'path';
import svgr from "vite-plugin-svgr";

const root = resolve(__dirname, './src');
console.log("dirname", __dirname);
console.log("root", root);
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/',
        changeOrigin: true,
        secure: false,
      },
    }
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
