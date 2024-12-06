import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        sourceType: 'module',
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        project: ['./tsconfig.json'],
      },
      parser: ts.parser,
    },
    plugins: {
      '@typescript-eslint': ts.plugin,
      'import': pluginImport,
    },
    settings: {
      'react': {
        version: 'detect',
      },
      'import/parsers': {
        'espree': ['.js', '.cjs', '.mjs', '.jsx', '.mjs'],
        '@typescript-eslint/parser': ['.ts', '.tsx', '.mjs'],
      },
      'import/extensions': ['.js', '.jsx', '.tsx', '.ts', '.mjs'],
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.json' },
        node: true,
      },
    },
  },
  js.configs.recommended,
  ...ts.configs.strictTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/no-default-export': ['error'],
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      // prettier-ignore
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      // prettier-ignore
      '@typescript-eslint/consistent-type-imports': ['warn',{ prefer: 'type-imports', fixStyle: 'separate-type-imports', }],
      // '@typescript-eslint/require-await': 'warn',
      // '@typescript-eslint/no-misused-promises': ['warn',{ checksVoidReturn: { attributes: false } }],
      // "@typescript-eslint/no-confusing-void-expression": ["error", { ignoreArrowShorthand: true, ignoreVoidOperator: true }],

      // personal
      'linebreak-style': ['error', 'unix'],
      'no-shadow': 'error',
      'no-restricted-imports': 'error',
      'no-param-reassign': ['error'],
      'object-shorthand': 'warn',
      // prettier-ignore
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
      'import/no-unresolved': 'error',
      'import/newline-after-import': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      // prettier-ignore
      'import/order': [ 'error', { 'newlines-between': 'always', warnOnUnassignedImports: true, groups: [ 'builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'type', 'unknown', ], alphabetize: { order: 'asc', caseInsensitive: true, }, },
      ],
    },
  },
];

// eslint-disable-next-line import/no-default-export
export default config;
