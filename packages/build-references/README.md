# @repodog/build-references

The RepoDog build-references command.

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
