import {
  BASE_REPO_FILE_NAMES,
  BASE_REPO_PKGS,
  FILE_NAMES_TO_PKG_NAMES,
  REPO_FEATURES_TO_REPO_PKGS,
  REPO_FEATURES_TO_SCAFFOLD_FILE_NAMES,
} from "@repodog/constants";
import { loadPackageJson, resolvePathToCwd } from "@repodog/helpers";
import { RepositoryFeatures, ScaffoldFileName } from "@repodog/types";
import { difference } from "lodash";
import { GetIncludedPackagesOptions } from "./types";

export function getIncludedFileNames(repoFeatures: RepositoryFeatures) {
  return repoFeatures.reduce((included, feature) => {
    const scaffoldFileNames = REPO_FEATURES_TO_SCAFFOLD_FILE_NAMES[feature];
    return [...new Set([...included, ...scaffoldFileNames])];
  }, Object.values(BASE_REPO_FILE_NAMES));
}

export function getIncludedPackages(
  repoFeatures: RepositoryFeatures,
  failedFileNames: Set<ScaffoldFileName> = new Set(),
  { packageStructure }: GetIncludedPackagesOptions,
) {
  const includedPackages = repoFeatures.reduce((included, feature) => {
    const repoPackages = REPO_FEATURES_TO_REPO_PKGS[feature];
    return [...new Set([...included, ...repoPackages])];
  }, Object.values(BASE_REPO_PKGS[packageStructure]));

  const excludedPackages = [...failedFileNames].reduce(
    (excluded, fileName) => {
      const pkgNames = FILE_NAMES_TO_PKG_NAMES[fileName];
      return [...new Set([...excluded, ...pkgNames])];
    },
    [] as string[],
  );

  return difference(includedPackages, excludedPackages);
}

export function getPackagePeerDependencies(pkgNames: string[]) {
  return pkgNames.reduce(
    (pkgDeps, pkgName) => {
      const pkgJson = loadPackageJson(resolvePathToCwd(`node_modules/${pkgName}`));
      if (!pkgJson || !pkgJson.peerDependencies) return pkgDeps;

      return [...new Set([...pkgDeps, ...Object.keys(pkgJson.peerDependencies)])];
    },
    [] as string[],
  );
}

export function isFileExcluded(fileName: string, repoFeatures: RepositoryFeatures) {
  return !getIncludedFileNames(repoFeatures).includes(fileName);
}
