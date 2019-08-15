# @repodog/build-references

The RepoDog build-references command.

[![npm version](https://badge.fury.io/js/%40repodog%2Fbuild-references.svg)](https://badge.fury.io/js/%40repodog%2Fbuild-references)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Installation

```shell
yarn add @repodog/build-references --dev
```

## Usage

The command iterates through each package in a monorepo and adds the `references` objects into each package's
`tsconfig.json` based on the "internal" dependencies in a package's `package.json`.

The command can be configured through the `repodog.config.js` configuration file.

```json
// package.json
{
  "scripts": {
    "build-references": "build-references"
  }
}
```

```javascript
// repodog.config.js
module.exports = {
  buildReferences: {
    global: ['@repodog/types'],
  },
};
```

```shell
# terminal
yarn run build-references
```
