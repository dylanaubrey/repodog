import { loadConfig } from ".";
import { RepodogConfig } from "./types";

const REPO_PATH = "src/__test__/lerna-repo";
const WRONG_PATH = "src/__test__/repo";

const repodogConfig = {
  packagesPath: "packages",
  scaffoldPath: ".repodog/scaffold",
};

describe("the loadConfig function", () => {
  let processCwd: () => string;
  let loadedConfig: RepodogConfig;

  describe("when no config is loaded", () => {
    beforeAll(() => {
      processCwd = process.cwd;
      process.cwd = jest.fn().mockReturnValue(WRONG_PATH);
      loadedConfig = loadConfig();
    });

    afterAll(() => {
      process.cwd = processCwd;
    });

    it("then the function should return the default configuration options", () => {
      expect(loadedConfig).toEqual({ ...repodogConfig, npmClient: "npm" });
    });
  });

  describe("when a config is loaded", () => {
    beforeAll(() => {
      processCwd = process.cwd;
      process.cwd = jest.fn().mockReturnValue(REPO_PATH);
      loadedConfig = loadConfig();
    });

    afterAll(() => {
      process.cwd = processCwd;
    });

    it("then the function should return the loaded configuration options", () => {
      expect(loadedConfig).toEqual({ ...repodogConfig, npmClient: "yarn" });
    });
  });
});
