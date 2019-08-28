import { TSConfig, TSConfigReference } from "@repodog/types";
import { PackageJson } from "type-fest";

export interface BuildPackageReferencesParams {
  fullPath: string;
  globalRefs: string[];
  packageJson: PackageJson;
  scope: string;
  tsconfig: TSConfig;
}

export interface SetReferencesFromDependenciesParams {
  dependencies: PackageJson.Dependency;
  references: TSConfigReference[];
  scope: string;
}
