import buildReferences from "@repodog/build-references";
import { LOAD_NVM, MULTI_PKG_STRUCTURE, REPO_FEATURES, TYPESCRIPT } from "@repodog/constants";
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
import { getIncludedPackages, getPackagePeerDependencies, isFileExcluded } from "@repodog/new-repo";
import { RepositoryFeatures, ScaffoldFileName } from "@repodog/types";
import { existsSync, mkdirSync } from "fs";
import inquirer from "inquirer";
import { resolve } from "path";
import semver from "semver";
import { PackageJson } from "type-fest";
import { SCAFFOLD_DIR_PATH } from "./constants";

const failedFileNames = new Set<ScaffoldFileName>();
let rootPackageJson: PackageJson | undefined;
let repoFeatures: RepositoryFeatures = [];

function createIterateDirCallback(destPath: string): IterateDirectoryCallback {
  return async ({ fileName, filePath: srcPath, stats }) => {
    if (isFileExcluded(fileName, repoFeatures)) return;

    const destSubPath = resolve(destPath, fileName);

    if (stats.isDirectory()) {
      if (!existsSync(destSubPath)) {
        mkdirSync(destSubPath);
      }

      await iterateDirectory(srcPath, createIterateDirCallback(destSubPath), { sync: true });
    } else {
      await copyFile(fileName, destSubPath, srcPath, failedFileNames);
    }
  };
}

export default async function newMonorepo() {
  info("Creating new monorepo");

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

    info("Copying scaffold to new monorepo");

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
      packageStructure: MULTI_PKG_STRUCTURE,
    });

    exec(`${LOAD_NVM} yarn add ${includedPackages.join(" ")} --dev -W`);
    const peerDependencies = getPackagePeerDependencies(includedPackages);
    exec(`${LOAD_NVM} yarn add ${peerDependencies.join(" ")} --dev -W`);
    exec(`${LOAD_NVM} lerna bootstrap`);

    if (repoFeatures.includes(TYPESCRIPT)) {
      buildReferences();
    }

    if (rootPackageJson.scripts && rootPackageJson.scripts["new-monorepo:post"]) {
      exec(`${LOAD_NVM} yarn run new-monorepo:post`);
    }
  } catch (errors) {
    return error(errors);
  }
}
