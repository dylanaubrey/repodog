import { PACKAGE_JSON_FILENAME } from "@repodog/constants";
import { isFunction } from "lodash";
import { resolve } from "path";
import { info } from "../commands";
import iterateDirectory from "../iterate-directory";
import loadRepodogConfig from "../load-repodog-config";
import resolvePathToCwd from "../resolve-path-to-cwd";
import { IteratePackagesCallback, IteratePackagesErrorCallback } from "../type-defs";

export default function iteratePackages(
  callback: IteratePackagesCallback,
  errorCallback?: IteratePackagesErrorCallback,
) {
  info("Iterating packages");
  const { packagesPath } = loadRepodogConfig();

  iterateDirectory(resolvePathToCwd(packagesPath), ({ fileName, filePath, stats }) => {
    if (!stats.isDirectory()) return;

    try {
      const packageJson = require(resolve(filePath, PACKAGE_JSON_FILENAME));

      if (!packageJson && isFunction(errorCallback)) {
        errorCallback({ dirName: fileName, fullPath: filePath });
        return;
      }

      callback({ dirName: fileName, packageJson, fullPath: filePath });
    } catch (error) {
      if (isFunction(errorCallback)) errorCallback({ dirName: fileName, fullPath: filePath });
    }
  });
}
