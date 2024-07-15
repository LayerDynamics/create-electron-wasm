const path = require("path");
const { defineConfig } = require("vite");
const { builtinModules } = require("module");

module.exports = defineConfig({
	root: __dirname,
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	build: {
		outDir: "dist",
		emptyOutDir: true,
		target: "es2020",
		sourcemap: true,
		lib: {
			entry: "main/index.js",
			formats: ["cjs"],
		},
		rollupOptions: {
			external: [...builtinModules, "electron"],
			output: {
				dir: "dist",
				format: "cjs",
				entryFileNames: "[name].js",
			},
		},
	},
});
