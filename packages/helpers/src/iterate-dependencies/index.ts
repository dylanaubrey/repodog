import { PackageJson } from "type-fest";
import { IterateDependenciesCallback } from "../types";

export default function iterateDependencies(
  dependencies: PackageJson.Dependency,
  callback: IterateDependenciesCallback,
) {
  Object.keys(dependencies).forEach(name => {
    callback({ name, version: dependencies[name] });
  });
}
