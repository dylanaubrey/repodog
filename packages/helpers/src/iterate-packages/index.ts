import { isFunction } from "lodash";
import { info } from "../commands";
import iterateDirectory from "../iterate-directory";
import loadRepodogConfig from "../load-repodog-config";
import { loadPackageJson } from "../load-write-package-json";
import resolvePathToCwd from "../resolve-path-to-cwd";
import { IteratePackagesCallback, IteratePackagesErrorCallback } from "../type-defs";

export default function iteratePackages(
  callback: IteratePackagesCallback,
  errorCallback?: IteratePackagesErrorCallback,
) {
  info("Iterating packages");
  const { packagesPath } = loadRepodogConfig();

  iterateDirectory(resolvePathToCwd(packagesPath), async ({ fileName, filePath, stats }) => {
    if (!stats.isDirectory()) return;

    try {
      const packageJson = loadPackageJson(filePath);

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
