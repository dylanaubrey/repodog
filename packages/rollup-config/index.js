const appRoot = require('app-root-path');
const { outputFileSync } = require('fs-extra');
const { basename, resolve } = require('path');
const { plugin: analyzer } = require('rollup-plugin-analyzer');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const json = require('rollup-plugin-json');
const nodeResolve = require('rollup-plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

const appRootPath = appRoot.toString();
let rootPackageJson;

try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  rootPackageJson = require(resolve(appRootPath, 'package.json'));
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(`No package.json found in in root directory ${appRootPath}`, error);
}

const packageDir = resolve(process.cwd());
let currentPackageJson;

try {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  currentPackageJson = require(`${packageDir}/package.json`);
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(`No package.json found in directory ${packageDir}`, error);
}

const rootDevDependencies = Object.keys(rootPackageJson.devDependencies || {});
const devDependencies = Object.keys(currentPackageJson.devDependencies || {});
const peerDependencies = Object.keys(currentPackageJson.peerDependencies || {});
const dependencies = Object.keys(currentPackageJson.dependencies || {});
const externalModuleNames = [...rootDevDependencies, ...dependencies, ...peerDependencies, ...devDependencies];

function external(id) {
  return externalModuleNames.some(name => id.startsWith(name));
}

const extensions = ['.mjs', '.js', '.jsx', 'json', '.ts', '.tsx'];

const defaultPlugins = [
  nodeResolve({
    extensions,
    preferBuiltins: true,
  }),
  commonjs(),
  json(),
  babel({
    babelHelpers: 'runtime',
    configFile: `${appRootPath}/babel.config.js`,
    extensions,
    skipPreflightCheck: true,
  }),
];

function sourcemapPathTransform(sourcePath) {
  if (/node_modules/.test(sourcePath)) return sourcePath;
  return sourcePath.replace('../../src/', `../${basename(packageDir)}/src/`);
}

module.exports =
  process.env.NODE_ENV === 'development'
    ? {
        external,
        input: `${packageDir}/src/index`,
        output: {
          file: `${packageDir}/lib/browser/index.js`,
          format: 'esm',
          sourcemap: true,
          sourcemapPathTransform,
        },
        plugins: [...defaultPlugins],
      }
    : {
        external,
        input: `${packageDir}/src/index`,
        output: {
          file: `${packageDir}/lib/browser/index.js`,
          format: 'esm',
          sourcemap: true,
          sourcemapPathTransform,
        },
        plugins: [
          ...defaultPlugins,
          terser(),
          analyzer({
            writeTo: analysisString => {
              outputFileSync(`${packageDir}/lib/browser/production.analysis.txt`, analysisString);
            },
          }),
        ],
      };
