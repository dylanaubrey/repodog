import * as shell from "shelljs";
import { info } from ".";

jest.mock("shelljs", () => ({
  echo: jest.fn(),
}));

describe("the info function", () => {
  const message = "Sending out an SOS.";

  beforeAll(() => {
    info(message);
  });

  it("should echo the correct message", () => {
    expect(shell.echo).toHaveBeenCalledWith(message);
  });
});
