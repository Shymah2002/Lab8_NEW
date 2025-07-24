import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import pluginSecurity from "eslint-plugin-security";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { 
      js,
      security: pluginSecurity 
    },
    extends: ["js/recommended"],
    languageOptions: { 
      globals: globals.browser,
      ecmaVersion: 12,
      sourceType: "module"
    },
    rules: {
      "security/detect-eval-with-expression": "error"
    }
  },
  
  // TypeScript files
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@typescript-eslint": pluginTypeScript,
      security: pluginSecurity
    },
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
      ecmaVersion: 12,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      ...pluginTypeScript.configs.recommended.rules,
      "security/detect-eval-with-expression": "error"
    }
  },
  
  // React configuration
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  
  // Security configuration
  pluginSecurity.configs.recommended
]);