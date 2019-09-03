import buildReferences from "@repodog/build-references";
import { FILE_ENCODING, PACKAGE_JSON_FILENAME } from "@repodog/constants";
import {
  IterateDirectoryCallback,
  error,
  exec,
  info,
  iterateDirectory,
  loadPackageJson,
  loadRootPackageJson,
  resolvePathToCwd,
  run,
  sortObject,
  validatePackageName,
  warn,
  writePackageJson,
} from "@repodog/helpers";
import { copyFileSync, existsSync, mkdirSync, readFileSync, unlinkSync } from "fs";
import { outputFileSync } from "fs-extra";
import inquirer from "inquirer";
import { safeDump, safeLoad } from "js-yaml";
import { difference, merge, union } from "lodash";
import { ParsedPath, parse, resolve } from "path";
import semver from "semver";
import { JsonObject, PackageJson } from "type-fest";
import {
  BASE_REPO_FILE_NAMES,
  BASE_REPO_PKGS,
  COPY_BEHAVIOUR,
  DEST_INTO_SCAFFOLD,
  DUPLICATE,
  EXTS_EXCLUDED_FROM_MERGE,
  FAIL,
  FILE_NAMES_EXCLUDED_FROM_MERGE,
  FILE_NAMES_TO_PKG_NAMES,
  JSON_EXT,
  MERGE,
  MERGE_STRATEGY,
  OVERWRITE,
  REPO_FEATURES,
  REPO_FEATURES_TO_REPO_PKGS,
  REPO_FEATURES_TO_SCAFFOLD_FILE_NAMES,
  SCAFFOLD_DIR_PATH,
  TYPESCRIPT,
  YAML_EXT,
} from "./constants";
import { CopyBehaviour, MergeStrategy, RepositoryFeatures, ScaffoldFileName } from "./types";

const failedFileNames = new Set<ScaffoldFileName>();
let rootPackageJson: PackageJson | undefined;
let repoFeatures: RepositoryFeatures = [];

function copyFiles(destPath: string): IterateDirectoryCallback {
  return async ({ fileName, filePath: srcPath, stats }) => {
    if (isFileExcluded(fileName)) return;

    const destSubPath = resolve(destPath, fileName);

    if (stats.isDirectory()) {
      if (!existsSync(destSubPath)) {
        mkdirSync(destSubPath);
      }

      await iterateDirectory(srcPath, copyFiles(destSubPath), { sync: true });
    } else {
      let { copyBehaviour } = await inquirer.prompt({
        choices: Object.values(COPY_BEHAVIOUR).map(name => ({ name })),
        message: `Select the copy behaviour for file ${fileName}`,
        name: "copyBehaviour",
        type: "list",
      });

      const parsedDestSubPath = parse(destSubPath);
      const { ext } = parsedDestSubPath;
      let mergeStrategy: MergeStrategy | undefined;

      if (copyBehaviour === MERGE) {
        if (FILE_NAMES_EXCLUDED_FROM_MERGE.includes(fileName) || EXTS_EXCLUDED_FROM_MERGE.includes(ext)) {
          const answerTwo = await inquirer.prompt({
            choices: Object.values(COPY_BEHAVIOUR)
              .filter(name => name !== MERGE)
              .map(name => ({ name })),
            message: `Select the fallback copy behaviour as merge is not possible for file ${fileName}`,
            name: "fallbackCopyBehaviour",
            type: "list",
          });

          copyBehaviour = answerTwo.fallbackCopyBehaviour;
        } else {
          const answerThree = await inquirer.prompt({
            choices: Object.values(MERGE_STRATEGY).map(name => ({ name })),
            message: `Select the merge strategy for file ${fileName}`,
            name: "mergeStrategy",
            type: "list",
          });

          mergeStrategy = answerThree.mergeStrategy;
        }
      }

      if (!existsSync(destSubPath)) {
        if (copyBehaviour === FAIL) {
          failedFileNames.add(fileName as ScaffoldFileName);
        } else {
          copyFileSync(srcPath, destSubPath);
        }

        return;
      }

      executeCopyBehaviour(copyBehaviour, mergeStrategy, fileName, destSubPath, srcPath, parsedDestSubPath);
    }
  };
}

function formatFileContents(contents: string) {
  return contents.split("\n").map(content => content.replace("\r", ""));
}

function executeCopyBehaviour(
  copyBehaviour: CopyBehaviour,
  mergeStrategy: MergeStrategy | undefined,
  fileName: string,
  destPath: string,
  srcPath: string,
  parsedPath: ParsedPath,
) {
  const { dir, ext, name } = parsedPath;

  switch (copyBehaviour) {
    case DUPLICATE:
      copyFileSync(srcPath, `${dir}/${name}.copy${ext}`);
      break;
    case FAIL:
      failedFileNames.add(fileName as ScaffoldFileName);
      warn(`Copy of file "${fileName}" failed.`);
      break;
    case MERGE:
      if (mergeStrategy) {
        mergeFiles(mergeStrategy, destPath, srcPath, parsedPath);
      }
      break;
    case OVERWRITE:
      unlinkSync(destPath);
      copyFileSync(srcPath, destPath);
      break;
    // no default
  }
}

