const { consts, loadRepositoryConfig } = require('@repodog/config-helpers');

const { CSS, REACT, TYPESCRIPT } = consts;

module.exports = api => {
  const env = api.env();
  let ignore = [];

  if (env !== 'test') {
    ignore = ['**/*.test.ts'];
  }

  const modules = env === 'main' || env === 'test' ? 'commonjs' : false;
  let targets;

  if (env === 'browser') {
    targets = { browsers: 'last 2 versions' };
  } else {
    targets = { node: '10' };
  }

  const presets = [
    [
      '@babel/preset-env',
      {
        corejs: 2,
        modules,
        targets,
        useBuiltIns: 'usage',
      },
    ],
  ];

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-json-strings',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-throw-expressions',
    modules ? '@babel/plugin-transform-modules-commonjs' : '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-import-meta',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
    'lodash',
  ];

  const { features } = loadRepositoryConfig();

  if (features.includes(REACT)) {
    presets.push('@babel/preset-react');

    if (features.includes(CSS)) {
      plugins.push([
        'babel-plugin-styled-components',
        {
          displayName: true,
          ssr: true,
        },
      ]);
    }
  }

  if (features.includes(TYPESCRIPT)) {
    presets.push('@babel/preset-typescript');
  }

  return {
    comments: false,
    ignore,
    plugins,
    presets,
  };
};
