module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier', 'stylelint-config-styled-components'],
  plugins: ['stylelint-prettier'],
  processors: [
    [
      'stylelint-processor-styled-components',
      {
        parserPlugins: [
          'classProperties',
          'decorators-legacy',
          'exportDefaultFrom',
          'exportNamespaceFrom',
          'jsx',
          'objectRestSpread',
        ],
      },
    ],
  ],
  rules: {
    'prettier/prettier': true,
  },
  syntax: 'scss',
};
