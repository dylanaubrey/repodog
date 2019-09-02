export type CopyBehaviour = "duplicate" | "fail" | "merge" | "overwrite";

export type MergeStrategy = "destIntoScaffold" | "scaffoldIntoDest";

export type RepositoryFeatures = Array<"browser" | "css" | "react" | "typescript">;

export type BABEL_CONFIG = "babel.config.js";
export type CODECOV_CONFIG = "codecov.yml";
export type COMMITLINT_CONFIG = "commitlint.config.js";
export type EDITOR_CONFIG = ".editorconfig";
export type ESLINT_CONFIG = ".eslintrc.js";
export type ESLINT_IGNORE = ".eslintignore";
export type GIT_IGNORE = ".gitignore";
export type JEST_CONFIG = "jest.config.js";
export type LERNA_CONFIG = "lerna.json";
export type LICENSE = "LICENSE";
export type MARKDOWN_LINT_CONFIG = ".markdownlint.json";
export type NODE_VERSION = ".node-version";
export type NPMRC = ".npmrc";
export type PRETTIER_CONFIG = ".prettierrc.js";
export type README = "README.md";
export type ROLLUP_CONFIG = "rollup.config.js";
export type STYLELINT_CONFIG = "stylelint.config.js";
export type TRAVIS_CONFIG = ".travis.yml";
export type TSCONFIG = "tsconfig.settings.json";
export type TSLINT_CONFIG = "tslint.json";
export type TYPEDOC_CONFIG = "typedoc.js";

export type ScaffoldFileName =
  | BABEL_CONFIG
  | CODECOV_CONFIG
  | COMMITLINT_CONFIG
  | EDITOR_CONFIG
  | ESLINT_CONFIG
  | ESLINT_IGNORE
  | GIT_IGNORE
  | JEST_CONFIG
  | LERNA_CONFIG
  | LICENSE
  | MARKDOWN_LINT_CONFIG
  | NODE_VERSION
  | NPMRC
  | PRETTIER_CONFIG
  | README
  | ROLLUP_CONFIG
  | STYLELINT_CONFIG
  | TRAVIS_CONFIG
  | TSCONFIG
  | TSLINT_CONFIG
  | TYPEDOC_CONFIG;
