import { RepositoryFeature } from "@repodog/types";
import getIncludedFileNames from "../get-included-file-names";

export default function isFileExcluded(fileName: string, repoFeatures: RepositoryFeature[]) {
  return !getIncludedFileNames(repoFeatures).includes(fileName);
}
