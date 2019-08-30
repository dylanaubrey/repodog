> **[Documentation](README.md)**

## Index

### Variables

* [FILES_EXCLUDED_FROM_MERGE](README.md#const-files_excluded_from_merge)
* [JSON_EXT](README.md#const-json_ext)
* [SCAFFOLD_DIR_PATH](README.md#const-scaffold_dir_path)

### Functions

* [copyFiles](README.md#copyfiles)
* [formatFileContents](README.md#formatfilecontents)
* [newMonorepo](README.md#newmonorepo)

### Object literals

* [COPY_BEHAVIOUR](README.md#const-copy_behaviour)

## Variables

### `Const` FILES_EXCLUDED_FROM_MERGE

• **FILES_EXCLUDED_FROM_MERGE**: *string[]* =  ["LICENSE"]

*Defined in [constants/index.ts:7](https://github.com/dylanaubrey/repodog/blob/028fda7/packages/new-monorepo/src/constants/index.ts#L7)*

___

### `Const` JSON_EXT

• **JSON_EXT**: *".json"* = ".json"

*Defined in [constants/index.ts:8](https://github.com/dylanaubrey/repodog/blob/028fda7/packages/new-monorepo/src/constants/index.ts#L8)*

___

### `Const` SCAFFOLD_DIR_PATH

• **SCAFFOLD_DIR_PATH**: *"node_modules/@repodog/new-monorepo/scaffold"* = "node_modules/@repodog/new-monorepo/scaffold"

*Defined in [constants/index.ts:9](https://github.com/dylanaubrey/repodog/blob/028fda7/packages/new-monorepo/src/constants/index.ts#L9)*

## Functions

###  copyFiles

▸ **copyFiles**(`destPath`: string, `exclude`: `RegExp`[], `__namedParameters`: ["duplicate" | "fail" | "overwrite", any]): *`IterateDirectoryCallback`*

*Defined in [main/index.ts:30](https://github.com/dylanaubrey/repodog/blob/028fda7/packages/new-monorepo/src/main/index.ts#L30)*

**Parameters:**

Name | Type |
------ | ------ |
`destPath` | string |
`exclude` | `RegExp`[] |
`__namedParameters` | ["duplicate" \| "fail" \| "overwrite", any] |

**Returns:** *`IterateDirectoryCallback`*

___

###  formatFileContents

▸ **formatFileContents**(`contents`: string): *string[]*

*Defined in [main/index.ts:26](https://github.com/dylanaubrey/repodog/blob/028fda7/packages/new-monorepo/src/main/index.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`contents` | string |

**Returns:** *string[]*

___

###  newMonorepo

▸ **newMonorepo**(): *void*

*Defined in [main/index.ts:83](https://github.com/dylanaubrey/repodog/blob/028fda7/packages/new-monorepo/src/main/index.ts#L83)*

**Returns:** *void*

## Object literals

### `Const` COPY_BEHAVIOUR

### ▪ **COPY_BEHAVIOUR**: *object*

*Defined in [constants/index.ts:1](https://github.com/dylanaubrey/repodog/blob/028fda7/packages/new-monorepo/src/constants/index.ts#L1)*

###  DUPLICATE

• **DUPLICATE**: *"duplicate"* =  "duplicate" as const

*Defined in [constants/index.ts:2](https://github.com/dylanaubrey/repodog/blob/028fda7/packages/new-monorepo/src/constants/index.ts#L2)*

###  FAIL

• **FAIL**: *"fail"* =  "fail" as const

*Defined in [constants/index.ts:3](https://github.com/dylanaubrey/repodog/blob/028fda7/packages/new-monorepo/src/constants/index.ts#L3)*

###  OVERWRITE

• **OVERWRITE**: *"overwrite"* =  "overwrite" as const

*Defined in [constants/index.ts:4](https://github.com/dylanaubrey/repodog/blob/028fda7/packages/new-monorepo/src/constants/index.ts#L4)*