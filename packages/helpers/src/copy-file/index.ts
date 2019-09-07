import {
  COPY_BEHAVIOUR,
  DUPLICATE,
  EXTS_EXCLUDED_FROM_MERGE,
  FAIL,
  FILE_NAMES_EXCLUDED_FROM_MERGE,
  MERGE,
  MERGE_STRATEGY,
  OVERWRITE,
} from "@repodog/constants";
import { CopyBehaviour, MergeStrategy, ScaffoldFileName } from "@repodog/types";
import { copyFileSync, existsSync, unlinkSync } from "fs";
import inquirer from "inquirer";
import { ParsedPath, parse } from "path";
import { warn } from "../commands";
import mergeFile from "../merge-file";

export default async function copyFile(
  fileName: string,
  destPath: string,
  srcPath: string,
  failedFileNames: Set<ScaffoldFileName>,
) {
  let { copyBehaviour } = await inquirer.prompt({
    choices: Object.values(COPY_BEHAVIOUR).map(name => ({ name })),
    message: `Select the copy behaviour for file ${fileName}`,
    name: "copyBehaviour",
    type: "list",
  });

  const parsedDestPath = parse(destPath);
  const { ext } = parsedDestPath;
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

  if (!existsSync(destPath)) {
    if (copyBehaviour === FAIL) {
      failedFileNames.add(fileName as ScaffoldFileName);
    } else {
      copyFileSync(srcPath, destPath);
    }

    return;
  }

  executeCopyBehaviour(copyBehaviour, mergeStrategy, fileName, destPath, srcPath, parsedDestPath, failedFileNames);
}

function executeCopyBehaviour(
  copyBehaviour: CopyBehaviour,
  mergeStrategy: MergeStrategy | undefined,
  fileName: string,
  destPath: string,
  srcPath: string,
  parsedPath: ParsedPath,
  failedFileNames: Set<ScaffoldFileName>,
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
        mergeFile(mergeStrategy, destPath, srcPath, parsedPath);
      }
      break;
    case OVERWRITE:
      unlinkSync(destPath);
      copyFileSync(srcPath, destPath);
      break;
    // no default
  }
}
