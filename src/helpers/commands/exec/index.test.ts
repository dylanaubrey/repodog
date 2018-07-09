import * as shell from "shelljs";
import { exec } from ".";

jest.mock("shelljs", () => ({
  exec: jest.fn(),
}));

describe("the exec function", () => {
  const command = "yarn run command";

  beforeAll(() => {
    exec(command);
  });

  it("should execute the correct command", () => {
    expect(shell.exec).toHaveBeenCalledWith(command);
  });
});
