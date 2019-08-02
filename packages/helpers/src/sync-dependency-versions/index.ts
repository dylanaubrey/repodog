
import { StringObjectMap } from "@repodog/types";
import { warn } from "../commands";
import iteratePackages from "../iterate-packages";
import { SyncDependencyVersionsParams } from "../type-defs";

function syncVersions(name: string, dependencies: StringObjectMap) {
  Object.keys(dependencies).forEach((key) => {
    iteratePackages(
      ({ packageJson }) => {
        dependencies[key] = `^${packageJson.version}`;
      },
      () => {
        warn(`Repodog expected a directory and package.json file to exist for the ${key} package.`);
        warn(`Repodog is removing the ${key} package from ${name}'s dependencies.`);
        Reflect.deleteProperty(dependencies, key);
      },
    );
  });

  return dependencies;
}

export default function syncDependencyVersions(
  { dependencies = {}, devDependencies = {}, name }: SyncDependencyVersionsParams,
) {
  return {
    dependencies: syncVersions(name, { ...dependencies }),
    devDependencies: syncVersions(name, { ...devDependencies }),
  };
}
