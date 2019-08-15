import buildReferences from "@repodog/build-references";
import { PACKAGE_JSON_FILENAME } from "@repodog/constants";
import {
  error,
  info,
  loadRepodogConfig,
  loadRootPackageJson,
  resolvePathToCwd,
  run,
  validatePackageName,
  writePackageJson,
} from "@repodog/helpers";
import { copySync } from "fs-extra";
import { get, merge } from "lodash";
import { resolve } from "path";
import semver from "semver";
import { PackageJson } from "type-fest";
import { SCAFFOLD_DIR_PATH } from "../constants";

export default function newMonorepo() {
  info("Creating new monorepo");
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

  const { newMonorepo: newMonorepoConfig } = loadRepodogConfig();
  const exclude = get(newMonorepoConfig, ["scaffold", "exclude"], []);
  const overwrite = get(newMonorepoConfig, ["scaffold", "overwrite"], false);

  info("Copying scaffold to new monorepo");

  copySync(resolvePathToCwd(SCAFFOLD_DIR_PATH), ".", {
    filter: src => !exclude.find(regexp => regexp.test(src)),
    overwrite,
  });

  const scaffoldFullDirPath = resolvePathToCwd(SCAFFOLD_DIR_PATH);
  const scaffoldPackageJson: PackageJson = require(resolve(scaffoldFullDirPath, PACKAGE_JSON_FILENAME));
  const mergedPackageJson = merge(rootPackageJson, scaffoldPackageJson);
  writePackageJson(".", mergedPackageJson);
  run("init");
  buildReferences();

  if (rootPackageJson.scripts && rootPackageJson.scripts["new-monorepo:post"]) {
    run("new-monorepo:post");
  }
}
