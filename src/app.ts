import { ECommand, runCLI, type IInstruction } from "./cli.js";
import { create } from "./commands/create.js";
import { generateModule } from "./commands/generateModule.js";
import { helpCommand } from "./commands/help.js";

const app = async () => {
  const userInstructions: IInstruction = runCLI();

  switch (userInstructions.command) {
    case ECommand.CREATE:
      await create(userInstructions.args[0] as string);
      break;
    case ECommand.G:
      await generateModule(userInstructions.args[0] as string);
      break;
    case ECommand.HELP:
      helpCommand();
      break;
    default:
      console.log(
        "Some error occurred or Invalid command. Type help for more info.",
      );
  }
};

app();
