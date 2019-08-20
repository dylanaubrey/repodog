const { outputFileSync } = require('fs-extra');
const { basename, resolve } = require('path');
const glob = require('glob');
const { plugin: analyzer } = require('rollup-plugin-analyzer');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const rootPackageJson = require('../../../package.json'); // eslint-disable-line import/no-unresolved

const packageDir = resolve(process.cwd());
const packageJson = require(`${packageDir}/package.json`); // eslint-disable-line import/no-dynamic-require

const inputFile = glob.sync(`${packageDir}/src/index.+(js|ts)`)[0];

const devDependencies = Object.keys(rootPackageJson.devDependencies);
const peerDependencies = Object.keys(packageJson.peerDependencies);
const dependencies = Object.keys(packageJson.dependencies);
const externalModuleNames = [...dependencies, ...peerDependencies, ...devDependencies];

function external(id) {
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

function writeTo(analysisString) {
  outputFileSync(`${packageDir}/lib/browser/production.analysis.txt`, analysisString);
}

const dirName = basename(packageDir);

function sourcemapPathTransform(sourcePath) {
  if (/node_modules/.test(sourcePath)) return sourcePath;
  return sourcePath.replace('../../src/', `../${dirName}/src/`);
}

const devConfig = {
  external,
  input: inputFile,
  output: {
    file: `${packageDir}/lib/browser/index.js`,
    format: 'esm',
    sourcemap: true,
    sourcemapPathTransform,
  },
  plugins: [...defaultPlugins],
};

const prodConfig = {
  external,
  input: inputFile,
  output: {
    file: `${packageDir}/lib/browser/index.js`,
    format: 'esm',
    sourcemap: true,
    sourcemapPathTransform,
  },
  plugins: [...defaultPlugins, terser(), analyzer({ writeTo })],
};

module.exports = process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
