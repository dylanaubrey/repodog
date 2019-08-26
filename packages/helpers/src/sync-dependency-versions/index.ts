import { StringObjectMap } from "@repodog/types";
import semver from "semver";
import { info, warn } from "../commands";
import iterateDependencies from "../iterate-dependencies";
import iteratePackages from "../iterate-packages";
import { SyncDependencyVersionsParams } from "../type-defs";

function syncVersions(name: string, dependencies: StringObjectMap) {
  iterateDependencies(dependencies, ({ name: dependencyName }) => {
    iteratePackages(
      ({ packageJson }) => {
        if (
          packageJson &&
          dependencyName === packageJson.name &&
          packageJson.version &&
          !semver.satisfies(packageJson.version, dependencies[dependencyName])
        ) {
          dependencies[dependencyName] = `^${packageJson.version}`;
        }
      },
      () => {
        warn(`Repodog expected a directory and package.json file to exist for the ${dependencyName} package.`);
        warn(`Repodog is removing the ${dependencyName} package from ${name}'s dependencies.`);
        Reflect.deleteProperty(dependencies, dependencyName);
      },
    );
  });

  return dependencies;
}

export default function syncDependencyVersions({
  dependencies = {},
  devDependencies = {},
  name,
}: SyncDependencyVersionsParams) {
  info("Syncing dependency versions");

  return {
    dependencies: syncVersions(name, { ...dependencies }),
    devDependencies: syncVersions(name, { ...devDependencies }),
  };
}
