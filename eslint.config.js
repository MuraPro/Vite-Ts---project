import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import i18next from "eslint-plugin-i18next";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";
import muraProPlugin from "eslint-plugin-mura-pro-plugin";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

const commonGlobals = {
  localStorage: "readonly",
  console: "readonly",
  window: "readonly",
  document: "readonly",
  setTimeout: "readonly",
  VITE_IS_DEV: true,
  VITE_API_URL: true,
  VITE_MODE: true,
  VITE_PORT: true,
  describe: "readonly",
  test: "readonly",
  expect: "readonly",
  location: "readonly",
  HTMLElement: "readonly",
  KeyboardEvent: "readonly",
  SVGSVGElement: "readonly",
  HTMLButtonElement: "readonly",
  HTMLInputElement: "readonly",
  clearTimeout: "readonly",
  // ES6 (ES2015+) глобальные переменные
  Promise: "readonly",
  Map: "readonly",
  Set: "readonly",
  Symbol: "readonly",
  WeakMap: "readonly",
  WeakSet: "readonly",
  Reflect: "readonly",
  Proxy: "readonly",
  DeepPartial: "readonly",
  process: "readonly",
  __dirname: true,
  jest: "readonly",
  __PROJECT__: true,
};

const importOrderConfig = [
  "builtin", // Стандартные модули (например, fs, path)
  "external", // Внешние модули (например, react, lodash)
  "internal", // Локальные модули (например, app/, widgets/)
  "parent", // Родительские модули (например, '../')
  "sibling", // Соседние модули (например, './')
  "index", // Индексные файлы (например, './index.js')
  "object", // Импорты объектов
  "type", // Типы (для TypeScript)
];

export default [
  js.configs.recommended,
  {
    ignores: ["dist/*", "src/stories/*", ".storybook/*"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      globals: commonGlobals,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "mura-pro-plugin": muraProPlugin,
      import: importPlugin,
      prettier,
      "react-hooks": reactHooks,
      i18next,
      jest: jestPlugin,
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
      "import/order": [
        "error",
        {
          groups: importOrderConfig,
          pathGroups: [
            {
              pattern: "@/**/**",
              group: "internal",
              position: "before",
            },
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "prettier/prettier": ["error"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "i18next/no-literal-string": [
        "error",
        {
          markupOnly: true,
          ignoreAttribute: [
            "as",
            "role",
            "data-testid",
            "to",
            "target",
            "justify",
            "align",
            "direction",
            "gap",
          ],
        },
      ],
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
      "no-undef": "off",
      "mura-pro-plugin/path-checker": ["error", { alias: "@" }],
      "mura-pro-plugin/public-api-imports": ["error", { alias: "@" }],
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: commonGlobals,
    },
    plugins: {
      react,
      import: importPlugin,
      "mura-pro-plugin": muraProPlugin,
      prettier,
      "react-hooks": reactHooks,
      i18next,
      jest: jestPlugin,
    },
    rules: {
      "constructor-super": "off",
      "no-console": "warn",
      "react/jsx-filename-extension": [
        2,
        { extensions: [".js", ".jsx", ".tsx"] },
      ],
      "import/no-unresolved": "off",
      "import/prefer-default-export": "off",
      "no-unused-vars": "off",
      "react/require-default-props": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-props-no-spreading": "warn",
      "react/function-component-definition": "off",
      "no-shadow": "off",
      "import/extensions": "off",
      "import/no-extraneous-dependencies": "off",
      "no-underscore-dangle": "off",
      "import/order": [
        "error",
        {
          groups: importOrderConfig,
          pathGroups: [
            {
              pattern: "@/**/**",
              group: "internal",
              position: "before",
            },
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "prettier/prettier": ["error"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "i18next/no-literal-string": [
        "error",
        {
          markupOnly: true,
          ignoreAttribute: [
            "as",
            "role",
            "data-testid",
            "to",
            "target",
            "justify",
            "align",
            "direction",
            "gap",
          ],
        },
      ],
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
      "no-undef": "off",
      "mura-pro-plugin/path-checker": ["error", { alias: "@" }],
      "mura-pro-plugin/public-api-imports": ["error", { alias: "@" }],
    },
  },
  {
    files: [
      "__mocks__/SvgMock.js",
      "babel.config.js",
      "vite.config.ts",
      "**/src/**/*.test.{ts,tsx}",
    ],
    rules: {
      "no-undef": "off",
    },
  },
  {
    ignores: [
      "dist/*",
      ".storybook/*",
      ".node_modules/*",
      "storybook-static/*",
      "scripts/*",
      "json-server/*",
    ],
  },
  eslintConfigPrettier,
];
