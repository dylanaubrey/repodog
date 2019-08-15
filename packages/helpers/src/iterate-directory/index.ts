import { readdirSync, statSync } from "fs";
import { resolve } from "path";
import { info } from "../commands";
import { IterateDirectoryCallback } from "../type-defs";

export default function iterateDirectory(fullPath: string, callback: IterateDirectoryCallback) {
  info(`Iterating directory "${fullPath}"`);
  const fileNames = readdirSync(fullPath);

  fileNames.forEach(fileName => {
    const filePath = resolve(fullPath, fileName);
    const stats = statSync(filePath);
    if (!stats.isDirectory()) return;
    callback({ fileName, filePath, stats });
  });
}
