import { PackageJson } from "type-fest";

export type IteratePackagesCallback = (params: { packageJson: PackageJson, packagePath: string }) => void;

export type IteratePackagesErrorCallback = (params: { packagePath: string }) => void;

export interface SyncDependencyVersionsParams {
  dependencies: PackageJson["dependencies"];
  devDependencies: PackageJson["devDependencies"];
  name: string;
}

export interface ValidatePackageNameResult {
  errors: string[];
  valid: boolean;
}

export interface ValidatePackageNamesResult {
  errors: string[];
  invalid: string[];
  valid: string[];
}
