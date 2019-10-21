import { RepositoryFeature, RepositoryFeatureConfig } from "@repodog/types";
import { isArray, isString } from "lodash";

export default function getPackagesCheckedAgainstDependantOn(
  repoPackages: RepositoryFeatureConfig[],
  repoFeatures: RepositoryFeature[],
) {
  return repoPackages.reduce((valid, repoPackage) => {
    if (isString(repoPackage)) {
      valid.push(repoPackage);
    } else if (
      isArray(repoPackage) &&
      repoPackage[1]?.dependantOn &&
      repoPackage[1].dependantOn.every(name => repoFeatures.includes(name))
    ) {
      valid.push(repoPackage[0]);
    }

    return valid;
  }, [] as string[]);
}
