module.exports = {
  root: true,
    env: {
      node: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    extends: [
      'plugin:vue/essential',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // '@typescript-eslint/no-explicit-any': 'off', // desactiva el uso de any
      // "@typescript-eslint/no-var-requires": "off", // Prohíbe el uso de require() en lugar de import (desactivarla se puede usar el require())
    },
    overrides: [
      {
        files: [
          "**/__tests__/*.{j,t}s?(x)",
          "**/tests/unit/**/*.spec.{j,t}s?(x)",
          
        ],
        env: {
          "jest": true
        }
      }
    ]
  };