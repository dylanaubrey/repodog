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

*Defined in [main/index.ts:33](https://github.com/dylanaubrey/repodog/blob/e17624c/packages/build-references/src/main/index.ts#L33)*

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

*Defined in [main/index.ts:55](https://github.com/dylanaubrey/repodog/blob/e17624c/packages/build-references/src/main/index.ts#L55)*

**Returns:** *void*

___

###  setReferencesFromDependencies

▸ **setReferencesFromDependencies**(`__namedParameters`: object): *void*

*Defined in [main/index.ts:16](https://github.com/dylanaubrey/repodog/blob/e17624c/packages/build-references/src/main/index.ts#L16)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`dependencies` | `Dependency` |
`globalRefs` | string[] |
`references` | `TSConfigReference`[] |
`scope` | string |

**Returns:** *void*