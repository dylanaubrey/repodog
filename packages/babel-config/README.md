# @repodog/babel-config

The RepoDog Babel config.

[![npm version](https://badge.fury.io/js/%40repodog%2Fbabel-config.svg)](https://badge.fury.io/js/%40repodog%2Fbabel-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Installation

```shell
yarn add @repodog/babel-config --dev
```

## Usage

```javascript
// babel.config.js
const repodogConfig = require('@repodog/babel-config');

module.exports = api => ({
  ...repodogConfig(api),
});
```
