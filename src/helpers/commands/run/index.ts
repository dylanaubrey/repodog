import { NPMClient } from "../../../types";
import { exec } from "../exec";

export function run(command: string, npmClient: NPMClient): void {
  exec(`${npmClient} run ${command}`);
}
