import { JsonObject } from "type-fest";

export interface RepodogConfig {
  packagesPath: string;
  scaffoldPath: string;
}

export type ObjectMap = JsonObject;

export interface StringObjectMap {
  [key: string]: string;
}
