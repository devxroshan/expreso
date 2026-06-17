export interface IInstruction {
  args: string[];
  command: string;
  options: string[];
}

const commandIndex = 2;
const argsStartIndex = 3;

export enum ECommand {
  CREATE = "create",
  G = "g",
  HELP = "help",
}

export const runCLI = (): IInstruction => {
  const instructions: IInstruction = {
    args: [],
    command: "",
    options: [],
  };

  const userInput = process.argv;

  userInput.forEach((item, index) => {
    if (item.startsWith("--")) {
      instructions.options.push(item);
    } else {
      if (index >= argsStartIndex) instructions.args.push(item);
    }
  });

  if (
    !userInput[commandIndex] ||
    !Object.values(ECommand).includes(userInput[commandIndex] as ECommand)
  ) {
    console.log("No matching command found. Type help for more info.");
    process.exit(0);
  }

  instructions.command = userInput[commandIndex];

  return instructions;
};
