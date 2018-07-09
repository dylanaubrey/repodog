import * as shell from "shelljs";

export function error(message: string): void {
  shell.echo(message);
  shell.exit(1);
}
