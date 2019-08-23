import buildReferences from "@repodog/build-references";
import { PACKAGE_JSON_FILENAME } from "@repodog/constants";
import {
  IterateDirectoryCallback,
  error,
  info,
  iterateDirectory,
  loadRepodogConfig,
  loadRootPackageJson,
  resolvePathToCwd,
  run,
  sortObject,
  validatePackageName,
  warn,
  writePackageJson,
} from "@repodog/helpers";
import { NewMonorepoCopyBehaviour, NewMonorepoCopyBehaviourOptions } from "@repodog/types";
import { copyFileSync, existsSync, mkdirSync, readFileSync, unlinkSync } from "fs";
import { outputFileSync } from "fs-extra";
import { get, merge, union } from "lodash";
import { parse, resolve } from "path";
import semver from "semver";
import { JsonObject, PackageJson } from "type-fest";
import { COPY_BEHAVIOUR, ENCODING, FILES_EXCLUDED_FROM_MERGE, JSON_EXT, SCAFFOLD_DIR_PATH } from "../constants";

function copyFiles(
  destPath: string,
  exclude: RegExp[],
  [copyBehaviour, { mergeIfPossible = true } = {}]: [NewMonorepoCopyBehaviour, NewMonorepoCopyBehaviourOptions?],
): IterateDirectoryCallback {
  const rootPackageJson = loadRootPackageJson();

  return ({ fileName, filePath, stats }) => {
    if (exclude.find(regexp => regexp.test(fileName))) return;

    const destSubPath = resolve(destPath, fileName);

    if (stats.isDirectory()) {
      if (!existsSync(destSubPath)) {
        mkdirSync(destSubPath);
      }

      iterateDirectory(filePath, copyFiles(destSubPath, exclude, [copyBehaviour, { mergeIfPossible }]));
    } else if (existsSync(destSubPath)) {
      const { base, dir, name, ext } = parse(destSubPath);

      if (base === PACKAGE_JSON_FILENAME) {
        const scaffoldPackageJson: PackageJson = require(destSubPath);
        const mergedPackageJson = merge(scaffoldPackageJson, rootPackageJson);
        writePackageJson(".", mergedPackageJson);
      } else if (copyBehaviour !== COPY_BEHAVIOUR.FAIL && mergeIfPossible) {
        if (ext === JSON_EXT && !FILES_EXCLUDED_FROM_MERGE.includes(name)) {
          const scaffoldJson: JsonObject = require(filePath);
          const destJson: JsonObject = require(destSubPath);
          const mergedJson = merge(scaffoldJson, destJson);
          unlinkSync(destSubPath);
          outputFileSync(destSubPath, JSON.stringify(sortObject(mergedJson, ["extends"]), null, 2));
        } else if (!ext && !FILES_EXCLUDED_FROM_MERGE.includes(name)) {
          const scaffoldFile = readFileSync(filePath, { encoding: ENCODING }).split("\n");
          const destFile = readFileSync(destSubPath, { encoding: ENCODING }).split("\n");
          const mergedFile = union(scaffoldFile, destFile).sort();
          unlinkSync(destSubPath);
          outputFileSync(destSubPath, mergedFile.join("\n"));
        }
      } else if (copyBehaviour === COPY_BEHAVIOUR.OVERWRITE) {
        unlinkSync(destSubPath);
        copyFileSync(filePath, destSubPath);
      } else if (copyBehaviour === COPY_BEHAVIOUR.DUPLICATE) {
        copyFileSync(filePath, `${dir}/${name}.copy${ext}`);
      } else {
        warn(`Copy of file "${fileName}" failed. The file already exists in the destination directory.`);
      }
    } else {
      copyFileSync(filePath, destSubPath);
    }
  };
}

export default function newMonorepo() {
  info("Creating new monorepo");
  const rootPackageJson = loadRootPackageJson();

  if (!rootPackageJson) {
    return error("Repodog expected a package.json to exist in the project root.");
  }

  if (!rootPackageJson.name || !validatePackageName(rootPackageJson.name).valid) {
    return error("Repodog expected the project package.json to have a valid name.");
  }

  if (!rootPackageJson.version || !semver.valid(rootPackageJson.version)) {
    return error("Repodog expected the project package.json to have a valid version.");
  }

  const { newMonorepo: newMonorepoConfig } = loadRepodogConfig();
  const exclude = get(newMonorepoConfig, ["scaffold", "exclude"], []);

  const copyBehaviour = get(newMonorepoConfig, ["scaffold", "copyBehaviour"], ["duplicate"] as [
    NewMonorepoCopyBehaviour,
    NewMonorepoCopyBehaviourOptions?,
  ]);

  info("Copying scaffold to new monorepo");
  iterateDirectory(resolvePathToCwd(SCAFFOLD_DIR_PATH), copyFiles(resolvePathToCwd("."), exclude, copyBehaviour));
  run("init");
  buildReferences();

  if (rootPackageJson.scripts && rootPackageJson.scripts["new-monorepo:post"]) {
    run("new-monorepo:post");
  }
}
