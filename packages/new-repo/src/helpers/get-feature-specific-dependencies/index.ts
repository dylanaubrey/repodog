import { CSS, MONOREPO, REACT, TYPESCRIPT } from "@repodog/constants";
import { ConfigDependencies, RepositoryFeature } from "@repodog/types";
import getConfigsCheckedAgainstDependantOn from "../get-configs-checked-against-dependant-on";

export default function getFeatureSpecificDependencies(
  { core, css = [], monorepo = [], react = [], typescript = [] }: ConfigDependencies,
  repoFeatures: RepositoryFeature[],
) {
  const dependendies = [...core];

  if (repoFeatures.includes(CSS)) {
    dependendies.push(...getConfigsCheckedAgainstDependantOn(css, repoFeatures));
  }

  if (repoFeatures.includes(MONOREPO)) {
    dependendies.push(...getConfigsCheckedAgainstDependantOn(monorepo, repoFeatures));
  }

  if (repoFeatures.includes(REACT)) {
    dependendies.push(...getConfigsCheckedAgainstDependantOn(react, repoFeatures));
  }

  if (repoFeatures.includes(TYPESCRIPT)) {
    dependendies.push(...getConfigsCheckedAgainstDependantOn(typescript, repoFeatures));
  }

  return dependendies;
}
