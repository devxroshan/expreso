import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import { configDotenv } from "dotenv";
import { Environment } from "./config/environment.js";
import { allExceptionFilter } from "./filters/allExceptions.filter.js";
import { connectMongoDB } from "./config/db.js";

configDotenv();

const app = express();

connectMongoDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: (process.env.FRONTEND as string) ?? "http://localhost:3000",
    allowedHeaders: "Content-Type",
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, World!");
});

app.use(allExceptionFilter);

app.listen(Environment.Port, () => {
  console.log(`Server is running at http://localhost:${Environment.Port}`);
});
