export class Environment {
  static get Port(): string {
    if (!process.env.PORT) {
      throw new Error("Port is undefined in env file.");
    }
    return process.env.PORT as string;
  }

  static get isProduction(): boolean {
    if (!process.env.NODE_ENV) {
      throw new Error("NODE_ENV is undefined in env file.");
    }
    return (process.env.NODE_ENV as string) === "prod" ? true : false;
  }

  static get DatabaseUrl(): string {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is undefined in env file.");
    }
    return process.env.DATABASE_URL as string;
  }
}
