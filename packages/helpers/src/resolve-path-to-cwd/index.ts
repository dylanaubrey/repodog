import { resolve } from "path";

export default function resolvePathToCwd(...path: readonly string[]) {
  return resolve(process.cwd(), ...path);
}
