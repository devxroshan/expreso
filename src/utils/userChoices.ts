import inquirer from "inquirer";
import type { Question } from "inquirer";

export const userChoices = async (choices: Question[]) => {
  return await inquirer.prompt(choices);
};
