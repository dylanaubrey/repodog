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

```json
// package.json
{
  "scripts": {
    "build-references": "build-references"
  }
}
```

```shell
# terminal
yarn run build-references
```
