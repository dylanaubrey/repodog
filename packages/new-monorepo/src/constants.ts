import { PACKAGE_JSON_FILENAME } from "@repodog/constants";

export const DUPLICATE = "duplicate";
export const FAIL = "fail";
export const MERGE = "merge";
export const OVERWRITE = "overwrite";

export const COPY_BEHAVIOUR = {
  DUPLICATE,
  FAIL,
  MERGE,
  OVERWRITE,
};

export const DEST_INTO_SCAFFOLD = "destIntoScaffold";
export const SCAFFOLD_INTO_DEST = "scaffoldIntoDest";

export const MERGE_STRATEGY = {
  DEST_INTO_SCAFFOLD,
  SCAFFOLD_INTO_DEST,
};

export const JS_EXT = ".js";
export const JSON_EXT = ".json";
export const MARKDOWN_EXT = ".md";
export const YAML_EXT = ".yml";

export const BROWSER = "browser";
export const CSS = "css";
export const REACT = "react";
export const TYPESCRIPT = "typescript";

export const REPO_FEATURES = {
  BROWSER,
  CSS,
  REACT,
  TYPESCRIPT,
};

export const SCAFFOLD_DIR_PATH = "node_modules/@repodog/new-monorepo/scaffold";

export const BABEL_CONFIG = "babel.config.js";
export const CODECOV_CONFIG = "codecov.yml";
export const COMMITLINT_CONFIG = "commitlint.config.js";
export const EDITOR_CONFIG = ".editorconfig";
export const ESLINT_CONFIG = ".eslintrc.js";
export const ESLINT_IGNORE = ".eslintignore";
export const GIT_IGNORE = ".gitignore";
export const JEST_CONFIG = "jest.config.js";
export const LERNA_CONFIG = "lerna.json";
export const LICENSE = "LICENSE";
export const MARKDOWN_LINT_CONFIG = ".markdownlint.json";
export const NODE_VERSION = ".node-version";
export const NPMRC = ".npmrc";
export const PRETTIER_CONFIG = ".prettierrc.js";
export const README = "README.md";
export const ROLLUP_CONFIG = "rollup.config.js";
export const STYLELINT_CONFIG = "stylelint.config.js";
export const TRAVIS_CONFIG = ".travis.yml";
export const TSCONFIG = "tsconfig.settings.json";
export const TSLINT_CONFIG = "tslint.json";
export const TYPEDOC_CONFIG = "typedoc.js";

export const SCAFFOLD_FILE_NAMES = {
  BABEL_CONFIG,
  CODECOV_CONFIG,
  COMMITLINT_CONFIG,
  EDITOR_CONFIG,
  ESLINT_CONFIG,
  ESLINT_IGNORE,
  GIT_IGNORE,
  JEST_CONFIG,
  LERNA_CONFIG,
  LICENSE,
  MARKDOWN_LINT_CONFIG,
  NODE_VERSION,
  NPMRC,
  PACKAGE_JSON: PACKAGE_JSON_FILENAME,
  PRETTIER_CONFIG,
  README,
  ROLLUP_CONFIG,
  STYLELINT_CONFIG,
  TRAVIS_CONFIG,
  TSCONFIG,
  TSLINT_CONFIG,
  TYPEDOC_CONFIG,
};

export const BASE_REPO_FILE_NAMES = {
  BABEL_CONFIG,
  CODECOV_CONFIG,
  COMMITLINT_CONFIG,
  EDITOR_CONFIG,
  ESLINT_CONFIG,
  ESLINT_IGNORE,
  GIT_IGNORE,
  JEST_CONFIG,
  LERNA_CONFIG,
  LICENSE,
  MARKDOWN_LINT_CONFIG,
  NODE_VERSION,
  NPMRC,
  PACKAGE_JSON: PACKAGE_JSON_FILENAME,
  PRETTIER_CONFIG,
  README,
  TRAVIS_CONFIG,
};

