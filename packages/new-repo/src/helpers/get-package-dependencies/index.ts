import { info, loadPackageJson, resolvePathToCwd, warn } from "@repodog/helpers";
import { RepositoryFeature } from "@repodog/types";
import getFeatureSpecificDependencies from "../get-feature-specific-dependencies";

export default function getPackageDependencies(pkgNames: string[], repoFeatures: RepositoryFeature[]) {
  return pkgNames.reduce(
    (pkgDeps, pkgName) => {
      try {
        const dependenciesPath = resolvePathToCwd(`node_modules/${pkgName}/dependencies`);
        info(`Loading dependencies file from "${dependenciesPath}"`);
        const dependencies = require(dependenciesPath);

        return dependencies
          ? [...new Set([...pkgDeps, ...getFeatureSpecificDependencies(dependencies, repoFeatures)])]
          : pkgDeps;
      } catch (error) {
        warn(error);
        info("Failed to load dependencies file, falling back to package.json");
        const pkgJson = loadPackageJson(resolvePathToCwd(`node_modules/${pkgName}`));
        if (!pkgJson || !pkgJson.peerDependencies) return pkgDeps;

        return [...new Set([...pkgDeps, ...Object.keys(pkgJson.peerDependencies)])];
      }
    },
    [] as string[],
  );
}
