import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['.cache/*', 'build/*', 'public/build/*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/api/model/*'],
    languageOptions: {
      parser: typescriptParser,
    },
    rules: {
      'no-restricted-imports': ['error', { patterns: ['db.server'] }],
    },
  },
];
