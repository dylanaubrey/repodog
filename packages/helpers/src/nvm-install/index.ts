import { get } from "lodash";
import shell from "shelljs";
import { PackageJson } from "type-fest";
import { error } from "../commands";
import sanitizeVersion from "../sanitize-version";

export default async function nvmInstall(rootPackageJson: PackageJson) {
  const scriptPath = `${process.cwd()}/node_modules/@repodog/helpers/scripts/load-nvm.sh`;
  const nodeVersion = sanitizeVersion(get(rootPackageJson, ["engines", "node"]));

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
