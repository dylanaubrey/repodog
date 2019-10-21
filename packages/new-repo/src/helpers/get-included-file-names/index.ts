import { BASE_REPO_FILE_NAMES, REPO_FEATURES_TO_SCAFFOLD_FILE_NAMES } from "@repodog/constants";
import { RepositoryFeature } from "@repodog/types";

export default function getIncludedFileNames(repoFeatures: RepositoryFeature[]) {
  return repoFeatures.reduce((included, feature) => {
    const scaffoldFileNames = REPO_FEATURES_TO_SCAFFOLD_FILE_NAMES[feature];
    return [...new Set([...included, ...scaffoldFileNames])];
  }, BASE_REPO_FILE_NAMES);
}
