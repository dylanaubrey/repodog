import { readdirSync, statSync } from "fs";
import { resolve } from "path";
import { info } from "../commands";
import { IterateDirectoryCallback, IterateDirectoryOptions } from "../types";

export default async function iterateDirectory(
  fullPath: string,
  callback: IterateDirectoryCallback,
  { sync }: IterateDirectoryOptions = {},
) {
  info(`Iterating directory "${fullPath}"`);
  const fileNames = readdirSync(fullPath);

  for (const fileName of fileNames) {
    const filePath = resolve(fullPath, fileName);
    const stats = statSync(filePath);

    if (sync) {
      await callback({ fileName, filePath, stats });
    } else {
      callback({ fileName, filePath, stats });
    }
  }
}
