module.exports = {
  arrowParens: 'avoid',
  overrides: [
    {
      files: '**/*.{ts,tsx}',
      options: {
        singleQuote: false,
      },
    },
  ],
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
};
