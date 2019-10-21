import { REACT, TYPESCRIPT } from "@repodog/constants";
import { ConfigDependencies, RepositoryFeature } from "@repodog/types";

export default function getFeatureSpecificDependencies(
  { core, react = [], typescript = [] }: ConfigDependencies,
  repoFeatures: RepositoryFeature[],
) {
  const dependendies = [...core];
  if (repoFeatures.includes(REACT)) dependendies.push(...react);
  if (repoFeatures.includes(TYPESCRIPT)) dependendies.push(...typescript);
  return dependendies;
}
