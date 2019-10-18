import appRoot from "app-root-path";
import { resolve } from "path";

export default function resolvePathToCwd(...path: readonly string[]) {
  return resolve(appRoot.toString(), ...path);
}
