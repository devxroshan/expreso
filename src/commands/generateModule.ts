import fs from "fs/promises";

const controllerFileStarterCode = `import express from "express";\nimport { asyncRequestHandler } from "../../utils/asyncRequestHandler.ts";`;

const routerFileStarterCode = `
import express from "express";

const router = express.Router();


export default router;
`;

export const generateModule = async (name: string) => {
  if (!name) {
    console.log("Module name is required.");
    process.exit(0);
  }

  console.log(`Creating ${name} module....`);

  const modulePath = `${process.cwd()}/modules/${name}`;

  await fs.mkdir(modulePath, { recursive: true });
  await fs.mkdir(`${modulePath}/dto`, { recursive: true });
  await fs.writeFile(
    `${modulePath}/${name}.controller.ts`,
    controllerFileStarterCode,
  );
  await fs.writeFile(`${modulePath}/${name}.routes.ts`, routerFileStarterCode);

  console.log(`${name} module created successfully.🚀🚀🚀`);
};
