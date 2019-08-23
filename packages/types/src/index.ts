import { JsonObject } from "type-fest";
import { CompilerOptions } from "typescript";

export interface BuildReferencesConfig {
  global?: string[];
}

export interface NewMonorepoConfig {
  scaffold: NewMonorepoScaffoldConfig;
}

export type NewMonorepoCopyBehaviour = "overwrite" | "duplicate" | "fail";

export interface NewMonorepoCopyBehaviourOptions {
  mergeJsonFiles?: boolean;
}

export interface NewMonorepoScaffoldConfig {
  copyBehaviour?: [NewMonorepoCopyBehaviour, NewMonorepoCopyBehaviourOptions?];
  exclude?: RegExp[];
}

export interface RepodogConfig {
  buildReferences?: BuildReferencesConfig;
  newMonorepo?: NewMonorepoConfig;
  packagesPath: string;
  scaffoldPath: string;
}

export type ObjectMap = JsonObject & { [key: string]: undefined };

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
