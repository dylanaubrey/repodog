import { PackageJson } from "type-fest";

export type IterateDependenciesCallback = (params: { name: string; version: string }) => void;

export type IteratePackagesCallback = (params: { dirName: string; fullPath: string; packageJson: PackageJson }) => void;

export type IteratePackagesErrorCallback = (params: { dirName: string; fullPath: string }) => void;

export interface SyncDependencyVersionsParams {
  dependencies?: PackageJson.Dependency;
  devDependencies?: PackageJson.Dependency;
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