function getIncludedFileNames() {
  return repoFeatures.reduce((included, feature) => {
    const scaffoldFileNames = REPO_FEATURES_TO_SCAFFOLD_FILE_NAMES[feature];
    return [...new Set([...included, ...scaffoldFileNames])];
  }, Object.values(BASE_REPO_FILE_NAMES));
}

function getIncludedPackages() {
  const includedPackages = repoFeatures.reduce((included, feature) => {
    const repoPackages = REPO_FEATURES_TO_REPO_PKGS[feature];
    return [...new Set([...included, ...repoPackages])];
  }, Object.values(BASE_REPO_PKGS));

  const excludedPackages = [...failedFileNames].reduce(
    (excluded, fileName) => {
      const pkgNames = FILE_NAMES_TO_PKG_NAMES[fileName];
      return [...new Set([...excluded, ...pkgNames])];
    },
    [] as string[],
  );

  return difference(includedPackages, excludedPackages);
}

function getPackagePeerDependencies(pkgNames: string[]) {
  return pkgNames.reduce(
    (pkgDeps, pkgName) => {
      const pkgJson = loadPackageJson(resolvePathToCwd(`node_modules/${pkgName}`));
      if (!pkgJson || !pkgJson.peerDependencies) return pkgDeps;

      return [...new Set([...pkgDeps, ...Object.keys(pkgJson.peerDependencies)])];
    },
    [] as string[],
  );
}

function isFileExcluded(fileName: string) {
  return !getIncludedFileNames().includes(fileName);
}

function mergeFiles(mergeStrategy: MergeStrategy, destPath: string, srcPath: string, { base, ext }: ParsedPath) {
  const mergingInto = mergeStrategy === DEST_INTO_SCAFFOLD ? srcPath : destPath;
  const mergingFrom = mergeStrategy === DEST_INTO_SCAFFOLD ? destPath : srcPath;

  if (base === PACKAGE_JSON_FILENAME) {
    const scaffoldPackageJson: PackageJson = require(srcPath);

    const mergedPackageJson =
      mergeStrategy === DEST_INTO_SCAFFOLD
        ? merge(scaffoldPackageJson, rootPackageJson)
        : merge(rootPackageJson, scaffoldPackageJson);

    writePackageJson(".", mergedPackageJson);
  } else if (ext === JSON_EXT) {
    const mergingIntoJson: JsonObject = require(mergingInto);
    const mergingFromJson: JsonObject = require(mergingFrom);
    const mergedJson = merge(mergingIntoJson, mergingFromJson);
    unlinkSync(destPath);
    outputFileSync(destPath, JSON.stringify(sortObject(mergedJson, ["extends"]), null, 2));
  } else if (ext === YAML_EXT) {
    const mergingIntoYml = safeLoad(readFileSync(mergingInto, { encoding: FILE_ENCODING }));
    const mergingFromYml = safeLoad(readFileSync(mergingFrom, { encoding: FILE_ENCODING }));
    const mergedYml = safeDump(merge(mergingIntoYml, mergingFromYml));
    unlinkSync(destPath);
    outputFileSync(destPath, mergedYml);
  } else if (!ext) {
    const mergingIntoFile = formatFileContents(readFileSync(mergingInto, { encoding: FILE_ENCODING }));
    const mergingFromFile = formatFileContents(readFileSync(mergingFrom, { encoding: FILE_ENCODING }));
    const mergedFile = union(mergingIntoFile, mergingFromFile).sort();
    unlinkSync(destPath);
    outputFileSync(destPath, mergedFile.join("\n"));
  }
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

    info("Copying scaffold to new monorepo");
    await iterateDirectory(resolvePathToCwd(SCAFFOLD_DIR_PATH), copyFiles(resolvePathToCwd(".")), { sync: true });

    const { proceed } = await inquirer.prompt({
      message: "Are the files in your repository correct?",
      name: "proceed",
      type: "confirm",
    });

    if (!proceed) {
      return error("The files in your repository are not correct");
    }

    exec("yarn");
    const includedPackages = getIncludedPackages();
    exec(`yarn add ${includedPackages.join(" ")} --dev -W`);
    exec(`yarn add ${getPackagePeerDependencies(includedPackages).join(" ")} --dev -W`);
    exec("lerna bootstrap");

    if (features.includes(TYPESCRIPT)) {
      buildReferences();
    }

    if (rootPackageJson.scripts && rootPackageJson.scripts["new-monorepo:post"]) {
      run("new-monorepo:post");
    }
  } catch (errors) {
    return error(errors);
  }
}
