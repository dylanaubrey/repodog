import { NVM_SCRIPT } from "@repodog/constants";
import { get } from "lodash";
import { PackageJson } from "type-fest";
import { exec } from "../commands";

export default function installNVM(rootPackageJson: PackageJson) {
  exec(`curl -o- ${NVM_SCRIPT} | bash`);
  exec("source ~/.nvm/nvm.sh");
  const nodeVersion = get(rootPackageJson, ["engines", "node"]);
  exec(`nvm install ${nodeVersion}`);
  exec(`nvm use ${nodeVersion}`);
}
