import { DependencyConfig, RepositoryFeature } from "@repodog/types";
import { isArray, isString } from "lodash";

export default function getConfigsCheckedAgainstDependantOn(
  dependencyConfigs: DependencyConfig[],
  repoFeatures: RepositoryFeature[],
) {
  return dependencyConfigs.reduce((valid, dependencyConfig) => {
    if (isString(dependencyConfig)) {
      valid.push(dependencyConfig);
    } else if (
      isArray(dependencyConfig) &&
      dependencyConfig[1]?.dependantOn &&
      dependencyConfig[1].dependantOn.every(name => repoFeatures.includes(name))
    ) {
      valid.push(dependencyConfig[0]);
    }

    return valid;
  }, [] as string[]);
}
