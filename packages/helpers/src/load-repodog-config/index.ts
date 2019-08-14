import { DEFAULT_PACKAGES_PATH, DEFAULT_SCAFFOLD_PATH, REPODOG_CONFIG_FILENAME } from "@repodog/constants";
import { RepodogConfig } from "@repodog/types";
import { info } from "../commands";
import resolvePathToCwd from "../resolve-path-to-cwd";

let repodogConfig: RepodogConfig;

const defaultRepodogConfig: RepodogConfig = {
  packagesPath: DEFAULT_PACKAGES_PATH,
  scaffoldPath: DEFAULT_SCAFFOLD_PATH,
};

export default function loadRepodogConfig() {
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