export const REPO_FEATURES_TO_SCAFFOLD_FILE_NAMES = {
  [BROWSER]: [ROLLUP_CONFIG],
  [CSS]: [STYLELINT_CONFIG],
  [REACT]: [],
  [TYPESCRIPT]: [TSCONFIG, TSLINT_CONFIG, TYPEDOC_CONFIG],
};

export const FILE_NAMES_EXCLUDED_FROM_MERGE = [LICENSE];

export const EXTS_EXCLUDED_FROM_MERGE = [JS_EXT, MARKDOWN_EXT];

export const BABEL_CONFIG_PKG = "@repodog/babel-config";
export const BUILD_REFERENCES_PKG = "@repodog/build-references";
export const COMMITLINT_CONFIG_PKG = "@repodog/commitlint-config";
export const ESLINT_CONFIG_PKG = "@repodog/eslint-config";
export const JEST_CONFIG_PKG = "@repodog/jest-config";
export const LERNA_CONFIG_PKG = "@repodog/lerna-config";
export const MARKDOWN_LINT_CONFIG_PKG = "@repodog/markdownlint-config";
export const NEW_PACKAGE_PKG = "@repodog/new-package";
export const PRETTIER_CONFIG_PKG = "@repodog/prettier-config";
export const ROLLUP_CONFIG_PKG = "@repodog/rollup-config";
export const STYLELINT_CONFIG_PKG = "@repodog/stylelint-config";
export const TS_CONFIG_PKG = "@repodog/ts-config";
export const TSLINT_CONFIG_PKG = "@repodog/tslint-config";
export const TYPEDOC_CONFIG_PKG = "@repodog/typedoc-config";

export const BASE_REPO_PKGS = {
  BABEL_CONFIG_PKG,
  BUILD_REFERENCES_PKG,
  COMMITLINT_CONFIG_PKG,
  ESLINT_CONFIG_PKG,
  JEST_CONFIG_PKG,
  LERNA_CONFIG_PKG,
  MARKDOWN_LINT_CONFIG_PKG,
  NEW_PACKAGE_PKG,
  PRETTIER_CONFIG_PKG,
};

export const REPO_FEATURES_TO_REPO_PKGS = {
  [BROWSER]: [ROLLUP_CONFIG_PKG],
  [CSS]: [STYLELINT_CONFIG_PKG],
  [REACT]: [],
  [TYPESCRIPT]: [TS_CONFIG_PKG, TSLINT_CONFIG_PKG, TYPEDOC_CONFIG_PKG],
};

export const FILE_NAMES_TO_PKG_NAMES = {
  [BABEL_CONFIG]: [BABEL_CONFIG_PKG],
  [CODECOV_CONFIG]: [],
  [COMMITLINT_CONFIG]: [COMMITLINT_CONFIG_PKG],
  [EDITOR_CONFIG]: [],
  [ESLINT_CONFIG]: [ESLINT_CONFIG_PKG],
  [ESLINT_IGNORE]: [],
  [GIT_IGNORE]: [],
  [JEST_CONFIG]: [JEST_CONFIG_PKG],
  [LERNA_CONFIG]: [],
  [LICENSE]: [],
  [MARKDOWN_LINT_CONFIG]: [MARKDOWN_LINT_CONFIG_PKG],
  [NODE_VERSION]: [],
  [NPMRC]: [],
  [PACKAGE_JSON_FILENAME]: [],
  [PRETTIER_CONFIG]: [PRETTIER_CONFIG_PKG],
  [README]: [],
  [ROLLUP_CONFIG]: [ROLLUP_CONFIG_PKG],
  [STYLELINT_CONFIG]: [STYLELINT_CONFIG_PKG],
  [TRAVIS_CONFIG]: [],
  [TSCONFIG]: [TS_CONFIG_PKG],
  [TSLINT_CONFIG]: [TSLINT_CONFIG_PKG],
  [TYPEDOC_CONFIG]: [TYPEDOC_CONFIG_PKG],
};
