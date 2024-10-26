import path from 'path';
import * as parser from '@typescript-eslint/parser';
import * as eslintPlugin from '@typescript-eslint/eslint-plugin';
import * as prettierPlugin from 'eslint-plugin-prettier';
import tsEslint from 'typescript-eslint';
const dirname = path.resolve();

export default [
  {
    ignores: ['eslint.config.mjs', 'coverage', 'dist', 'node_modules'],
  },
  ...tsEslint.configs.recommended,
  {
    languageOptions: {
      parser,
      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint/eslint-plugin': eslintPlugin,
      'eslint-plugin-prettier': prettierPlugin,
    },
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
    },
    files: ['{src,apps,libs,test}/**/*.ts'],
  },
];
