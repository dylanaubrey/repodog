[Documentation](README.md)

# Documentation

## Index

### Interfaces

* [IterateDirectoryOptions](interfaces/iteratedirectoryoptions.md)
* [SyncDependencyVersionsParams](interfaces/syncdependencyversionsparams.md)
* [ValidatePackageNameResult](interfaces/validatepackagenameresult.md)
* [ValidatePackageNamesResult](interfaces/validatepackagenamesresult.md)

### Type aliases

* [IterateDependenciesCallback](README.md#iteratedependenciescallback)
* [IterateDirectoryCallback](README.md#iteratedirectorycallback)
* [IteratePackagesCallback](README.md#iteratepackagescallback)
* [IteratePackagesErrorCallback](README.md#iteratepackageserrorcallback)
* [SortObjectComparator](README.md#sortobjectcomparator)

### Variables

* [packageJson](README.md#let-packagejson)
* [packageJsons](README.md#const-packagejsons)
* [repodogConfig](README.md#let-repodogconfig)
* [tsConfigs](README.md#const-tsconfigs)

### Functions

* [copyFile](README.md#copyfile)
* [error](README.md#error)
* [exec](README.md#exec)
* [executeCopyBehaviour](README.md#executecopybehaviour)
* [formatFileContents](README.md#formatfilecontents)
* [info](README.md#info)
* [iterateDependencies](README.md#iteratedependencies)
* [iterateDirectory](README.md#iteratedirectory)
* [iteratePackages](README.md#iteratepackages)
* [loadPackageJson](README.md#loadpackagejson)
* [loadRepodogConfig](README.md#loadrepodogconfig)
* [loadRootPackageJson](README.md#loadrootpackagejson)
* [loadTSConfig](README.md#loadtsconfig)
* [mergeFile](README.md#mergefile)
* [nvmInstall](README.md#nvminstall)
* [resolvePathToCwd](README.md#resolvepathtocwd)
* [run](README.md#run)
* [sanitizeVersion](README.md#sanitizeversion)
* [sortObject](README.md#sortobject)
* [syncDependencyVersions](README.md#syncdependencyversions)
* [syncVersions](README.md#syncversions)
* [validatePackageName](README.md#validatepackagename)
* [validatePackageNames](README.md#validatepackagenames)
* [warn](README.md#warn)
* [writePackageJson](README.md#writepackagejson)
* [writeRepodogConfig](README.md#writerepodogconfig)
* [writeTSConfig](README.md#writetsconfig)

### Object literals

* [defaultRepodogConfig](README.md#const-defaultrepodogconfig)

## Type aliases

###  IterateDependenciesCallback

Ƭ **IterateDependenciesCallback**: *function*

*Defined in [types.ts:4](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/types.ts#L4)*

#### Type declaration:

▸ (`params`: object): *void*

**Parameters:**

▪ **params**: *object*

Name | Type |
------ | ------ |
`name` | string |
`version` | string |

___

###  IterateDirectoryCallback

Ƭ **IterateDirectoryCallback**: *function*

*Defined in [types.ts:6](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/types.ts#L6)*

#### Type declaration:

▸ (`params`: object): *Promise‹void›*

**Parameters:**

▪ **params**: *object*

Name | Type |
------ | ------ |
`fileName` | string |
`filePath` | string |
`stats` | Stats |

___

###  IteratePackagesCallback

Ƭ **IteratePackagesCallback**: *function*

*Defined in [types.ts:12](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/types.ts#L12)*

#### Type declaration:

▸ (`params`: object): *void*

**Parameters:**

▪ **params**: *object*

Name | Type |
------ | ------ |
`dirName` | string |
`fullPath` | string |
`packageJson?` | PackageJson |

___

###  IteratePackagesErrorCallback

Ƭ **IteratePackagesErrorCallback**: *function*

*Defined in [types.ts:18](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/types.ts#L18)*

#### Type declaration:

▸ (`params`: object): *void*

**Parameters:**

▪ **params**: *object*

Name | Type |
------ | ------ |
`dirName` | string |
`fullPath` | string |

___

###  SortObjectComparator

Ƭ **SortObjectComparator**: *ReadonlyArray‹keyof T› | function*

*Defined in [types.ts:20](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/types.ts#L20)*

## Variables

### `Let` packageJson

• **packageJson**: *PackageJson*

*Defined in [load-root-package-json/index.ts:6](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-root-package-json/index.ts#L6)*

___

### `Const` packageJsons

• **packageJsons**: *Map‹string, PackageJson›* =  new Map()

*Defined in [load-write-package-json/index.ts:8](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-package-json/index.ts#L8)*

___

### `Let` repodogConfig

• **repodogConfig**: *RepodogConfig*

*Defined in [load-write-repodog-config/index.ts:8](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-repodog-config/index.ts#L8)*

___

### `Const` tsConfigs

• **tsConfigs**: *Map‹string, TSConfig›* =  new Map()

*Defined in [load-write-tsconfig/index.ts:7](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-tsconfig/index.ts#L7)*

## Functions

###  copyFile

▸ **copyFile**(`fileName`: string, `destPath`: string, `srcPath`: string, `failedFileNames`: Set‹ScaffoldFileName›): *Promise‹void›*

*Defined in [copy-file/index.ts:21](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/copy-file/index.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`fileName` | string |
`destPath` | string |
`srcPath` | string |
`failedFileNames` | Set‹ScaffoldFileName› |

**Returns:** *Promise‹void›*

___

###  error

▸ **error**(`message`: string): *void*

*Defined in [commands/index.ts:5](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/commands/index.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

###  exec

▸ **exec**(`command`: string, `options`: ExecOptions): *string & ShellReturnValue | ChildProcess*

*Defined in [commands/index.ts:10](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/commands/index.ts#L10)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`command` | string | - |
`options` | ExecOptions |  {} |

**Returns:** *string & ShellReturnValue | ChildProcess*

___

###  executeCopyBehaviour

▸ **executeCopyBehaviour**(`copyBehaviour`: CopyBehaviour, `mergeStrategy`: MergeStrategy | undefined, `fileName`: string, `destPath`: string, `srcPath`: string, `parsedPath`: ParsedPath, `failedFileNames`: Set‹ScaffoldFileName›): *void*

*Defined in [copy-file/index.ts:79](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/copy-file/index.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`copyBehaviour` | CopyBehaviour |
`mergeStrategy` | MergeStrategy &#124; undefined |
`fileName` | string |
`destPath` | string |
`srcPath` | string |
`parsedPath` | ParsedPath |
`failedFileNames` | Set‹ScaffoldFileName› |

**Returns:** *void*

___

###  formatFileContents

▸ **formatFileContents**(`contents`: string): *string[]*

*Defined in [merge-file/index.ts:12](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/merge-file/index.ts#L12)*

**Parameters:**

Name | Type |
------ | ------ |
`contents` | string |

**Returns:** *string[]*

___

###  info

▸ **info**(`message`: string): *void*

*Defined in [commands/index.ts:14](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/commands/index.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

###  iterateDependencies

▸ **iterateDependencies**(`dependencies`: Dependency, `callback`: [IterateDependenciesCallback](README.md#iteratedependenciescallback)): *void*

*Defined in [iterate-dependencies/index.ts:4](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/iterate-dependencies/index.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`dependencies` | Dependency |
`callback` | [IterateDependenciesCallback](README.md#iteratedependenciescallback) |

**Returns:** *void*

___

###  iterateDirectory

▸ **iterateDirectory**(`fullPath`: string, `callback`: [IterateDirectoryCallback](README.md#iteratedirectorycallback), `__namedParameters`: object): *Promise‹void›*

*Defined in [iterate-directory/index.ts:6](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/iterate-directory/index.ts#L6)*

**Parameters:**

▪ **fullPath**: *string*

▪ **callback**: *[IterateDirectoryCallback](README.md#iteratedirectorycallback)*

▪`Default value`  **__namedParameters**: *object*=  {}

Name | Type |
------ | ------ |
`sync` | undefined &#124; false &#124; true |

**Returns:** *Promise‹void›*

___

###  iteratePackages

▸ **iteratePackages**(`callback`: [IteratePackagesCallback](README.md#iteratepackagescallback), `errorCallback?`: [IteratePackagesErrorCallback](README.md#iteratepackageserrorcallback)): *void*

*Defined in [iterate-packages/index.ts:9](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/iterate-packages/index.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`callback` | [IteratePackagesCallback](README.md#iteratepackagescallback) |
`errorCallback?` | [IteratePackagesErrorCallback](README.md#iteratepackageserrorcallback) |

**Returns:** *void*

___

###  loadPackageJson

▸ **loadPackageJson**(`path`: string): *undefined | object & NonStandardEntryPoints & TypeScriptConfiguration & YarnConfiguration & JSPMConfiguration & object*

*Defined in [load-write-package-json/index.ts:10](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-package-json/index.ts#L10)*

**Parameters:**

Name | Type |
------ | ------ |
`path` | string |

**Returns:** *undefined | object & NonStandardEntryPoints & TypeScriptConfiguration & YarnConfiguration & JSPMConfiguration & object*

___

###  loadRepodogConfig

▸ **loadRepodogConfig**(): *RepodogConfig*

*Defined in [load-write-repodog-config/index.ts:16](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-repodog-config/index.ts#L16)*

**Returns:** *RepodogConfig*

___

###  loadRootPackageJson

▸ **loadRootPackageJson**(): *PackageJson | undefined*

*Defined in [load-root-package-json/index.ts:8](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-root-package-json/index.ts#L8)*

**Returns:** *PackageJson | undefined*

___

###  loadTSConfig

▸ **loadTSConfig**(`fullPath`: string): *undefined | TSConfig*

*Defined in [load-write-tsconfig/index.ts:9](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-tsconfig/index.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`fullPath` | string |

**Returns:** *undefined | TSConfig*

___

###  mergeFile

▸ **mergeFile**(`mergeStrategy`: MergeStrategy, `destPath`: string, `srcPath`: string, `__namedParameters`: object): *void*

*Defined in [merge-file/index.ts:16](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/merge-file/index.ts#L16)*

**Parameters:**

▪ **mergeStrategy**: *MergeStrategy*

▪ **destPath**: *string*

▪ **srcPath**: *string*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`base` | string |
`ext` | string |

**Returns:** *void*

___

###  nvmInstall

▸ **nvmInstall**(`scaffoldDirPath`: string): *Promise‹void›*

*Defined in [nvm-install/index.ts:7](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/nvm-install/index.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`scaffoldDirPath` | string |

**Returns:** *Promise‹void›*

___

###  resolvePathToCwd

▸ **resolvePathToCwd**(...`path`: keyof string[]): *string*

*Defined in [resolve-path-to-cwd/index.ts:4](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/resolve-path-to-cwd/index.ts#L4)*

**Parameters:**

Name | Type |
------ | ------ |
`...path` | keyof string[] |

**Returns:** *string*

___

###  run

▸ **run**(`command`: string, `options`: ExecOptions): *void*

*Defined in [commands/index.ts:18](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/commands/index.ts#L18)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`command` | string | - |
`options` | ExecOptions |  {} |

**Returns:** *void*

___

###  sanitizeVersion

▸ **sanitizeVersion**(`version`: string): *string*

*Defined in [sanitize-version/index.ts:1](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/sanitize-version/index.ts#L1)*

**Parameters:**

Name | Type |
------ | ------ |
`version` | string |

**Returns:** *string*

___

###  sortObject

▸ **sortObject**<**O**>(`obj`: O, `comparator?`: [SortObjectComparator](README.md#sortobjectcomparator)‹O›): *O*

*Defined in [sort-object/index.ts:5](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/sort-object/index.ts#L5)*

**Type parameters:**

▪ **O**: *JsonObject*

**Parameters:**

Name | Type |
------ | ------ |
`obj` | O |
`comparator?` | [SortObjectComparator](README.md#sortobjectcomparator)‹O› |

**Returns:** *O*

___

###  syncDependencyVersions

▸ **syncDependencyVersions**(`__namedParameters`: object): *object*

*Defined in [sync-dependency-versions/index.ts:32](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/sync-dependency-versions/index.ts#L32)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`dependencies` | Dependency |
`devDependencies` | Dependency |
`name` | string |

**Returns:** *object*

* **dependencies**: *StringObjectMap* =  syncVersions(name, { ...dependencies })

* **devDependencies**: *StringObjectMap* =  syncVersions(name, { ...devDependencies })

___

###  syncVersions

▸ **syncVersions**(`name`: string, `dependencies`: StringObjectMap): *StringObjectMap*

*Defined in [sync-dependency-versions/index.ts:8](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/sync-dependency-versions/index.ts#L8)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`dependencies` | StringObjectMap |

**Returns:** *StringObjectMap*

___

###  validatePackageName

▸ **validatePackageName**(`name`: string): *[ValidatePackageNameResult](interfaces/validatepackagenameresult.md)*

*Defined in [validate-package-names/index.ts:5](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/validate-package-names/index.ts#L5)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *[ValidatePackageNameResult](interfaces/validatepackagenameresult.md)*

___

###  validatePackageNames

▸ **validatePackageNames**(`names`: keyof string[]): *[ValidatePackageNamesResult](interfaces/validatepackagenamesresult.md)*

*Defined in [validate-package-names/index.ts:11](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/validate-package-names/index.ts#L11)*

**Parameters:**

Name | Type |
------ | ------ |
`names` | keyof string[] |

**Returns:** *[ValidatePackageNamesResult](interfaces/validatepackagenamesresult.md)*

___

###  warn

▸ **warn**(`message`: string): *void*

*Defined in [commands/index.ts:22](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/commands/index.ts#L22)*

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |

**Returns:** *void*

___

###  writePackageJson

▸ **writePackageJson**(`fullPath`: string, `config`: PackageJson): *void*

*Defined in [load-write-package-json/index.ts:21](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-package-json/index.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`fullPath` | string |
`config` | PackageJson |

**Returns:** *void*

___

###  writeRepodogConfig

▸ **writeRepodogConfig**(`config`: PartialDeep‹RepodogConfig›): *void*

*Defined in [load-write-repodog-config/index.ts:34](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-repodog-config/index.ts#L34)*

**Parameters:**

Name | Type |
------ | ------ |
`config` | PartialDeep‹RepodogConfig› |

**Returns:** *void*

___

###  writeTSConfig

▸ **writeTSConfig**(`fullPath`: string, `config`: TSConfig): *void*

*Defined in [load-write-tsconfig/index.ts:20](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-tsconfig/index.ts#L20)*

**Parameters:**

Name | Type |
------ | ------ |
`fullPath` | string |
`config` | TSConfig |

**Returns:** *void*

## Object literals

### `Const` defaultRepodogConfig

### ▪ **defaultRepodogConfig**: *object*

*Defined in [load-write-repodog-config/index.ts:10](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-repodog-config/index.ts#L10)*

###  features

• **features**: *never[]* =  []

*Defined in [load-write-repodog-config/index.ts:11](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-repodog-config/index.ts#L11)*

###  packagesPath

• **packagesPath**: *string* =  DEFAULT_PACKAGES_PATH

*Defined in [load-write-repodog-config/index.ts:12](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-repodog-config/index.ts#L12)*

###  scaffoldPath

• **scaffoldPath**: *string* =  DEFAULT_SCAFFOLD_PATH

*Defined in [load-write-repodog-config/index.ts:13](https://github.com/dylanaubrey/repodog/blob/55b10bd/packages/helpers/src/load-write-repodog-config/index.ts#L13)*
