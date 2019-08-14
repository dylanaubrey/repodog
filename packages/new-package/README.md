# @repodog/new-package

The RepoDog new-package command.

[![npm version](https://badge.fury.io/js/%40repodog%2Fnew-package.svg)](https://badge.fury.io/js/%40repodog%2Fnew-package)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Installation

```shell
yarn add @repodog/new-package --dev
```

## Usage

The command creates a new package in a project, copying over scaffolding files from the `.repodog/scaffold/new-package`
folder and updating the `package.json` with the `name` and `description` provided. It then installs the package's
dependencies and builds Typescript references for the package.

```json
// package.json
{
  "scripts": {
    "new-package": "new-package"
  }
}
```

```shell
# terminal
yarn run new-package --name package-name --desc "A package description." --deps dependency-a dependency-b
```
