import { NEW_PACKAGE_DIR_NAME, PACKAGE_JSON_FILENAME } from "@repodog/constants";
import {
  error,
  loadRepodogConfig,
  loadRootPackageJson,
  resolvePath,
  run,
  syncDependencyVersions,
  validatePackageName,
} from "@repodog/helpers";
import { existsSync } from "fs";
import { copySync, outputFileSync } from "fs-extra";
import { isString } from "lodash";
import semver from "semver";
import { PackageJson } from "type-fest";
import yargs from "yargs";
import { NewPackageParams } from "../type-defs";

export default async function newPackage() {
  const { desc, name } = yargs.argv as unknown as NewPackageParams;
  const validated = validatePackageName(name);

  if (!validated.valid) {
    return error(`Repodog expected name to be a valid package name. Errors: ${validated.errors.join(", ")}`);
  }

  if (!isString(desc) || desc.length < 20) {
    return error("Repodog expected desc to be a string with a length of at least 20 characters.");
  }

  const { packagesPath, scaffoldPath } = loadRepodogConfig();
  const fullScaffoldPath = resolvePath(scaffoldPath, NEW_PACKAGE_DIR_NAME);
  const fullPackagePath = resolvePath(packagesPath, name);

  if (existsSync(fullPackagePath)) {
    return error(`Repodog did not expect a directory to exist for the ${name} package.`);
  }

  copySync(fullScaffoldPath, fullPackagePath);
  const rootPackageJson = loadRootPackageJson();

  if (!rootPackageJson) {
    return error("Repodog expected a package.json to exist in the project root.");
  }

  if (!rootPackageJson.name || !validatePackageName(rootPackageJson.name).valid) {
    return error("Repodog expected the project package.json to have a valid name.");
  }

  if (!rootPackageJson.version || !semver.valid(rootPackageJson.version)) {
    return error("Repodog expected the project package.json to have a valid version.");
  }

  let scaffoldPackageJson: PackageJson = {};

  try {
    scaffoldPackageJson = require(resolvePath(fullScaffoldPath, PACKAGE_JSON_FILENAME));
  } catch (error) {
    // no catch
  } finally {
    const scope = `@${rootPackageJson.name}`;
    const { dependencies, devDependencies } = scaffoldPackageJson;

    const packageJson: PackageJson = {
      ...scaffoldPackageJson,
      description: desc,
      name: `${scope}/${name}`,
      version: rootPackageJson.version,
      ...syncDependencyVersions({ dependencies, devDependencies, name: `${scope}/${name}` }),
    };

    outputFileSync(resolvePath(fullPackagePath, PACKAGE_JSON_FILENAME), JSON.stringify(packageJson, null, 2));

    if (rootPackageJson.scripts && rootPackageJson.scripts["new-package:post"]) {
      run("new-package:post");
    }
  }
}
