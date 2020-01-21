[Documentation](README.md)

# Documentation

## Index

### Variables

* [SCAFFOLD_DIR_PATH](README.md#const-scaffold_dir_path)
* [content](README.md#const-content)
* [failedFileNames](README.md#const-failedfilenames)
* [repoFeatures](README.md#let-repofeatures)
* [rootPackageJson](README.md#let-rootpackagejson)

### Functions

* [createIterateDirCallback](README.md#createiteratedircallback)
* [generateNPMIgnore](README.md#generatenpmignore)
* [getConfigsCheckedAgainstDependantOn](README.md#getconfigscheckedagainstdependanton)
* [getFeatureSpecificDependencies](README.md#getfeaturespecificdependencies)
* [getIncludedFileNames](README.md#getincludedfilenames)
* [getIncludedPackages](README.md#getincludedpackages)
* [getPackageDependencies](README.md#getpackagedependencies)
* [isFileExcluded](README.md#isfileexcluded)
* [newRepo](README.md#newrepo)

## Variables

### `Const` SCAFFOLD_DIR_PATH

• **SCAFFOLD_DIR_PATH**: *"node_modules/@repodog/new-repo/scaffold"* = "node_modules/@repodog/new-repo/scaffold"

*Defined in [constants.ts:1](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/constants.ts#L1)*

___

### `Const` content

• **content**: *"
.nyc_output/
.sonar/
.vscode/
bundle/
coverage/
docs/
test/
*.log
.*
*.config.js
CHANGELOG.md
CONTRIBUTING.md
codecov.yml
gulpfile.js
karma.*
lerna.json
mocha.opts
package-lock.json
repodog.config.json
sonar-project.properties
test-setup.js
tsconfig.*
tslint.*
typedoc.js
webpack.*
yarn.lock
"* =  `
.nyc_output/
.sonar/
.vscode/
bundle/
coverage/
docs/
test/
*.log
.*
*.config.js
CHANGELOG.md
CONTRIBUTING.md
codecov.yml
gulpfile.js
karma.*
lerna.json
mocha.opts
package-lock.json
repodog.config.json
sonar-project.properties
test-setup.js
tsconfig.*
tslint.*
typedoc.js
webpack.*
yarn.lock
`

*Defined in [helpers/generate-npm-ignore/index.ts:5](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/helpers/generate-npm-ignore/index.ts#L5)*

___

### `Const` failedFileNames

• **failedFileNames**: *Set‹"babel.config.js" | "codecov.yml" | "commitlint.config.js" | ".editorconfig" | ".eslintrc.js" | ".eslintignore" | ".gitignore" | "jest.config.js" | "lerna.json" | "LICENSE" | ".markdownlint.json" | ".node-version" | ".npmrc" | ".prettierrc.js" | "README.md" | "rollup.config.js" | "stylelint.config.js" | ".travis.yml" | "tsconfig.settings.json" | "tslint.json" | "typedoc.js"›* =  new Set<ScaffoldFileName>()

*Defined in [main.ts:27](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/main.ts#L27)*

___

### `Let` repoFeatures

• **repoFeatures**: *RepositoryFeature[]* =  []

*Defined in [main.ts:29](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/main.ts#L29)*

___

### `Let` rootPackageJson

• **rootPackageJson**: *PackageJson | undefined*

*Defined in [main.ts:28](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/main.ts#L28)*

## Functions

###  createIterateDirCallback

▸ **createIterateDirCallback**(`destPath`: string): *IterateDirectoryCallback*

*Defined in [main.ts:31](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/main.ts#L31)*

**Parameters:**

Name | Type |
------ | ------ |
`destPath` | string |

**Returns:** *IterateDirectoryCallback*

___

###  generateNPMIgnore

▸ **generateNPMIgnore**(): *void*

*Defined in [helpers/generate-npm-ignore/index.ts:34](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/helpers/generate-npm-ignore/index.ts#L34)*

**Returns:** *void*

___

###  getConfigsCheckedAgainstDependantOn

▸ **getConfigsCheckedAgainstDependantOn**(`dependencyConfigs`: DependencyConfig[], `repoFeatures`: RepositoryFeature[]): *string[]*

*Defined in [helpers/get-configs-checked-against-dependant-on/index.ts:4](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/helpers/get-configs-checked-against-dependant-on/index.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`dependencyConfigs` | DependencyConfig[] |
`repoFeatures` | RepositoryFeature[] |

**Returns:** *string[]*

___

###  getFeatureSpecificDependencies

▸ **getFeatureSpecificDependencies**(`__namedParameters`: object, `repoFeatures`: RepositoryFeature[]): *string[]*

*Defined in [helpers/get-feature-specific-dependencies/index.ts:5](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/helpers/get-feature-specific-dependencies/index.ts#L5)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`core` | string[] | - |
`css` | string &#124; [string, object][] |  [] |
`monorepo` | string &#124; [string, object][] |  [] |
`react` | string &#124; [string, object][] |  [] |
`typescript` | string &#124; [string, object][] |  [] |

▪ **repoFeatures**: *RepositoryFeature[]*

**Returns:** *string[]*

___

###  getIncludedFileNames

▸ **getIncludedFileNames**(`repoFeatures`: RepositoryFeature[]): *string[]*

*Defined in [helpers/get-included-file-names/index.ts:4](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/helpers/get-included-file-names/index.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`repoFeatures` | RepositoryFeature[] |

**Returns:** *string[]*

___

###  getIncludedPackages

▸ **getIncludedPackages**(`repoFeatures`: RepositoryFeature[], `failedFileNames`: Set‹ScaffoldFileName›): *string[]*

*Defined in [helpers/get-included-packages/index.ts:6](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/helpers/get-included-packages/index.ts#L6)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`repoFeatures` | RepositoryFeature[] | - |
`failedFileNames` | Set‹ScaffoldFileName› |  new Set() |

**Returns:** *string[]*

___

###  getPackageDependencies

▸ **getPackageDependencies**(`pkgNames`: string[], `repoFeatures`: RepositoryFeature[]): *string[]*

*Defined in [helpers/get-package-dependencies/index.ts:5](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/helpers/get-package-dependencies/index.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`pkgNames` | string[] |
`repoFeatures` | RepositoryFeature[] |

**Returns:** *string[]*

___

###  isFileExcluded

▸ **isFileExcluded**(`fileName`: string, `repoFeatures`: RepositoryFeature[]): *boolean*

*Defined in [helpers/is-file-excluded/index.ts:4](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/helpers/is-file-excluded/index.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`fileName` | string |
`repoFeatures` | RepositoryFeature[] |

**Returns:** *boolean*

___

###  newRepo

▸ **newRepo**(): *Promise‹void›*

*Defined in [main.ts:43](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/new-repo/src/main.ts#L43)*

**Returns:** *Promise‹void›*
