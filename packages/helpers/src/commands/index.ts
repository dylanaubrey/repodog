import { TERMINAL_ECHO_PREFIX } from "@repodog/constants";
import chalk from "chalk";
import shell, { ExecOptions } from "shelljs";

export function error(message: string) {
  shell.echo(chalk.red(`${TERMINAL_ECHO_PREFIX} ${message}`));
  shell.exit(1);
}

export function exec(command: string, options: ExecOptions = {}) {
  shell.exec(command, options);
}

export function info(message: string) {
  shell.echo(chalk.white(`${TERMINAL_ECHO_PREFIX} ${message}`));
}

export function run(command: string, options: ExecOptions = {}) {
  shell.exec(`yarn run ${command}`, options);
}

export function warn(message: string) {
  shell.echo(chalk.yellow(`${TERMINAL_ECHO_PREFIX} ${message}`));
}
