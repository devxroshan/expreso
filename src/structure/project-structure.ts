export const projectStructure = [
  {
    name: "config",
    isFolder: true,
    files: [
      {
        fileName: "http-exceptions.config.ts",
        codeFilePath: "http-exceptions.txt",
      },
      {
        fileName: "http-status.config.ts",
        codeFilePath: "http-status.txt",
      },
    ],
  },
  { name: "modules", isFolder: true, files: [] },
  { name: "middlewares", isFolder: true, files: [] },
  {
    name: "utils",
    isFolder: true,
    files: [{ fileName: "asyncHandler.ts", codeFilePath: "asyncHandler.txt" }],
  },
  {
    name: "filters",
    isFolder: true,
    files: [
      {
        fileName: "all-exception.filter.ts",
        codeFilePath: "all-exception.txt",
      },
      {
        fileName: "http-exception.filter.ts",
        codeFilePath: "http-exception.txt",
      },
    ],
  },
  {
    name: "tsconfig.json",
    codeFilePath: "tsconfig.txt",
    isFolder: false,
    isRootFolderFile: true,
  },
  {
    name: "app.ts",
    codeFilePath: "app.txt",
    isFolder: false,
    isRootFolderFile: false,
  },
  {
    name: "README.md",
    codeFilePath: "readme.txt",
    isFolder: false,
    isRootFolderFile: true,
  },
  {
    name: ".gitignore",
    codeFilePath: "gitignore.txt",
    isFolder: false,
    isRootFolderFile: true,
  },
  {
    name: ".env",
    codeFilePath: "env.txt",
    isFolder: false,
    isRootFolderFile: true,
  },
];
