const { outputFileSync } = require('fs-extra');
const { basename, resolve } = require('path');
const { plugin: analyzer } = require('rollup-plugin-analyzer');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const rootPackageJson = require('./package.json'); // eslint-disable-line import/no-unresolved

const dirRoot = resolve(process.cwd());
const packageJson = require(`${dirRoot}/package.json`); // eslint-disable-line import/no-dynamic-require

const devDependencies = Object.keys(rootPackageJson.devDependencies);
const peerDependencies = Object.keys(packageJson.peerDependencies);
const dependencies = Object.keys(packageJson.dependencies);
const externalModuleNames = [...dependencies, ...peerDependencies, ...devDependencies];

function external(id: string) {
  return externalModuleNames.some(name => id.startsWith(name));
}

const extensions = ['.mjs', '.js', '.jsx', 'json', '.ts', '.tsx'];

const defaultPlugins = [
  nodeResolve({
    extensions,
  }),
  commonjs(),
  json(),
  babel({
    configFile: '../../babel.config.js',
    extensions,
    runtimeHelpers: true,
  }),
];

function writeTo(analysisString: string) {
  outputFileSync(`${dirRoot}/lib/browser/production.analysis.txt`, analysisString);
}

const dirName = basename(dirRoot);

function sourcemapPathTransform(sourcePath: string) {
  if (/node_modules/.test(sourcePath)) return sourcePath;
  return sourcePath.replace('../../src/', `../${dirName}/src/`);
}

const devConfig = {
  external,
  input: `${dirRoot}/src/index.ts`,
  output: {
    file: `${dirRoot}/lib/browser/index.js`,
    format: 'esm',
    sourcemap: true,
    sourcemapPathTransform,
  },
  plugins: [...defaultPlugins],
};

const prodConfig = {
  external,
  input: `${dirRoot}/src/index.ts`,
  output: {
    file: `${dirRoot}/lib/browser/index.js`,
    format: 'esm',
    sourcemap: true,
    sourcemapPathTransform,
  },
  plugins: [...defaultPlugins, terser(), analyzer({ writeTo })],
};

let config;

if (process.env.NODE_ENV === 'development') {
  config = devConfig;
} else {
  config = prodConfig;
}

module.exports = config;
