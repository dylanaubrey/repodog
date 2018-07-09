import * as semver from "semver";
import * as validate from "validate-npm-package-name";
import { ValidatePackageNamesResult } from "./types";

function semverValid(version: string): boolean {
  return !!semver.valid(version) || !!semver.validRange(version);
}

export function validatePackageNames(names: string[]): ValidatePackageNamesResult {
  return names.reduce((result: ValidatePackageNamesResult, name) => {
    const match = name.match(/^(.+)@(.+)$/);

    if (!match && validate(name).validForNewPackages) {
      result.valid.push(name);
    } else if (match && validate(match[1]).validForNewPackages && semverValid(match[2])) {
      result.valid.push(name);
    } else {
      result.invalid.push(name);
    }

    return result;
  }, { invalid: [], valid: [] });
}
