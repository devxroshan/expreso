export const enum UserSelections {
  MONGODB_WITH_MONGOOSE = "MongoDB with Mongoose",
  POSTGRESQL_WITH_PRISMA = "PostgreSQL with Prisma",
  ARGON = "Argon",
  BCRYPT = "Bcrypt",
}

export interface IChoice {
  database: string;
  passwordHashingTool: string;
}

export const createChoices = [
  {
    type: "select",
    name: "database",
    message: "Select database:",
    choices: ["MongoDB with Mongoose", "PostgreSQL with Prisma"],
  },
  {
    type: "select",
    name: "passwordHashingTool",
    message: "Select Hashing Tool:",
    choices: ["Argon", "Bcrypt"],
  },
];
