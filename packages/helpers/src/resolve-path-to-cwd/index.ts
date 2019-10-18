import { resolve } from "path";

export default function resolvePathToCwd(...path: readonly string[]) {
  const cwd = process.env.LERNA_ROOT_PATH ? process.env.LERNA_ROOT_PATH : process.cwd();
  return resolve(cwd, ...path);
}
