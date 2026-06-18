# Expresify 🚀

Expresify is a powerful CLI tool that helps developers quickly create and configure production-ready Express.js applications.

With a single command, you can scaffold an Express project with your preferred database and authentication setup, allowing you to focus on building features instead of repetitive boilerplate code.

---

## Features

- ⚡ Fast Express.js project scaffolding
- 🍃 MongoDB support with Mongoose
- 🐘 PostgreSQL support with Prisma
- 🔐 Authentication-ready setup
- 🔑 Choose between:
  - Argon2
  - Bcrypt
- 🛡️ Built-in exception filters
- 📦 Organized project structure
- 🧩 Module generation support
- 🎯 Developer-friendly CLI experience

---

## Installation

### Using npx

```bash
npx expresify create my-app
```

### Global Installation

```bash
npm install -g expresify
```

Then:

```bash
expresify create my-app
```

---

## Commands

### Create Project

Create a new Express application.

```bash
expresify create <project-name>
```

Example:

```bash
expresify create my-api
```

During setup, Expresify will guide you through selecting:

- Database
  - MongoDB (Mongoose)
  - PostgreSQL (Prisma)

- Password Hashing Library
  - Argon2
  - Bcrypt

---

### Generate Module

Generate application modules.

```bash
expresify g <module-name>
```

Example:

```bash
expresify g user
```

This generates the required files and folders for the module.

---

### Help

Display all available commands.

```bash
expresify help
```

or

```bash
expresify --help
```

---

## Supported Databases

### MongoDB + Mongoose

Includes:

- Mongoose connection setup
- MongoDB exception filters
- Environment configuration
- Modular project structure

### PostgreSQL + Prisma

Includes:

- Prisma configuration
- Prisma Client setup
- PostgreSQL connection
- Prisma exception filters
- Migration scripts

---

## Authentication Support

Choose your preferred password hashing library:

### Argon2

```bash
npm install argon2
```

Modern and highly secure password hashing algorithm.

### Bcrypt

```bash
npm install bcrypt
```

Widely used and battle-tested password hashing solution.

---

## Generated Project Features

Depending on your selected options, generated projects may include:

- Express.js
- TypeScript
- Environment configuration
- Global exception handling
- MongoDB exception filters
- Prisma exception filters
- JWT exception filters
- Validation middleware
- Authentication utilities
- Database configuration
- Clean folder structure

---

## Example Workflow

```bash
npx expresify create my-api
```

Select:

```text
Database:
❯ MongoDB (Mongoose)
  PostgreSQL (Prisma)

Password Hashing:
❯ Argon2
  Bcrypt
```

Expresify will:

1. Create the project.
2. Install dependencies.
3. Configure the selected database.
4. Configure authentication utilities.
5. Generate the project structure.

---

## Roadmap

- Redis support
- Docker integration
- Swagger/OpenAPI setup
- Testing templates
- Queue integration
- Microservice templates
- Role-based authorization generator

---

## Contributing

Contributions, issues, and feature requests are welcome.

Feel free to open a pull request or submit an issue.

---

## License

MIT License

---

Built with ❤️ for Express developers.
