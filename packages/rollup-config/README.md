# @repodog/rollup-config

The RepoDog Rollup config.

[![npm version](https://badge.fury.io/js/%40repodog%2Frollup-config.svg)](https://badge.fury.io/js/%40repodog%2Frollup-config)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Installation

```shell
yarn add @repodog/rollup-config rollup rollup-plugin-analyzer rollup-plugin-babel@next rollup-plugin-commonjs
  rollup-plugin-json rollup-plugin-node-resolve rollup-plugin-terser --dev
```

## Usage

```javascript
// rollup.config.js
const repodogConfig = require('@repodog/rollup-config');

module.exports = {
  ...repodogConfig,
};
```
