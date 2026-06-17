const commands = {
  create: {
    description: "Create a new project",
    usage: "experso create <project-name>",
  },
  g: {
    description: "Generate module",
    usage: "experso g <module_name>",
  },
  help: {
    description: "Show help menu",
    usage: "experso help",
  },
};
export const helpCommand = () => {
  console.log("\n🚀 Available Commands:\n");

  Object.entries(commands).forEach(([name, info]) => {
    console.log(`${name.padEnd(10)} → ${info.description}`);
  });

  console.log("\nUsage:");
  Object.entries(commands).forEach(([name, info]) => {
    console.log(`  ${info.usage}`);
  });

  console.log("\n");
};
