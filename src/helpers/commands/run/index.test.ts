import { run } from ".";
import { exec } from "../exec";

jest.mock("../exec", () => ({
  exec: jest.fn(),
}));

describe("the run function", () => {
  const npmClient = "yarn";
  const script = "test";

  beforeAll(() => {
    run(script, npmClient);
  });

  it("should execute the correct command", () => {
    expect(exec).toHaveBeenCalledWith(`${npmClient} run ${script}`);
  });
});
