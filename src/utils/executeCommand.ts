import { execa } from "execa";

export const runCommand = async (cmd: string, args: string[], cwd?: string) => {
  await execa(cmd, args, {
    stdio: "inherit",
    ...(cwd && { cwd }),
  });
};
