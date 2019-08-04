import { PACKAGE_JSON_FILENAME } from "@repodog/constants";
import { PackageJson } from "type-fest";
import { info } from "../commands";
import resolvePath from "../resolve-path";

let packageJson: PackageJson;

export default function loadRootPackageJson(): PackageJson | undefined {
  try {
    if (packageJson) return packageJson;

    info("Loading root package.json");

    packageJson = require(resolvePath(PACKAGE_JSON_FILENAME));
    return packageJson;
  } catch (error) {
    return undefined;
  }
}
