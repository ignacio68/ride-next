// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  root: true,
  parser: "hermes-eslint",
  plugins: ["prettier", "import", "ft-flow", "jest"],
  extends: [
    "expo",
    "prettier",
    "eslint:recommended",
    "plugin:ft-flow/recommended",
    "plugin:jest/recommended",
  ],
  env: {
    "jest/globals": true,
  },
  overrides: [
    {
      // Test files only
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  rules: {
    "prettier/prettier": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
