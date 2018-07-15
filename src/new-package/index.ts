import { existsSync, writeFileSync } from "fs";
import { copySync } from "fs-extra";
import { isString } from "lodash";
import { resolve } from "path";
import * as semver from "semver";
import * as validate from "validate-npm-package-name";
import * as yargs from "yargs";
import { error } from "../helpers/commands/error";
import { run } from "../helpers/commands/run";
import { getSyncedDependencies } from "../helpers/get-synced-dependencies";
import { loadConfig } from "../helpers/load-config";
import { ObjectMap, PackageConfig } from "../types";

export default async function newPackage() {
  const argv = yargs.parse();
  const { desc, name } = argv;
  const result = validate(name);

  if (!result.validForNewPackages) {
    return error(`Repodog expected name to be valid. Errors: ${result.errors.join(", ")}`);
  }

  if (!isString(desc)) {
    return error("Repodog expected desc to be a string.");
  }

  const repodogConfig = loadConfig();
  const { npmClient, packagesPath, scaffoldPath } = repodogConfig;
  const cwd = process.cwd();
  const fullScaffoldPath = resolve(cwd, scaffoldPath, "new-package");
  const fullPackagePath = resolve(cwd, packagesPath, name);

  if (existsSync(fullPackagePath)) {
    return error(`Repodog did not expect a directory to exist for the ${name} package.`);
  }

  copySync(fullScaffoldPath, fullPackagePath);
  let rootConfig: PackageConfig;

  try {
    rootConfig = require(resolve(cwd, "package.json"));
  } catch (err) {
    return error("Repodog expected a package.json to exist in the project root.");
  }

  if (!validate(rootConfig.name).validForNewPackages || !semver.valid(rootConfig.version)) {
    return error("Repodog expected the project package.json to have a valid name and version.");
  }

  let scaffoldConfig: ObjectMap | undefined;

  try {
    scaffoldConfig = require(resolve(fullScaffoldPath, "package.json"));
  } catch (error) {
    // no catch
  } finally {
    scaffoldConfig = scaffoldConfig || {};
    const scope = `@${rootConfig.name}`;

    const packageConfig: PackageConfig = {
      ...scaffoldConfig,
      description: desc,
      name: `${scope}/${name}`,
      version: rootConfig.version,
      ...getSyncedDependencies({ packageConfig: scaffoldConfig, repodogConfig, scope }),
    };

    writeFileSync(resolve(fullPackagePath, "package.json"), JSON.stringify(packageConfig, null, 2));

    if (rootConfig.scripts && rootConfig.scripts["new-package:post"]) {
      run("new-package:post", npmClient);
    }
  }
}
