import fs from "fs/promises";
import { execa } from "execa";

import { select, confirm } from "@inquirer/prompts";
import { projectStructure } from "./structure/project-structure.js";
import { validateCommands } from "./commands.js";

const runCLI = async () => {
  const command = validateCommands(process.argv[2] as string);

  switch (command) {
    case "create":
      const projectName = process.argv[3];
      if (!projectName) {
        console.log("Project name required.");
        process.exit(1);
      }
      await createProjectStructure(projectName);
      break;
    case "help":
      console.log(`
Expreso CLI
 
Expreso is a command-line tool for quickly generating Express.js
application projects with sensible defaults and optional integrations.
 
Usage:
  expreso <command> [options]
 
Commands:
  create <project-name>   Create a new Express project
  g <module-name>          Create a new module (routes, controller, etc.)
  help                     Show this help message
 
Examples:
  expreso create my-express-app
  expreso g user
  expreso help
 
Generated project structure:
  app.ts
  package.json
  modules/
  middlewares/
  config/
  utils/
  filters/
 
Run 'expreso <command> --help' for more information on a specific command.
`);
      break;
    case "g":
      break;
    default:
      console.log("Invalid commands. Type `npx expreso help` to know more.");
  }
};

const getFileContent = async (fileName: string) => {
  const fileContents: string = await fs.readFile(`codes/${fileName}`, "utf-8");
  return fileContents;
};

const createProjectStructure = async (projectName: string) => {
  const isJwt = await confirm({
    message: "Do you want to use JWT authentication?",
    default: true,
  });

  const databaseOptions = ["PostgreSQL with Prisma", "MongoDB"];
  const databaseChoice = await select({
    message: "Select a database:",
    choices: databaseOptions,
  });

  const projectPathRoot = `./${projectName}`;
  await fs.mkdir(projectPathRoot, { recursive: true });
  console.log("Installing packages.....");
  await executeCommands(projectPathRoot);

  const packageJsonPath = `${projectPathRoot}/package.json`;
  const packageJsonRaw = await fs.readFile(packageJsonPath, "utf-8");
  const packageJson = JSON.parse(packageJsonRaw);

  packageJson.type = "module";
  packageJson.main = "src/app.js";

  packageJson.scripts = {
    ...packageJson.scripts,
    dev: "tsx watch src/app.ts",
    build: "tsc",
    start: "node dist/app.js",
  };

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));

  const projectPathSrc = `${projectPathRoot}/src`;

  await fs.mkdir(projectPathSrc, { recursive: true });

  for (const item of projectStructure) {
    if (item.isFolder && item.files) {
      await fs.mkdir(`${projectPathSrc}/${item.name}`, { recursive: true });

      if (item.files.length > 0) {
        for (const file of item.files) {
          await fs.writeFile(
            `${projectPathSrc}/${item.name}/${file.fileName}`,
            await getFileContent(file.codeFilePath),
          );
        }
      }
    } else {
      if (item.codeFilePath) {
        await fs.writeFile(
          `${projectPathRoot}/${item.isRootFolderFile ? "" : "src/"}${item.name}`,
          await getFileContent(item.codeFilePath),
        );
      }
    }
  }

  console.log("Project created successfully.🚀🚀");
};

const executeCommands = async (rootPath: string) => {
  await execa("npm", ["init", "-y"], {
    cwd: rootPath,
    shell: true,
  });
  await execa("npm", ["install", "typescript", "--save-dev"], {
    cwd: rootPath,
    shell: true,
  });
  await execa("npm", ["install", "tsx", "--save-dev"], {
    cwd: rootPath,
    shell: true,
  });
  await execa("npm", ["install", "@types/node", "--save-dev"], {
    cwd: rootPath,
    shell: true,
  });
  await execa("npm", ["install", "@types/express", "--save-dev"], {
    cwd: rootPath,
    shell: true,
  });
  await execa("npm", ["install", "@types/cookie-parser", "--save-dev"], {
    cwd: rootPath,
    shell: true,
  });
  await execa("npm", ["install", "@types/cors", "--save-dev"], {
    cwd: rootPath,
    shell: true,
  });
  await execa("npm", ["install", "express"], {
    cwd: rootPath,
    shell: true,
  });
  await execa("npm", ["install", "cookie-parser"], {
    cwd: rootPath,
    shell: true,
  });
  await execa("npm", ["install", "cors"], {
    cwd: rootPath,
    shell: true,
  });
  await execa("npm", ["install", "helmet"], {
    cwd: rootPath,
    shell: true,
  });
};

runCLI();
