module.exports = (api) => {
  const env = api.env();
  let ignore = [];

  if (env !== 'test') {
    ignore = [
      '**/*.test.ts',
    ];
  }

  const modules = env === 'main' || env === 'test' ? 'commonjs' : false;

  return {
    comments: false,
    ignore,
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-json-strings',
      '@babel/plugin-proposal-numeric-separator',
      '@babel/plugin-proposal-throw-expressions',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      ['@babel/plugin-transform-runtime', {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      }],
      'lodash',
    ],
    presets: [
      ['@babel/preset-env', {
        corejs: 2,
        modules,
        targets: { node: '10' },
        useBuiltIns: 'usage',
      }],
      '@babel/preset-typescript',
    ],
  };
};
