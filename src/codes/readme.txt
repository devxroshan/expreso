Expreso CLI

Expreso is a command-line tool for quickly generating Express.js application projects with sensible defaults and optional integrations.

Features:
- Scaffold a new Express.js project structure in seconds
- Generate routes, middleware, and configuration files automatically
- Support for common project setups and best practices
- Minimal setup required

Getting Started:
1. Install Expreso CLI globally or locally.
2. Run `expreso create <project-name>` to generate a new Express project.
3. Change into the generated project folder.
4. Install dependencies with `npm install`.
5. Start the app with `npm run start`.
6. Run the app with `npm run dev`.

Example:
  expreso create my-express-app

Generated project structure:
- `app.ts`
- `package.json`
- `modules/`
- `middlewares/`
- `config/`
- `utils/`
- `filters/`

Usage:
  expreso create <project-name>   Create a new Express project
  expreso g <module_name>         Create a new module
  expreso --help                  Show help and available commands

License:
