import { CompilerOptions } from "typescript";
import { RepositoryFeature } from "./common";

export interface BuildReferencesConfig {
  global?: string[];
}

export interface ConfigDependencies {
  core: string[];
  react?: string[];
  typescript?: string[];
}

export interface RepodogConfig {
  buildReferences?: BuildReferencesConfig;
  features: RepositoryFeature[];
  packagesPath: string;
  scaffoldPath: string;
}

export interface TSConfigReference {
  path: string;
}

export interface TSConfig {
  compilerOptions?: CompilerOptions;
  extends?: string;
  files?: string[];
  references?: TSConfigReference[];
}
