> **[Documentation](README.md)**

## Index

### Variables

* [SCAFFOLD_DIR_PATH](README.md#const-scaffold_dir_path)
* [failedFileNames](README.md#const-failedfilenames)
* [repoFeatures](README.md#let-repofeatures)
* [rootPackageJson](README.md#let-rootpackagejson)

### Functions

* [createIterateDirCallback](README.md#createiteratedircallback)
* [newMonorepo](README.md#newmonorepo)

## Variables

### `Const` SCAFFOLD_DIR_PATH

• **SCAFFOLD_DIR_PATH**: *"node_modules/@repodog/new-monorepo/scaffold"* = "node_modules/@repodog/new-monorepo/scaffold"

*Defined in [constants.ts:1](https://github.com/dylanaubrey/repodog/blob/e5b373e/packages/new-monorepo/src/constants.ts#L1)*

___

### `Const` failedFileNames

• **failedFileNames**: *`Set<"babel.config.js" | "codecov.yml" | "commitlint.config.js" | ".editorconfig" | ".eslintrc.js" | ".eslintignore" | ".gitignore" | "jest.config.js" | "lerna.json" | "LICENSE" | ".markdownlint.json" | ".node-version" | ".npmrc" | ".prettierrc.js" | "README.md" | "rollup.config.js" | "stylelint.config.js" | ".travis.yml" | "tsconfig.settings.json" | "tslint.json" | "typedoc.js">`* =  new Set<ScaffoldFileName>()

*Defined in [main.ts:24](https://github.com/dylanaubrey/repodog/blob/e5b373e/packages/new-monorepo/src/main.ts#L24)*

___

### `Let` repoFeatures

• **repoFeatures**: *`RepositoryFeatures`* =  []

*Defined in [main.ts:26](https://github.com/dylanaubrey/repodog/blob/e5b373e/packages/new-monorepo/src/main.ts#L26)*

___

### `Let` rootPackageJson

• **rootPackageJson**: *`PackageJson` | undefined*

*Defined in [main.ts:25](https://github.com/dylanaubrey/repodog/blob/e5b373e/packages/new-monorepo/src/main.ts#L25)*

## Functions

###  createIterateDirCallback

▸ **createIterateDirCallback**(`destPath`: string): *`IterateDirectoryCallback`*

*Defined in [main.ts:28](https://github.com/dylanaubrey/repodog/blob/e5b373e/packages/new-monorepo/src/main.ts#L28)*

**Parameters:**

Name | Type |
------ | ------ |
`destPath` | string |

**Returns:** *`IterateDirectoryCallback`*

___

###  newMonorepo

▸ **newMonorepo**(): *`Promise<void>`*

*Defined in [main.ts:46](https://github.com/dylanaubrey/repodog/blob/e5b373e/packages/new-monorepo/src/main.ts#L46)*

**Returns:** *`Promise<void>`*