import { loadPackageJson, resolvePathToCwd } from "@repodog/helpers";
import { RepositoryFeature } from "@repodog/types";
import getFeatureSpecificDependencies from "../get-feature-specific-dependencies";

export default function getPackageDependencies(pkgNames: string[], repoFeatures: RepositoryFeature[]) {
  return pkgNames.reduce(
    (pkgDeps, pkgName) => {
      try {
        const dependencies = require(resolvePathToCwd(`node_modules/${pkgName}/dependencies`));

        return dependencies
          ? [...new Set([...pkgDeps, ...getFeatureSpecificDependencies(dependencies, repoFeatures)])]
          : pkgDeps;
      } catch {
        const pkgJson = loadPackageJson(resolvePathToCwd(`node_modules/${pkgName}`));
        if (!pkgJson || !pkgJson.peerDependencies) return pkgDeps;

        return [...new Set([...pkgDeps, ...Object.keys(pkgJson.peerDependencies)])];
      }
    },
    [] as string[],
  );
}
