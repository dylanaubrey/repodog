import { FILE_ENCODING, PACKAGE_JSON_FILENAME } from "@repodog/constants";
import { outputFileSync, readFileSync } from "fs-extra";
import { resolve } from "path";
import sortPackageJson from "sort-package-json";
import { PackageJson } from "type-fest";
import { info } from "../commands";

const packageJsons: Map<string, PackageJson> = new Map();

export function loadPackageJson(path: string) {
  if (packageJsons.has(path)) {
    return packageJsons.get(path);
  }

  info(`Loading package.json from "${path}"`);
  const result = readFileSync(resolve(path, PACKAGE_JSON_FILENAME), FILE_ENCODING);
  let packageJson: PackageJson | undefined;

  if (result) {
    packageJson = JSON.parse(result) as PackageJson;
    packageJsons.set(path, packageJson);
  }

  return packageJson;
}

export function writePackageJson(fullPath: string, config: PackageJson) {
  info(`Writing package.json to "${fullPath}"`);
  outputFileSync(resolve(fullPath, PACKAGE_JSON_FILENAME), JSON.stringify(sortPackageJson(config), null, 2));
  packageJsons.delete(fullPath);
}
