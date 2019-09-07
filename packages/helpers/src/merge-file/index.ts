import { DEST_INTO_SCAFFOLD, FILE_ENCODING, JSON_EXT, PACKAGE_JSON_FILENAME, YAML_EXT } from "@repodog/constants";
import { MergeStrategy } from "@repodog/types";
import { readFileSync, unlinkSync } from "fs";
import { outputFileSync } from "fs-extra";
import { safeDump, safeLoad } from "js-yaml";
import { merge, union } from "lodash";
import { ParsedPath } from "path";
import { JsonObject } from "type-fest";
import { writePackageJson } from "../load-write-package-json";
import sortObject from "../sort-object";

function formatFileContents(contents: string) {
  return contents.split("\n").map(content => content.replace("\r", ""));
}

export default function mergeFile(
  mergeStrategy: MergeStrategy,
  destPath: string,
  srcPath: string,
  { base, ext }: ParsedPath,
) {
  const mergingInto = mergeStrategy === DEST_INTO_SCAFFOLD ? srcPath : destPath;
  const mergingFrom = mergeStrategy === DEST_INTO_SCAFFOLD ? destPath : srcPath;

  if (base === PACKAGE_JSON_FILENAME) {
    const mergingIntoPkgJson: JsonObject = require(mergingInto);
    const mergingFromPkgJson: JsonObject = require(mergingFrom);
    const mergedPkgJson = merge(mergingIntoPkgJson, mergingFromPkgJson);
    unlinkSync(destPath);
    writePackageJson(".", mergedPkgJson);
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
