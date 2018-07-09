import * as shell from "shelljs";
import { error } from ".";

jest.mock("shelljs", () => ({
  echo: jest.fn(),
  exit: jest.fn(),
}));

describe("the error function", () => {
  const message = "Sending out an SOS.";

  beforeAll(() => {
    error(message);
  });

  it("should echo the correct message", () => {
    expect(shell.echo).toHaveBeenCalledWith(message);
  });

  it("should exit with the correct code", () => {
    expect(shell.exit).toHaveBeenCalledWith(1);
  });
});
