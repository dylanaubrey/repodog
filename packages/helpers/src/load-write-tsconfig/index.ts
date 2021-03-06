import { TSCONFIG_FILENAME } from "@repodog/constants";
import { TSConfig } from "@repodog/types";
import { outputFileSync } from "fs-extra";
import { resolve } from "path";
import { info } from "../commands";

const tsConfigs: Map<string, TSConfig> = new Map();

export function loadTSConfig(fullPath: string) {
  if (tsConfigs.has(fullPath)) {
    return tsConfigs.get(fullPath);
  }

  info(`Loading tsconfig from "${fullPath}"`);
  const tsconfig: TSConfig = require(resolve(fullPath, TSCONFIG_FILENAME));
  tsConfigs.set(fullPath, tsconfig);
  return tsconfig;
}

export function writeTSConfig(fullPath: string, config: TSConfig) {
  info(`Writing tsconfig to "${fullPath}"`);
  outputFileSync(resolve(fullPath, TSCONFIG_FILENAME), JSON.stringify(config, null, 2));
  tsConfigs.delete(fullPath);
}
