import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import json from '@eslint/json';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      js,
      react: pluginReact,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    extends: ['js/recommended', pluginReact.configs.flat.recommended, prettier],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
  {
    files: ['**/*.json'],
    plugins: {
      json,
    },
    language: 'json/json',
    extends: ['json/recommended'],
  },
]);
