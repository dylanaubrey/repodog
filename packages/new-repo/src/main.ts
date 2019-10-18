import { LOAD_NVM, REPO_FEATURES, SINGLE_PKG_STRUCTURE } from "@repodog/constants";
import {
  IterateDirectoryCallback,
  copyFile,
  error,
  exec,
  info,
  iterateDirectory,
  loadRootPackageJson,
  nvmInstall,
  resolvePathToCwd,
  validatePackageName,
  writeRepodogConfig,
} from "@repodog/helpers";
import { RepositoryFeatures, ScaffoldFileName } from "@repodog/types";
import inquirer from "inquirer";
import { resolve } from "path";
import semver from "semver";
import { PackageJson } from "type-fest";
import { SCAFFOLD_DIR_PATH } from "./constants";
import { getIncludedPackages, getPackagePeerDependencies, isFileExcluded } from "./helpers";

const failedFileNames = new Set<ScaffoldFileName>();
let rootPackageJson: PackageJson | undefined;
let repoFeatures: RepositoryFeatures = [];

function createIterateDirCallback(destPath: string): IterateDirectoryCallback {
  return async ({ fileName, filePath: srcPath, stats }) => {
    if (isFileExcluded(fileName, repoFeatures)) return;

    const destSubPath = resolve(destPath, fileName);

    if (stats.isFile()) {
      await copyFile(fileName, destSubPath, srcPath, failedFileNames);
    }
  };
}

export default async function newRepo() {
  info("Creating new repository");

  try {
    rootPackageJson = loadRootPackageJson();

    if (!rootPackageJson) {
      return error("Repodog expected a package.json to exist in the project root");
    }

    if (!rootPackageJson.name || !validatePackageName(rootPackageJson.name).valid) {
      return error("Repodog expected the project package.json to have a valid name");
    }

    if (!rootPackageJson.version || !semver.valid(rootPackageJson.version)) {
      return error("Repodog expected the project package.json to have a valid version");
    }

    const { features } = await inquirer.prompt({
      choices: Object.values(REPO_FEATURES).map(name => ({ name })),
      message: "Select the features your repository requires",
      name: "features",
      type: "checkbox",
    });

    repoFeatures = features;
    writeRepodogConfig({ features: repoFeatures });

    info("Copying scaffold to new repository");

    await iterateDirectory(resolvePathToCwd(SCAFFOLD_DIR_PATH), createIterateDirCallback(resolvePathToCwd(".")), {
      sync: true,
    });

    const { proceed } = await inquirer.prompt({
      message: "Are the files in your repository correct?",
      name: "proceed",
      type: "confirm",
    });

    if (!proceed) {
      return error("The files in your repository are not correct");
    }

    await nvmInstall(SCAFFOLD_DIR_PATH);
    exec(`${LOAD_NVM} yarn`);

    const includedPackages = getIncludedPackages(repoFeatures, failedFileNames, {
      packageStructure: SINGLE_PKG_STRUCTURE,
    });

    exec(`${LOAD_NVM} yarn add ${includedPackages.join(" ")} --dev`);
    const peerDependencies = getPackagePeerDependencies(includedPackages);
    exec(`${LOAD_NVM} yarn add ${peerDependencies.join(" ")} --dev`);

    if (rootPackageJson.scripts && rootPackageJson.scripts["new-repo:post"]) {
      exec(`${LOAD_NVM} yarn run new-repo:post`);
    }
  } catch (errors) {
    return error(errors);
  }
}
