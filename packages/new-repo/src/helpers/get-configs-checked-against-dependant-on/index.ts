import { DependencyConfig, RepositoryFeature } from "@repodog/types";
import { get, isArray, isString } from "lodash";

export default function getConfigsCheckedAgainstDependantOn(
  dependencyConfigs: DependencyConfig[],
  repoFeatures: RepositoryFeature[],
) {
  return dependencyConfigs.reduce(
    (valid, dependencyConfig) => {
      if (isString(dependencyConfig)) {
        valid.push(dependencyConfig);
      } else if (
        isArray(dependencyConfig) &&
        get(dependencyConfig[1], ["dependantOn"], false) &&
        dependencyConfig[1].dependantOn.every(name => repoFeatures.includes(name))
      ) {
        valid.push(dependencyConfig[0]);
      }

      return valid;
    },
    [] as string[],
  );
}
