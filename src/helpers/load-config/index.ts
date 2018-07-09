import { resolve } from "path";
import { RepodogConfig } from "./types";

const PACKAGES_PATH = "packages";
const SCAFFOLD_PATH = ".repodog/new-package";

function setDefaults(): RepodogConfig {
  return {
    npmClient: "npm",
    packagesPath: PACKAGES_PATH,
    scaffoldPath: SCAFFOLD_PATH,
  };
}

export function loadConfig(): RepodogConfig {
  let config: RepodogConfig;

  try {
    config = require(resolve(process.cwd(), "./repodog.json"));

    return {
      ...setDefaults(),
      ...config,
    };
  } catch (error) {
    return setDefaults();
  }
}
