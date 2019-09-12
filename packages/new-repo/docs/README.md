> **[Documentation](README.md)**

## Index

### Variables

* [SCAFFOLD_DIR_PATH](README.md#const-scaffold_dir_path)
* [failedFileNames](README.md#const-failedfilenames)
* [repoFeatures](README.md#let-repofeatures)
* [rootPackageJson](README.md#let-rootpackagejson)

### Functions

* [createIterateDirCallback](README.md#createiteratedircallback)
* [getIncludedFileNames](README.md#getincludedfilenames)
* [getIncludedPackages](README.md#getincludedpackages)
* [getPackagePeerDependencies](README.md#getpackagepeerdependencies)
* [isFileExcluded](README.md#isfileexcluded)
* [newRepo](README.md#newrepo)

## Variables

### `Const` SCAFFOLD_DIR_PATH

• **SCAFFOLD_DIR_PATH**: *"node_modules/@repodog/new-repo/scaffold"* = "node_modules/@repodog/new-repo/scaffold"

*Defined in [constants.ts:1](https://github.com/dylanaubrey/repodog/blob/75a5e36/packages/new-repo/src/constants.ts#L1)*

___

### `Const` failedFileNames

• **failedFileNames**: *`Set<"babel.config.js" | "codecov.yml" | "commitlint.config.js" | ".editorconfig" | ".eslintrc.js" | ".eslintignore" | ".gitignore" | "jest.config.js" | "lerna.json" | "LICENSE" | ".markdownlint.json" | ".node-version" | ".npmrc" | ".prettierrc.js" | "README.md" | "rollup.config.js" | "stylelint.config.js" | ".travis.yml" | "tsconfig.settings.json" | "tslint.json" | "typedoc.js">`* =  new Set<ScaffoldFileName>()

*Defined in [main.ts:23](https://github.com/dylanaubrey/repodog/blob/75a5e36/packages/new-repo/src/main.ts#L23)*

___

### `Let` repoFeatures

• **repoFeatures**: *`RepositoryFeatures`* =  []

*Defined in [main.ts:25](https://github.com/dylanaubrey/repodog/blob/75a5e36/packages/new-repo/src/main.ts#L25)*

___

### `Let` rootPackageJson

• **rootPackageJson**: *`PackageJson` | undefined*

*Defined in [main.ts:24](https://github.com/dylanaubrey/repodog/blob/75a5e36/packages/new-repo/src/main.ts#L24)*

## Functions

###  createIterateDirCallback

▸ **createIterateDirCallback**(`destPath`: string): *`IterateDirectoryCallback`*

*Defined in [main.ts:27](https://github.com/dylanaubrey/repodog/blob/75a5e36/packages/new-repo/src/main.ts#L27)*

**Parameters:**

Name | Type |
------ | ------ |
`destPath` | string |

**Returns:** *`IterateDirectoryCallback`*

___

###  getIncludedFileNames

▸ **getIncludedFileNames**(`repoFeatures`: `RepositoryFeatures`): *string[]*

*Defined in [helpers.ts:12](https://github.com/dylanaubrey/repodog/blob/75a5e36/packages/new-repo/src/helpers.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`repoFeatures` | `RepositoryFeatures` |

**Returns:** *string[]*

___

###  getIncludedPackages

▸ **getIncludedPackages**(`repoFeatures`: `RepositoryFeatures`, `failedFileNames`: `Set<ScaffoldFileName>`): *string[]*

*Defined in [helpers.ts:19](https://github.com/dylanaubrey/repodog/blob/75a5e36/packages/new-repo/src/helpers.ts#L19)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`repoFeatures` | `RepositoryFeatures` | - |
`failedFileNames` | `Set<ScaffoldFileName>` |  new Set() |

**Returns:** *string[]*

___

###  getPackagePeerDependencies

▸ **getPackagePeerDependencies**(`pkgNames`: string[]): *string[]*

*Defined in [helpers.ts:39](https://github.com/dylanaubrey/repodog/blob/75a5e36/packages/new-repo/src/helpers.ts#L39)*

**Parameters:**

Name | Type |
------ | ------ |
`pkgNames` | string[] |

**Returns:** *string[]*

___

###  isFileExcluded

▸ **isFileExcluded**(`fileName`: string, `repoFeatures`: `RepositoryFeatures`): *boolean*

*Defined in [helpers.ts:51](https://github.com/dylanaubrey/repodog/blob/75a5e36/packages/new-repo/src/helpers.ts#L51)*

**Parameters:**

Name | Type |
------ | ------ |
`fileName` | string |
`repoFeatures` | `RepositoryFeatures` |

**Returns:** *boolean*

___

###  newRepo

▸ **newRepo**(): *`Promise<void>`*

*Defined in [main.ts:39](https://github.com/dylanaubrey/repodog/blob/75a5e36/packages/new-repo/src/main.ts#L39)*

**Returns:** *`Promise<void>`*