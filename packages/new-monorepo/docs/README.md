> **[Documentation](README.md)**

## Index

### Variables

* [ENCODING](README.md#const-encoding)
* [FILES_EXCLUDED_FROM_MERGE](README.md#const-files_excluded_from_merge)
* [JSON_EXT](README.md#const-json_ext)
* [SCAFFOLD_DIR_PATH](README.md#const-scaffold_dir_path)

### Functions

* [copyFiles](README.md#copyfiles)
* [newMonorepo](README.md#newmonorepo)

### Object literals

* [COPY_BEHAVIOUR](README.md#const-copy_behaviour)

## Variables

### `Const` ENCODING

• **ENCODING**: *"utf8"* = "utf8"

*Defined in [constants/index.ts:7](https://github.com/dylanaubrey/repodog/blob/ba625eb/packages/new-monorepo/src/constants/index.ts#L7)*

___

### `Const` FILES_EXCLUDED_FROM_MERGE

• **FILES_EXCLUDED_FROM_MERGE**: *string[]* =  ["LICENSE"]

*Defined in [constants/index.ts:8](https://github.com/dylanaubrey/repodog/blob/ba625eb/packages/new-monorepo/src/constants/index.ts#L8)*

___

### `Const` JSON_EXT

• **JSON_EXT**: *".json"* = ".json"

*Defined in [constants/index.ts:9](https://github.com/dylanaubrey/repodog/blob/ba625eb/packages/new-monorepo/src/constants/index.ts#L9)*

___

### `Const` SCAFFOLD_DIR_PATH

• **SCAFFOLD_DIR_PATH**: *"node_modules/@repodog/new-monorepo/scaffold"* = "node_modules/@repodog/new-monorepo/scaffold"

*Defined in [constants/index.ts:10](https://github.com/dylanaubrey/repodog/blob/ba625eb/packages/new-monorepo/src/constants/index.ts#L10)*

## Functions

###  copyFiles

▸ **copyFiles**(`destPath`: string, `exclude`: `RegExp`[], `__namedParameters`: ["duplicate" | "fail" | "overwrite", any]): *`IterateDirectoryCallback`*

*Defined in [main/index.ts:26](https://github.com/dylanaubrey/repodog/blob/ba625eb/packages/new-monorepo/src/main/index.ts#L26)*

**Parameters:**

Name | Type |
------ | ------ |
`destPath` | string |
`exclude` | `RegExp`[] |
`__namedParameters` | ["duplicate" \| "fail" \| "overwrite", any] |

**Returns:** *`IterateDirectoryCallback`*

___

###  newMonorepo

▸ **newMonorepo**(): *void*

*Defined in [main/index.ts:79](https://github.com/dylanaubrey/repodog/blob/ba625eb/packages/new-monorepo/src/main/index.ts#L79)*

**Returns:** *void*

## Object literals

### `Const` COPY_BEHAVIOUR

### ▪ **COPY_BEHAVIOUR**: *object*

*Defined in [constants/index.ts:1](https://github.com/dylanaubrey/repodog/blob/ba625eb/packages/new-monorepo/src/constants/index.ts#L1)*

###  DUPLICATE

• **DUPLICATE**: *string* = "duplicate"

*Defined in [constants/index.ts:2](https://github.com/dylanaubrey/repodog/blob/ba625eb/packages/new-monorepo/src/constants/index.ts#L2)*

###  FAIL

• **FAIL**: *string* = "fail"

*Defined in [constants/index.ts:3](https://github.com/dylanaubrey/repodog/blob/ba625eb/packages/new-monorepo/src/constants/index.ts#L3)*

###  OVERWRITE

• **OVERWRITE**: *string* = "overwrite"

*Defined in [constants/index.ts:4](https://github.com/dylanaubrey/repodog/blob/ba625eb/packages/new-monorepo/src/constants/index.ts#L4)*