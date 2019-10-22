module.exports = {
  extends: ['stylelint-config-styled-components'],
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
};
