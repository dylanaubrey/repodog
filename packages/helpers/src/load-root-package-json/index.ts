import { PACKAGE_JSON_FILENAME } from "@repodog/constants";
import shell from "shelljs";
import { PackageJson } from "type-fest";
import resolvePath from "../resolve-path";

let packageJson: PackageJson;

export default function loadRootPackageJson(): PackageJson | undefined {
  try {
    if (packageJson) return packageJson;

    shell.echo(">>>>>> Loading root package.json");

    packageJson = require(resolvePath(PACKAGE_JSON_FILENAME));
    return packageJson;
  } catch (error) {
    return undefined;
  }
}
