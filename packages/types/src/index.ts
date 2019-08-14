import { JsonObject } from "type-fest";
import { CompilerOptions } from "typescript";

export interface BuildReferencesConfig {
  global?: string[];
}

export interface RepodogConfig {
  buildReferences?: BuildReferencesConfig;
  packagesPath: string;
  scaffoldPath: string;
}

export type ObjectMap = JsonObject;

export interface StringObjectMap {
  [key: string]: string;
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
