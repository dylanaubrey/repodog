import shell from "shelljs";
import { error } from "../commands";
import { loadPackageJson } from "../load-write-package-json";
import resolvePathToCwd from "../resolve-path-to-cwd";
import sanitizeVersion from "../sanitize-version";

export default async function nvmInstall(scaffoldDirPath: string) {
  const scriptPath = `${process.cwd()}/node_modules/@repodog/helpers/scripts/load-nvm.sh`;
  const packageJson = loadPackageJson(resolvePathToCwd(scaffoldDirPath));
  const nodeVersion = sanitizeVersion(packageJson?.engines?.node ?? "node");

  try {
    await new Promise(resolve => {
      shell.exec(`${scriptPath} ${nodeVersion}`, { async: true }, () => {
        resolve();
      });
    });
  } catch (errors) {
    return error(errors);
  }
}
