# @repodog/new-repo

The RepoDog new-repo command.

[![npm version](https://badge.fury.io/js/%40repodog%2Fnew-repo.svg)](https://badge.fury.io/js/%40repodog%2Fnew-repo)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Installation

```shell
yarn add @repodog/new-repo --dev
```

## Usage

The command creates a new repo in an existing project, copying over scaffolding files for Typescript, popular
linters and build tools, and merging its `package.json` with the one in the root of the project. It then installs
the project's dependencies.

```json
// package.json
{
  "scripts": {
    "new-repo": "new-repo"
  }
}
```

```shell
# terminal
yarn run new-repo
```
