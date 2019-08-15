# @repodog/new-monorepo

The RepoDog new-monorepo command.

[![npm version](https://badge.fury.io/js/%40repodog%2Fnew-monorepo.svg)](https://badge.fury.io/js/%40repodog%2Fnew-monorepo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Installation

```shell
yarn add @repodog/new-monorepo --dev
```

## Usage

The command creates a new monorepo in an existing project, copying over scaffolding files for Typescript, popular
linters and build tools, and merging its `package.json` with the one in the root of the project. It then installs
the project's dependencies, bootstraps each package, and builds Typescript references for each package.

The command can be configured through the `repodog.config.js` configuration file.

```json
// package.json
{
  "scripts": {
    "new-monorepo": "new-monorepo"
  }
}
```

```javascript
// repodog.config.js
module.exports = {
  newMonorepo: {
    scaffold: {
      exclude: [
        /tsconfig/
      ],
    },
  },
};
```

```shell
# terminal
yarn run new-monorepo
```
