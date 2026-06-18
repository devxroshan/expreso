import fs from "fs/promises";
import path from "path";
import { userChoices } from "../utils/userChoices.js";
import {
  createChoices,
  UserSelections,
  type IChoice,
} from "../config/create-choices.js";
import { runCommand } from "../utils/executeCommand.js";

export const create = async (name: string) => {
  if (!name) {
    console.log("Name of the project is required.");
    process.exit(0);
  }

  const rootPath = `./${name}`;
  await fs.mkdir(rootPath, { recursive: true });

  const projectOptions: IChoice = (await userChoices(createChoices)) as IChoice;

  console.log("Creating project....");

  if (projectOptions.database == UserSelections.MONGODB_WITH_MONGOOSE) {
    const templatePath = path.join(
      "expresify",
      "templates",
      "backend_with_mongo",
    );

    const targetPath = path.join(process.cwd(), name);

    await fs.cp(templatePath, targetPath, {
      recursive: true,
    });
  } else {
    const templatePath = path.join(
      "expresify",
      "templates",
      "backend_with_prisma_postgres",
    );

    const targetPath = path.join(process.cwd(), name);

    await fs.cp(templatePath, targetPath, {
      recursive: true,
    });
  }

  // Rename project name in package.json
  const rawPackageContent = await fs.readFile(
    `${path.join(process.cwd(), name)}/package.json`,
    "utf-8",
  );
  const jsonPackageContent = JSON.parse(rawPackageContent);
  jsonPackageContent.name = name;
  await fs.writeFile(
    `${path.join(process.cwd(), name)}/package.json`,
    JSON.stringify(jsonPackageContent),
  );

  if (projectOptions.passwordHashingTool == UserSelections.ARGON) {
    await runCommand("npm", ["i", "argon2"], rootPath);
  } else {
    await runCommand("npm", ["i", "bcrypt"], rootPath);
    await runCommand("npm", ["i", "@types/bcrypt", "--save-dev"], rootPath);
  }

  await runCommand("npm", ["install"], rootPath);

  if (projectOptions.database === UserSelections.POSTGRESQL_WITH_PRISMA) {
    await runCommand("npx", ["prisma", "init"], rootPath);
    await runCommand("npx", ["prisma", "generate"], rootPath);
  }

  console.log("Project created successfully.🚀🚀🚀");
};
