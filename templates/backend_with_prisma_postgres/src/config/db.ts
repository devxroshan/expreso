import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { Environment } from "./environment.js";

const pool = new Pool({ connectionString: Environment.DatabaseUrl });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
