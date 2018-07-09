import { ObjectMap, StringObjectMap } from "../../types";
import { RepodogConfig } from "../load-config/types";

export interface GetSyncedDependenciesArgs {
  packageConfig: ObjectMap;
  repodogConfig: RepodogConfig;
  scope: string;
}

export interface GetSyncedDependenciesResult {
  dependencies?: StringObjectMap;
  devDependencies?: StringObjectMap;
}
