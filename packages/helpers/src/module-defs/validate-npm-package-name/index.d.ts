declare module "validate-npm-package-name" {
  type Warnings = string[];
  type Errors = string[];

  interface ValidateResult {
    validForNewPackages: boolean;
    validForOldPackages: boolean;
    warnings: Warnings;
    errors: Errors;
  }

  namespace validate {}
  function validate(name: string): ValidateResult;
  export = validate;
}
