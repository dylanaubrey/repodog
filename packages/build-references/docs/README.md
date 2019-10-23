[Documentation](README.md)

# Documentation

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

*Defined in [main.ts:25](https://github.com/dylanaubrey/repodog/blob/45c36a2/packages/build-references/src/main.ts#L25)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`fullPath` | string |
`globalRefs` | string[] |
`packageJson` | object & NonStandardEntryPoints & TypeScriptConfiguration & YarnConfiguration & JSPMConfiguration & object |
`scope` | string |
`tsconfig` | TSConfig |

**Returns:** *void*

___

###  buildProjectReferences

▸ **buildProjectReferences**(): *void*

*Defined in [main.ts:55](https://github.com/dylanaubrey/repodog/blob/45c36a2/packages/build-references/src/main.ts#L55)*

**Returns:** *void*

___

###  setReferencesFromDependencies

▸ **setReferencesFromDependencies**(`__namedParameters`: object): *void*

*Defined in [main.ts:17](https://github.com/dylanaubrey/repodog/blob/45c36a2/packages/build-references/src/main.ts#L17)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`dependencies` | Dependency |
`references` | TSConfigReference[] |
`scope` | string |

**Returns:** *void*
