> **[Documentation](README.md)**

## Index

### Interfaces

* [BuildPackageReferencesParams](interfaces/buildpackagereferencesparams.md)
* [SetReferencesFromDependenciesParams](interfaces/setreferencesfromdependenciesparams.md)

### Functions

* [buildPackageReferences](README.md#buildpackagereferences)
* [buildProjectReferences](README.md#buildprojectreferences)
* [setReferencesFromDependencies](README.md#setreferencesfromdependencies)

## Functions

###  buildPackageReferences

▸ **buildPackageReferences**(`__namedParameters`: object): *void*

*Defined in [main/index.ts:25](https://github.com/dylanaubrey/repodog/blob/03426f8/packages/build-references/src/main/index.ts#L25)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`fullPath` | string |
`globalRefs` | string[] |
`packageJson` | object & `NonStandardEntryPoints` & `TypeScriptConfiguration` & `YarnConfiguration` & `JSPMConfiguration` & object |
`scope` | string |
`tsconfig` | `TSConfig` |

**Returns:** *void*

___

###  buildProjectReferences

▸ **buildProjectReferences**(): *void*

*Defined in [main/index.ts:55](https://github.com/dylanaubrey/repodog/blob/03426f8/packages/build-references/src/main/index.ts#L55)*

**Returns:** *void*

___

###  setReferencesFromDependencies

▸ **setReferencesFromDependencies**(`__namedParameters`: object): *void*

*Defined in [main/index.ts:17](https://github.com/dylanaubrey/repodog/blob/03426f8/packages/build-references/src/main/index.ts#L17)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`dependencies` | `Dependency` |
`references` | `TSConfigReference`[] |
`scope` | string |

**Returns:** *void*