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

  static get MongoUri(): string {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is undefined in env file.");
    }
    return process.env.MONGO_URI as string;
  }
}
