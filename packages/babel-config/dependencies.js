const { consts } = require('@repodog/config-helpers');

const { REACT } = consts;

const core = [
  '@babel/cli',
  '@babel/core',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-decorators',
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-function-sent',
  '@babel/plugin-proposal-json-strings',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-numeric-separator',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-throw-expressions',
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-syntax-import-meta',
  '@babel/plugin-transform-modules-commonjs',
  '@babel/plugin-transform-runtime',
  '@babel/preset-env',
  '@babel/register',
  '@babel/runtime',
  'babel-plugin-lodash',
];

const css = ['babel-plugin-styled-components', { dependantOn: REACT }];

const react = ['@babel/preset-react'];

const typescript = ['@babel/preset-typescript'];

module.exports = {
  core,
  css,
  react,
  typescript,
};
