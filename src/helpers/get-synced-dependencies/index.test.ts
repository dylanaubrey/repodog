import { getSyncedDependencies } from ".";
import { info } from "../commands/info";
import { GetSyncedDependenciesResult } from "./types";

jest.mock("../commands/info", () => ({
  info: jest.fn(),
}));

const REPO_PATH = "src/__test__/lerna-repo";

const basePackageConfig = {
  description: "A test package.",
  name: "@test/button",
  version: "0.0.1",
};

const repodogConfig = {
  packagesPath: "packages",
  scaffoldPath: ".repodog/new-package",
};

const scope = "@test";

describe("the getSyncedDependencies function", () => {
  let processCwd: () => string;

  beforeAll(() => {
    processCwd = process.cwd;
    process.cwd = jest.fn().mockReturnValue(REPO_PATH);
  });

  afterAll(() => {
    process.cwd = processCwd;
  });

  describe("when a package has no dependencies", () => {
    let syncedDependencies: GetSyncedDependenciesResult;

    beforeAll(() => {
      const packageConfig = { ...basePackageConfig };
      syncedDependencies = getSyncedDependencies({ packageConfig, repodogConfig, scope });
    });

    it("then the function should return an empty object", () => {
      expect(syncedDependencies).toEqual({});
    });
  });

  describe("when a package has dependencies", () => {
    let syncedDependencies: GetSyncedDependenciesResult;

    beforeAll(() => {
      const packageConfig = {
        ...basePackageConfig,
        dependencies: {
          "@babel/polyfill": "7.0.0-beta.44",
          "@test/foundation": "0.0.5",
          "@test/invalid": "0.0.2",
        },
        devDependencies: {
          "@test/icon": "0.0.4",
          "@test/theme": "0.0.7",
        },
      };

      syncedDependencies = getSyncedDependencies({ packageConfig, repodogConfig, scope });
    });

    it("then the function should return the dependencies with the correct versions", () => {
      expect(syncedDependencies).toEqual({
        dependencies: {
          "@babel/polyfill": "7.0.0-beta.44",
          "@test/foundation": "0.0.1",
        },
        devDependencies: {
          "@test/icon": "0.0.1",
          "@test/theme": "0.0.1",
        },
      });
    });

    it("then the function should echo the correct message for each dependency that does not exist", () => {
      const message = "Repodog expected a directory to exist for @test/invalid package, removing dependency from package.json."; // tslint:disable-line
      expect(info).toHaveBeenCalledWith(message);
    });
  });
});
