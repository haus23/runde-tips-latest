/** @type {import('@ianvs/prettier-plugin-sort-imports').PrettierConfig} */
export default {
  singleQuote: true,
  importOrder: [
    '^react$',
    '^@remix-run/',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '#',
    '',
    '^[.]',
  ],
  importOrderTypeScriptVersion: '5.2.0',
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    // Should be last in the list
    'prettier-plugin-tailwindcss',
  ],
};
