import * as shell from "shelljs";

export function exec(command: string): void {
  shell.exec(command);
}
