import { existsSync } from "fs";
import { isPlainObject } from "lodash";
import { resolve } from "path";
import { StringObjectMap } from "../../types";
import { info } from "../commands/info";
import { GetSyncedDependenciesArgs, GetSyncedDependenciesResult } from "./types";

function syncVersions(dependencies: StringObjectMap, packagesPath: string, scope: string): StringObjectMap {
  const clone = { ...dependencies };

  Object.keys(clone).forEach((key) => {
    const match = key.match(new RegExp(`^${scope}\/(.+)$`));
    if (!match) return;
    const name = match[1];
    const fullDependencyPath = resolve(process.cwd(), packagesPath, name);

    if (existsSync(fullDependencyPath)) {
      const dependencyConfig = require(resolve(fullDependencyPath, "package.json"));
      clone[key] = dependencyConfig.version;
    } else {
      info(`Repodog expected a directory to exist for ${key} package, removing dependency from package.json.`);
      Reflect.deleteProperty(clone, key);
    }
  });

  return clone;
}

export function getSyncedDependencies(
  { packageConfig, repodogConfig, scope }: GetSyncedDependenciesArgs,
): GetSyncedDependenciesResult {
  const result: GetSyncedDependenciesResult = {};
  const { dependencies, devDependencies } = packageConfig;

  if (isPlainObject(dependencies)) {
    result.dependencies = syncVersions(dependencies, repodogConfig.packagesPath, scope);
  }

  if (isPlainObject(devDependencies)) {
    result.devDependencies = syncVersions(devDependencies, repodogConfig.packagesPath, scope);
  }

  return result;
}
