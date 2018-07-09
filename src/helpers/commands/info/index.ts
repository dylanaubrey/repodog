import * as shell from "shelljs";

export function info(message: string): void {
  shell.echo(message);
}
