import { removeSync } from "fs-extra";
import { resolve } from "path";
import * as yargs from "yargs";
import newPackage from ".";
import { error } from "../helpers/commands/error";
import { loadConfig } from "../helpers/load-config";
import { RepodogConfig } from "../helpers/load-config/types";
import { validatePackageNames } from "../helpers/validate-package-names";

jest.mock("yargs", () => ({
  array: jest.fn().mockReturnThis(),
  parse: jest.fn(),
}));

jest.mock("../helpers/commands/error", () => ({ error: jest.fn() }));
jest.mock("../helpers/validate-package-names", () => ({ validatePackageNames: jest.fn() }));
jest.mock("../helpers/load-config", () => ({ loadConfig: jest.fn() }));

const repodogConfig: RepodogConfig = {
  npmClient: "yarn",
  packagesPath: "packages",
  scaffoldPath: ".repodog/new-package",
};

const LERNA_REPO_PATH = "src/__test__/lerna-repo";
const INVALID_REPO_PATH = "src/__test__/invalid-repo";
const INVALID_NAME_REPO_PATH = "src/__test__/invalid-name";
const INVALID_VERSION_REPO_PATH = "src/__test__/invalid-version";

describe("the newPackage function", () => {
  let processCwd: () => string;

  beforeAll(() => {
    processCwd = process.cwd;
    process.cwd = jest.fn().mockReturnValue(LERNA_REPO_PATH);
  });

  afterAll(() => {
    process.cwd = processCwd;
  });

  describe("when an invalid name argument is provided to the function", () => {
    beforeAll(() => {
      (yargs.parse as jest.Mock).mockReturnValue({ name: "invalid invalid" });
      newPackage();
    });

    it("then the function should execute the error function with the correct message", () => {
      const message = "Repodog expected name to be valid. Errors: name can only contain URL-friendly characters";
      expect(error).toBeCalledWith(message);
    });
  });

  describe("when no description argument is provided to the function", () => {
    beforeAll(() => {
      (yargs.parse as jest.Mock).mockReturnValue({ name: "valid" });
      newPackage();
    });

    it("then the function should execute the error function with the correct message", () => {
      expect(error).toBeCalledWith("Repodog expected desc to be a string.");
    });
  });

  describe("when no description argument is provided to the function", () => {
    beforeAll(() => {
      (yargs.parse as jest.Mock).mockReturnValue({ name: "valid" });
      newPackage();
    });

    it("then the function should execute the error function with the correct message", () => {
      expect(error).toBeCalledWith("Repodog expected desc to be a string.");
    });
  });

  describe("when some of the dependencies provided to the function are invalid", () => {
    beforeAll(() => {
      (yargs.parse as jest.Mock).mockReturnValue({
        desc: "A valid package description.",
        name: "valid",
      });

      (validatePackageNames as jest.Mock).mockReturnValue({
        invalid: ["alsoInvalid", "invalidAsWell"],
      });

      newPackage();
    });

    it("then the function should execute the error function with the correct message", () => {
      const message = "Repodog expected all dependencies to have valid names. Invalid: alsoInvalid, invalidAsWell";
      expect(error).toBeCalledWith(message);
    });
  });

  describe("when a directory already exists for the name provided to the function", () => {
    beforeAll(() => {
      (yargs.parse as jest.Mock).mockReturnValue({
        desc: "A button package description.",
        name: "button",
      });

      (validatePackageNames as jest.Mock).mockReturnValue({ invalid: [] });
      (loadConfig as jest.Mock).mockReturnValue(repodogConfig);
      newPackage();
    });

    it("then the function should execute the error function with the correct message", () => {
      expect(error).toBeCalledWith("Repodog did not expect a directory to exist for the button package.");
    });
  });

  describe("when the project root does not have a package.json", () => {
    beforeAll(() => {
      process.cwd = jest.fn().mockReturnValue(INVALID_REPO_PATH);

      (yargs.parse as jest.Mock).mockReturnValue({
        desc: "A valid package description.",
        name: "valid",
      });

      (validatePackageNames as jest.Mock).mockReturnValue({ invalid: [] });
      (loadConfig as jest.Mock).mockReturnValue(repodogConfig);
      newPackage();
    });

    afterAll(() => {
      removeSync(resolve(process.cwd(), "packages/valid"));
      process.cwd = jest.fn().mockReturnValue(LERNA_REPO_PATH);
    });

    it("then the function should execute the error function with the correct message", () => {
      expect(error).toBeCalledWith("Repodog expected a package.json to exist in the project root.");
    });
  });

  describe("when the project root package.json name is invalid", () => {
    beforeAll(() => {
      process.cwd = jest.fn().mockReturnValue(INVALID_NAME_REPO_PATH);

      (yargs.parse as jest.Mock).mockReturnValue({
        desc: "A valid package description.",
        name: "valid",
      });

      (validatePackageNames as jest.Mock).mockReturnValue({ invalid: [] });
      (loadConfig as jest.Mock).mockReturnValue(repodogConfig);
      newPackage();
    });

    afterAll(() => {
      removeSync(resolve(process.cwd(), "packages/valid"));
      process.cwd = jest.fn().mockReturnValue(LERNA_REPO_PATH);
    });

    it("then the function should execute the error function with the correct message", () => {
      expect(error).toBeCalledWith("Repodog expected the project package.json to have a valid name and version.");
    });
  });

  describe("when the project root package.json version is invalid", () => {
    beforeAll(() => {
      process.cwd = jest.fn().mockReturnValue(INVALID_VERSION_REPO_PATH);

      (yargs.parse as jest.Mock).mockReturnValue({
        desc: "A valid package description.",
        name: "valid",
      });

      (validatePackageNames as jest.Mock).mockReturnValue({ invalid: [] });
      (loadConfig as jest.Mock).mockReturnValue(repodogConfig);
      newPackage();
    });

    afterAll(() => {
      removeSync(resolve(process.cwd(), "packages/valid"));
      process.cwd = jest.fn().mockReturnValue(LERNA_REPO_PATH);
    });

    it("then the function should execute the error function with the correct message", () => {
      expect(error).toBeCalledWith("Repodog expected the project package.json to have a valid name and version.");
    });
  });
});
