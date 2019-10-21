const appRoot = require('app-root-path');
const { resolve } = require('path');

const consts = {
  BROWSER: 'browser',
  MONOREPO: 'monorepo',
  REACT: 'react',
  TYPESCRIPT: 'typescript',
};

const defaultConfig = {
  features: [],
  packagesPath: '',
  scaffoldPath: '',
};

function loadRepositoryConfig() {
  try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    return require(resolve(appRoot.toString(), 'repodog.config.js'));
  } catch {
    return defaultConfig;
  }
}

module.exports = { consts, loadRepositoryConfig };
