import { outputFileSync } from "fs-extra";
import { basename, resolve } from "path";
import { plugin as analyzer } from "rollup-plugin-analyzer";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import nodeResolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import rootPackageJson from "./package.json";

const dirRoot = resolve(process.cwd());

const packageJson = require(`${dirRoot}/package.json`);

const devDependencies = Object.keys(rootPackageJson.devDependencies);
const peerDependencies = Object.keys(packageJson.peerDependencies);
const dependencies = Object.keys(packageJson.dependencies);
const externalModuleNames = [...dependencies, ...peerDependencies, ...devDependencies];

function external(id: string) {
  return externalModuleNames.some((name) => id.startsWith(name));
}

const extensions = [".mjs", ".js", ".jsx", "json", ".ts", ".tsx"];

const defaultPlugins = [
  nodeResolve({
    extensions,
  }),
  commonjs(),
  json(),
  babel({
    configFile: "../../babel.config.js",
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
  return sourcePath.replace("../../src/", `../${dirName}/src/`);
}

const devConfig = {
  external,
  input: `${dirRoot}/src/index.ts`,
  output: {
    file: `${dirRoot}/lib/browser/index.js`,
    format: "esm",
    sourcemap: true,
    sourcemapPathTransform,
  },
  plugins: [
    ...defaultPlugins,
  ],
};

const prodConfig = {
  external,
  input: `${dirRoot}/src/index.ts`,
  output: {
    file: `${dirRoot}/lib/browser/index.js`,
    format: "esm",
    sourcemap: true,
    sourcemapPathTransform,
  },
  plugins: [
    ...defaultPlugins,
    terser(),
    analyzer({ writeTo }),
  ],
};

const config = [];

if (process.env.NODE_ENV === "development") {
  config.push(devConfig);
} else {
  config.push(prodConfig);
}

export default config;
