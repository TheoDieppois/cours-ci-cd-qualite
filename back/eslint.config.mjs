import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        require: "readonly",
        module: "readonly",
        process: "readonly",
        __dirname: "readonly",
        console: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "error",
      "prefer-const": "error",
      eqeqeq: "error",
      "no-var": "error",
    },
  },
];
