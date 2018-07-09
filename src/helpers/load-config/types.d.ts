import { NPMClient } from "../../types";

export interface RepodogConfig {
  npmClient: NPMClient;
  packagesPath: string;
  scaffoldPath: string;
}
