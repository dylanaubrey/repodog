import { CompilerOptions } from "typescript";
import { RepositoryFeatures } from "./common";

export interface BuildReferencesConfig {
  global?: string[];
}

export interface RepodogConfig {
  buildReferences?: BuildReferencesConfig;
  features: RepositoryFeatures;
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
