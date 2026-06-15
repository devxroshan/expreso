export const commands = ["create", "help", "g"];

export const validateCommands = (command: string): string => {
  if (!commands.includes(command)) {
    console.log("Invalid command.");
    console.log("Execute `npx expreso help`");
    process.exit(1);
  }

  return command;
};
