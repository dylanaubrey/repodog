import { PACKAGE_JSON_FILENAME } from "@repodog/constants";
import { readdirSync, statSync } from "fs";
import { isFunction } from "lodash";
import { resolve } from "path";
import { info } from "../commands";
import loadRepodogConfig from "../load-repodog-config";
import resolvePathToCwd from "../resolve-path-to-cwd";
import { IteratePackagesCallback, IteratePackagesErrorCallback } from "../type-defs";

export default function iteratePackages(
  callback: IteratePackagesCallback,
  errorCallback?: IteratePackagesErrorCallback,
) {
  info("Iterating packages");
  const { packagesPath } = loadRepodogConfig();
  const fileNames = readdirSync(resolvePathToCwd(packagesPath));

  fileNames.forEach((fileName) => {
    const fullPath = resolvePathToCwd(packagesPath, fileName);
    const stats = statSync(fullPath);
    if (!stats.isDirectory()) return;

    try {
      const packageJson = require(resolve(fullPath, PACKAGE_JSON_FILENAME));

      if (!packageJson && isFunction(errorCallback)) {
        errorCallback({ dirName: fileName, fullPath });
        return;
      }

      callback({ dirName: fileName, packageJson, fullPath });
    } catch (error) {
      if (isFunction(errorCallback)) errorCallback({ dirName: fileName, fullPath });
    }
  });
}
