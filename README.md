# Repodog

An opinionated command line utility for managing a repository.

[![Build Status](https://travis-ci.org/dylanaubrey/repodog.svg?branch=master)](https://travis-ci.org/dylanaubrey/repodog)
[![codecov](https://codecov.io/gh/dylanaubrey/repodog/branch/master/graph/badge.svg)](https://codecov.io/gh/dylanaubrey/repodog)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![npm version](https://badge.fury.io/js/repodog.svg)](https://badge.fury.io/js/repodog)
[![dependencies Status](https://david-dm.org/dylanaubrey/repodog/status.svg)](https://david-dm.org/dylanaubrey/repodog)
[![devDependencies Status](https://david-dm.org/dylanaubrey/repodog/dev-status.svg)](https://david-dm.org/dylanaubrey/repodog?type=dev)

## Installation

```bash
yarn add repodog --dev
```

## Commands

### new-package

The script creates a new monorepo package from scaffolding files in the `.repodog/scaffold/new-package/` folder and
generates/updates the package's package.json with the name and description arguments passed to the script. The package
version is taken from the package.json in the root of the project. The script also provides a `new-package:post` script
hook that runs after a new package has been created.

```json
"scripts": {
  "new-package": "new-package",
  "new-package:post": "lerna bootstrap"
}
```

```bash
yarn run new-package --name valid-name --desc "A valid package description."
```
