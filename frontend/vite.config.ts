/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		open: true,
	},
	resolve: {
		alias: {
			src: path.resolve(__dirname, "./src"),
			"~": path.resolve(__dirname, "./src"),
			components: path.resolve(__dirname, "./src/components"),
			api: path.resolve(__dirname, "./src/api"),
			utilities: path.resolve(__dirname, "./src/utilities"),
			public: "/public",
		},
		extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
	},
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/tests/test-setup.ts",
		coverage: {
			provider: "v8", // or "v8" if using native coverage
			reportsDirectory: "./coverage", // Directory to store coverage reports
			reporter: ["text", "lcov", "json"], // Formats: lcov and json create files
		},
	},
});
