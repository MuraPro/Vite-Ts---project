import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import i18next from "eslint-plugin-i18next";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  js.configs.recommended,
  {
    ignores: ["dist/*"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      globals: {
        localStorage: "readonly",
        console: "readonly",
        window: "readonly",
        document: "readonly",
        SVGSVGElement: "readonly",
        HTMLButtonElement: "readonly",
        setTimeout: "readonly",
        __IS_DEV__: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      import: importPlugin,
      prettier,
      "react-hooks": reactHooks,
      i18next,
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-unused-vars": "off",
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Стандартные модули (например, fs, path)
            "external", // Внешние модули (например, react, lodash)
            "internal", // Локальные модули (например, app/, widgets/)
            "parent", // Родительские модули (например, '../')
            "sibling", // Соседние модули (например, './')
            "index", // Индексные файлы (например, './index.js')
            "object", // Импорты объектов
            "type", // Типы (для TypeScript)
          ],
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
      "i18next/no-literal-string": ["error", { markupOnly: true }],
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        localStorage: "readonly",
        console: "readonly",
        window: "readonly",
        document: "readonly",
        SVGSVGElement: "readonly",
        HTMLButtonElement: "readonly",
        setTimeout: "readonly",
        __IS_DEV__: "readonly",
      },
    },
    plugins: {
      react,
      import: importPlugin,
      prettier,
      "react-hooks": reactHooks,
      i18next,
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
          groups: [
            "builtin", // Стандартные модули (например, fs, path)
            "external", // Внешние модули (например, react, lodash)
            "internal", // Локальные модули (например, app/, widgets/)
            "parent", // Родительские модули (например, '../')
            "sibling", // Соседние модули (например, './')
            "index", // Индексные файлы (например, './index.js')
            "object", // Импорты объектов
            "type", // Типы (для TypeScript)
          ],
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
      "i18next/no-literal-string": ["error", { markupOnly: true }],
    },
  },
  eslintConfigPrettier,
];
