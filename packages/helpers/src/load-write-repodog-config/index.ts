import { DEFAULT_PACKAGES_PATH, DEFAULT_SCAFFOLD_PATH, REPODOG_CONFIG_FILENAME } from "@repodog/constants";
import { RepodogConfig } from "@repodog/types";
import { outputFileSync } from "fs-extra";
import { PartialDeep } from "type-fest";
import { info } from "../commands";
import resolvePathToCwd from "../resolve-path-to-cwd";

let repodogConfig: RepodogConfig;

const defaultRepodogConfig: RepodogConfig = {
  features: [],
  packagesPath: DEFAULT_PACKAGES_PATH,
  scaffoldPath: DEFAULT_SCAFFOLD_PATH,
};

export function loadRepodogConfig() {
  try {
    if (repodogConfig) return repodogConfig;

    info("Loading repodog config");

    repodogConfig = {
      ...defaultRepodogConfig,
      ...require(resolvePathToCwd(REPODOG_CONFIG_FILENAME)),
    };

    return repodogConfig;
  } catch (error) {
    repodogConfig = defaultRepodogConfig;
    return repodogConfig;
  }
}

export function writeRepodogConfig(config: PartialDeep<RepodogConfig>) {
  info("Writing repodog config");
  const mergedConfig = { ...(repodogConfig || {}), ...config };
  outputFileSync(resolvePathToCwd(REPODOG_CONFIG_FILENAME), JSON.stringify(mergedConfig, null, 2));
  repodogConfig = mergedConfig as RepodogConfig;
}
