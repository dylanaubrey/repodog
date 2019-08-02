import { PACKAGE_JSON_FILENAME } from "@repodog/constants";
import { readdirSync, statSync } from "fs";
import { resolve } from "path";
import loadRepodogConfig from "../load-repodog-config";
import resolvePath from "../resolve-path";
import { IteratePackagesCallback, IteratePackagesErrorCallback } from "../type-defs";

export default function iteratePackages(
  callback: IteratePackagesCallback,
  errorCallback: IteratePackagesErrorCallback,
) {
  const { packagesPath } = loadRepodogConfig();
  const fileNames = readdirSync(resolvePath(packagesPath));

  fileNames.forEach((fileName) => {
    const packagePath = resolvePath(packagesPath, fileName);
    const stats = statSync(packagePath);
    if (!stats.isDirectory()) return;

    try {
      const packageJson = require(resolve(packagePath, PACKAGE_JSON_FILENAME));

      if (!packageJson) {
        errorCallback({ packagePath });
        return;
      }

      callback({ packageJson, packagePath });
    } catch (error) {
      errorCallback({ packagePath });
    }
  });
}
