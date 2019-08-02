import { resolve } from "path";

export default function resolvePath(...path: readonly string[]) {
  return resolve(process.cwd(), ...path);
}
