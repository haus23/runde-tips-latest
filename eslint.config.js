import typescriptParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['.cache/*', 'build/*', 'public/build/*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
    },
  },
  // Restrict import of db.server.ts
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['**/api/model/*'],
    rules: {
      'no-restricted-imports': ['error', { patterns: ['db.server'] }],
    },
  },
];
