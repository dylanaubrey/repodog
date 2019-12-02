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

*Defined in [main.ts:24](https://github.com/dylanaubrey/repodog/blob/3c8817c/packages/build-references/src/main.ts#L24)*

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

*Defined in [main.ts:54](https://github.com/dylanaubrey/repodog/blob/3c8817c/packages/build-references/src/main.ts#L54)*

**Returns:** *void*

___

###  setReferencesFromDependencies

▸ **setReferencesFromDependencies**(`__namedParameters`: object): *void*

*Defined in [main.ts:16](https://github.com/dylanaubrey/repodog/blob/3c8817c/packages/build-references/src/main.ts#L16)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`dependencies` | Dependency |
`references` | TSConfigReference[] |
`scope` | string |

**Returns:** *void*
