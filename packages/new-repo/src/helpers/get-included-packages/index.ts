import { BASE_REPO_PKGS, FILE_NAMES_TO_PKG_NAMES, REPO_FEATURES_TO_REPO_PKGS } from "@repodog/constants";
import { DependencyConfig, RepositoryFeature, ScaffoldFileName } from "@repodog/types";
import { difference } from "lodash";
import getConfigsCheckedAgainstDependantOn from "../get-configs-checked-against-dependant-on";

export default function getIncludedPackages(
  repoFeatures: RepositoryFeature[],
  failedFileNames: Set<ScaffoldFileName> = new Set(),
) {
  const includedPackages = repoFeatures.reduce((included, feature) => {
    const repoPackages = REPO_FEATURES_TO_REPO_PKGS[feature] as DependencyConfig[];
    return [...new Set([...included, ...getConfigsCheckedAgainstDependantOn(repoPackages, repoFeatures)])];
  }, BASE_REPO_PKGS);

  const excludedPackages = [...failedFileNames].reduce(
    (excluded, fileName) => {
      const pkgNames = FILE_NAMES_TO_PKG_NAMES[fileName];
      return [...new Set([...excluded, ...pkgNames])];
    },
    [] as string[],
  );

  return difference(includedPackages, excludedPackages);
}
