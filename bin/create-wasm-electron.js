#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const inquirer = require("inquirer");

const program = new Command();

program
	.version("1.0.0")
	.description("CLI to generate an Electron project with WebAssembly support")
	.option("-t, --typescript", "Use TypeScript")
	.option(
		"-w, --wasm <language>",
		"Add WebAssembly with specified language (c, go, rust)",
		"c",
	)
	.action(async (options) => {
		try {
			const answers = await inquirer.prompt([
				{
					type: "input",
					name: "name",
					message: "Project name:",
					default: "my-electron-app",
				},
			]);

			const { name } = answers;
			const projectPath = path.resolve(process.cwd(), name);
			const templatePath = path.resolve(__dirname, "../templates");
			const commonPath = path.join(templatePath, "common");
			const language = options.typescript ? "typescript" : "javascript";
			const wasmLang = options.wasm;

			// Create project folder
			await fs.ensureDir(projectPath);

			// Copy common files
			await fs.copy(commonPath, projectPath);
			// Copy language specific files
			await fs.copy(path.join(templatePath, language), projectPath);
			// Copy wasm specific files
			await fs.copy(
				path.join(templatePath, "wasm", wasmLang),
				path.join(projectPath, "wasm", wasmLang),
			);

			// Copy Vite configuration file
			const viteConfigFile = `electron.vite.config.${options.typescript ? "ts" : "js"}`;
			await fs.copy(
				path.join(templatePath, language, viteConfigFile),
				path.join(projectPath, viteConfigFile),
			);

			// Copy TypeScript configuration files
			if (options.typescript) {
				await fs.copy(
					path.join(templatePath, "typescript", "tsconfig.json"),
					path.join(projectPath, "tsconfig.json"),
				);
				await fs.copy(
					path.join(templatePath, "typescript", "tsconfig.node.json"),
					path.join(projectPath, "tsconfig.node.json"),
				);
				await fs.copy(
					path.join(templatePath, "typescript", "tsconfig.web.json"),
					path.join(projectPath, "tsconfig.web.json"),
				);
			}

			// Function to inject content into templates
			const injectContent = async (componentPath, templateExtension) => {
				const componentContentPath = path.join(
					commonPath,
					"renderer",
					"src",
					componentPath,
					`${path.basename(componentPath)}Content.json`,
				);

				// Check if the content file exists
				const contentExists = await fs.pathExists(componentContentPath);
				let componentContent = {};

				if (contentExists) {
					componentContent = await fs.readJson(componentContentPath);
				}

				const componentTemplatePath = path.join(
					commonPath,
					"renderer",
					"src",
					componentPath,
					`${path.basename(componentPath)}Template.${templateExtension}`,
				);
				let componentTemplate = await fs.readFile(
					componentTemplatePath,
					"utf-8",
				);

				Object.keys(componentContent).forEach((key) => {
					const placeholder = `{{${key}}}`;
					componentTemplate = componentTemplate.replace(
						new RegExp(placeholder, "g"),
						JSON.stringify(componentContent[key]),
					);
				});

				const componentOutputPath = path.join(
					projectPath,
					"renderer",
					"src",
					componentPath,
					`${path.basename(componentPath)}.${templateExtension}`,
				);
				await fs.outputFile(componentOutputPath, componentTemplate);
			};

			const components = [
				"components/Menubar",
				"components/Footer",
				"components/MainBody",
				"components/Layout",
				"pages/Home",
				"pages/Resources",
				"pages/Usage",
			];
			for (const component of components) {
				await injectContent(component, options.typescript ? "tsx" : "jsx");
			}

			// Inject App content
			const appContentPath = path.join(
				commonPath,
				"renderer",
				"src",
				"AppContent.json",
			);
			const appContentExists = await fs.pathExists(appContentPath);
			let appContent = {};

			if (appContentExists) {
				appContent = await fs.readJson(appContentPath);
			}

			const appTemplatePath = path.join(
				commonPath,
				"renderer",
				"src",
				`AppTemplate.${options.typescript ? "tsx" : "jsx"}`,
			);
			let appTemplate = await fs.readFile(appTemplatePath, "utf-8");

			Object.keys(appContent).forEach((key) => {
				const placeholder = `{{${key}}}`;
				appTemplate = appTemplate.replace(
					new RegExp(placeholder, "g"),
					JSON.stringify(appContent[key]),
				);
			});

			const appOutputPath = path.join(
				projectPath,
				"renderer",
				"src",
				`App.${options.typescript ? "tsx" : "jsx"}`,
			);
			await fs.outputFile(appOutputPath, appTemplate);

			// Inject Global Styles
			const globalStylesContentPath = path.join(
				commonPath,
				"renderer",
				"src",
				"styles",
				"GlobalStylesContent.json",
			);
			const globalStylesContentExists = await fs.pathExists(
				globalStylesContentPath,
			);
			let globalStylesContent = {};

			if (globalStylesContentExists) {
				globalStylesContent = await fs.readJson(globalStylesContentPath);
			}

			const globalStylesTemplatePath = path.join(
				commonPath,
				"renderer",
				"src",
				"styles",
				`GlobalStylesTemplate.${options.typescript ? "ts" : "js"}`,
			);
			let globalStylesTemplate = await fs.readFile(
				globalStylesTemplatePath,
				"utf-8",
			);

			globalStylesTemplate = globalStylesTemplate.replace(
				"{{styles}}",
				globalStylesContent.styles || "",
			);

			const globalStylesOutputPath = path.join(
				projectPath,
				"renderer",
				"src",
				"styles",
				`GlobalStyles.${options.typescript ? "ts" : "js"}`,
			);
			await fs.outputFile(globalStylesOutputPath, globalStylesTemplate);

			console.log(`Project ${name} created successfully at ${projectPath}`);
		} catch (error) {
			console.error("An error occurred:", error);
		}
	});

program.parse(process.argv);
