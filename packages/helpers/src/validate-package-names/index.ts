import { info } from "@repodog/helpers";
import validate from "validate-npm-package-name";
import { ValidatePackageNameResult, ValidatePackageNamesResult } from "../type-defs";

export function validatePackageName(name: string): ValidatePackageNameResult {
  info("Validating package name");
  const validated = validate(name);
  return { errors: validated.errors, valid: validated.validForNewPackages };
}

export function validatePackageNames(names: readonly string[]): ValidatePackageNamesResult {
  info("Validating package names");

  return names.reduce((result: ValidatePackageNamesResult, name) => {
    const validated = validatePackageName(name);

    if (validated.valid) {
      result.valid.push(name);
    } else {
      result.invalid.push(name);
      result.errors.push(...validated.errors);
    }

    return result;
  }, { errors: [], invalid: [], valid: [] });
}
