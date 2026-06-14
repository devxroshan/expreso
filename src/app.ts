import fs from "fs/promises";

import { input, select, confirm } from "@inquirer/prompts";

const runCLI = async () => {
  const projectName = await input({
    message: "Project name:",
    validate: (input) => {
      if (!input) {
        return "Project name cannot be empty.";
      }
      return true;
    },
  });

  const isJwt = await confirm({
    message: "Do you want to use JWT authentication?",
    default: true,
  });

  const databaseOptions = ["PostgreSQL with Prisma", "MongoDB"];
  const databaseChoice = await select({
    message: "Select a database:",
    choices: databaseOptions,
  });

  await createProjectStructure(projectName);
};

const createProjectStructure = async (projectName: string) => {
  const projectPath = `./${projectName}`;
  await fs.mkdir(projectPath, { recursive: true });
  await fs.writeFile(
    `${projectPath}/README.md`,
    `# ${projectName}\n\nProject created successfully.`,
  );
  await fs.mkdir(`${projectPath}/src`, { recursive: true });
  await fs.writeFile(
    `${projectPath}/.gitignore`,
    `node_modules/\ndist/\n.env\n`,
  );
  await fs.writeFile(
    `${projectPath}/tsconfig.json`,
    JSON.stringify({
      compilerOptions: {
        rootDir: "./src",
        outDir: "./dist",
        module: "nodenext",
        moduleResolution: "nodenext",
        target: "esnext",
        types: ["node"],
        sourceMap: true,
        declaration: true,
        declarationMap: true,
        noUncheckedIndexedAccess: true,
        exactOptionalPropertyTypes: true,
        strict: true,
        verbatimModuleSyntax: true,
        isolatedModules: true,
        noUncheckedSideEffectImports: true,
        moduleDetection: "force",
        skipLibCheck: true,
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "dist"],
    }),
  );

  await fs.mkdir(`${projectPath}/src/modules`, { recursive: true });
  await fs.mkdir(`${projectPath}/src/config`, { recursive: true });
  await fs.mkdir(`${projectPath}/src/filters`, { recursive: true });
  await fs.mkdir(`${projectPath}/src/middlewares`, { recursive: true });
  await fs.mkdir(`${projectPath}/src/utils`, { recursive: true });

  await fs.writeFile(
    `${projectPath}/src/app.ts`,
    await getFileContent("app.txt"),
  );

  await fs.writeFile(
    `${projectPath}/src/utils/asyncHandler.ts`,
    await getFileContent("asyncHandler.txt"),
  );

  await fs.writeFile(
    `${projectPath}/src/config/http-exceptions.config.ts`,
    await getFileContent("http-exceptions.txt"),
  );

  await fs.writeFile(
    `${projectPath}/src/filters/all-exceptions.filter.ts`,
    await getFileContent("all-exceptions.txt"),
  );

  await fs.writeFile(
    `${projectPath}/src/filters/jwt-exception.filter.ts`,
    await getFileContent("jwt-exception.txt"),
  );
};

const getFileContent = async (fileName: string) => {
  const fileContents: string = await fs.readFile(
    `./precodes/${fileName}`,
    "utf-8",
  );
  return fileContents;
};

runCLI();
