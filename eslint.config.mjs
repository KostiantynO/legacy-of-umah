import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked'
  ),

  ...compat.config({
    // @ts-expect-error parser is a string for old eslintrc-style
    parser: '@typescript-eslint/parser',
    parserOptions: {
      projectService: true,
      tsconfigRootDir: __dirname,
    },
    // prettier-ignore
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', fixStyle: 'separate-type-imports', }],
      '@typescript-eslint/no-empty-object-type': ['warn', { allowInterfaces: 'with-single-extends' }],
      '@typescript-eslint/require-await': 'error',

      // personal
      'linebreak-style': ['error', 'unix'],
      'no-shadow': 'error',
      'no-restricted-imports': 'error',
      'no-param-reassign': 'error',
      'object-shorthand': 'warn',
      'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
      'import/no-default-export': 'error',
      'import/no-unresolved': 'error',
      'import/newline-after-import': 'error',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/order': ['error', { 'newlines-between': 'always', 'warnOnUnassignedImports': true, 'groups': ['builtin','external','internal','parent','sibling','index','object','unknown','type'], 'pathGroups': [{ pattern: './globals.css', group: 'builtin', 'position': 'before' }], 'alphabetize': { order: 'asc', caseInsensitive: true }}],
      'no-warning-comments': ['error', { terms: ['eslint-disable','eslint-disable-next-line','eslint-enable','eslint-enable-next-line'], location: 'start' }],
    },
  }),

  {
    files: [
      'src/app/**/{page,layout,not-found,error}.tsx',
      'next.config.ts',
      'prettier.config.mjs',
      'eslint.config.mjs',
      'tailwind.config.ts',
      'postcss.config.mjs',
    ],
    rules: { 'import/no-default-export': 'off' },
  },
];

export default eslintConfig;
