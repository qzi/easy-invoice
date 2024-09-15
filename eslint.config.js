import js from '@eslint/js';
import react from 'eslint-plugin-react';
import airbnb from 'eslint-config-airbnb';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';

// Helper function to trim whitespace from global keys
const trimGlobals = (globals) => {
  const trimmedGlobals = {};
  for (const key in globals) {
    if (Object.prototype.hasOwnProperty.call(globals, key)) {
      trimmedGlobals[key.trim()] = globals[key];
    }
  }
  return trimmedGlobals;
};

export default [
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...trimGlobals(globals.browser),
        ...trimGlobals(globals.node),
      },
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
    },
    plugins: {
      react,
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },

    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...airbnb.rules,
      'react/react-in-jsx-scope': 'off', // Disable the rule for React 17+
    },
  },
  {
    // setting for jest test files
    files: ['**/*.test.js', '**/*.test.jsx'],
    languageOptions: {
      globals: {
        jest: true,
        test: 'readonly',
        expect: 'readonly',
      },
    },
  },
];
