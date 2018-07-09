export type NPMClient = "npm" | "yarn";

export interface ObjectMap {
  [key: string]: any;
}

export interface PackageConfig {
  dependencies?: StringObjectMap;
  description: string;
  devDependencies?: StringObjectMap;
  name: string;
  private?: boolean;
  scripts?: StringObjectMap;
  version: string;
}

export interface StringObjectMap {
  [key: string]: string;
}
