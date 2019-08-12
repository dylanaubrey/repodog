import buildReferences from "@repodog/build-references";
import { NEW_PACKAGE_DIR_NAME, PACKAGE_JSON_FILENAME } from "@repodog/constants";
import {
  error,
  exec,
  info,
  loadRepodogConfig,
  loadRootPackageJson,
  resolvePathToCwd,
  run,
  syncDependencyVersions,
  validatePackageName,
  writePackageJson,
} from "@repodog/helpers";
import { existsSync } from "fs";
import { copySync } from "fs-extra";
import { isString } from "lodash";
import { resolve } from "path";
import semver from "semver";
import { PackageJson } from "type-fest";
import { NewPackageParams } from "../type-defs";

export default async function newPackage(argv: NewPackageParams) {
  info("Creating new package");
  const { deps = [], desc, name } = argv;
  const validated = validatePackageName(name);

  if (!validated.valid) {
    return error(`Repodog expected name to be a valid package name. Errors: ${validated.errors.join(", ")}`);
  }

  if (!isString(desc) || desc.length < 20) {
    return error("Repodog expected desc to have a length of at least 20 characters.");
  }

  const { packagesPath, scaffoldPath } = loadRepodogConfig();
  const fullScaffoldPath = resolvePathToCwd(scaffoldPath, NEW_PACKAGE_DIR_NAME);
  const fullPackagePath = resolvePathToCwd(packagesPath, name);

  if (existsSync(fullPackagePath)) {
    return error(`Repodog did not expect a directory to exist for the ${name} package.`);
  }

  info("Copying scaffold to new package");
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
    info("Loading scaffold package.json");
    scaffoldPackageJson = require(resolve(fullScaffoldPath, PACKAGE_JSON_FILENAME));
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

    writePackageJson(fullPackagePath, packageJson);

    if (deps.length) {
      info("Adding dependencies");

      deps.forEach((dependancy) => {
        exec(`lerna add ${dependancy} --scope ${packageJson.name}`);
      });
    }

    buildReferences();

    if (rootPackageJson.scripts && rootPackageJson.scripts["new-package:post"]) {
      run("new-package:post");
    }
  }
}
