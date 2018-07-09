import { validatePackageNames } from ".";
import { ValidatePackageNamesResult } from "./types";

const packageNames = [
  "@babel/cli@7.0.0-beta.44",
  "@babel/core",
  "@types/dotenv@^4.0.3",
  "@types/jest",
  "cross-env",
  "del-cli@^1.1.0",
  "tslint",
  "typescript@^2.9.1",
  "invalid name",
  "f&%#ing invalid",
  "invalid@invalid",
];

const validNames = [
  "@babel/cli@7.0.0-beta.44",
  "@babel/core",
  "@types/dotenv@^4.0.3",
  "@types/jest",
  "cross-env",
  "del-cli@^1.1.0",
  "tslint",
  "typescript@^2.9.1",
];

const invalidNames = [
  "invalid name",
  "f&%#ing invalid",
  "invalid@invalid",
];

describe("the validatePackageNames function", () => {
  let validation: ValidatePackageNamesResult;

  beforeAll(() => {
    validation = validatePackageNames(packageNames);
  });

  it("should return lists of all the valid and invalid names", () => {
    const { invalid, valid } = validation;
    expect(invalid).toEqual(invalidNames);
    expect(valid).toEqual(validNames);
  });
});
