# @repodog/babel-config

The RepoDog Babel config.

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
