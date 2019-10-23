import { NPM_IGNORE } from "@repodog/constants";
import { info, resolvePathToCwd } from "@repodog/helpers";
import { outputFileSync } from "fs-extra";

const content = `
.nyc_output/
.sonar/
.vscode/
bundle/
coverage/
docs/
test/
*.log
.*
*.config.js
CHANGELOG.md
CONTRIBUTING.md
codecov.yml
gulpfile.js
karma.*
lerna.json
mocha.opts
package-lock.json
repodog.config.json
sonar-project.properties
test-setup.js
tsconfig.*
tslint.*
typedoc.js
webpack.*
yarn.lock
`;

export default function generateNPMIgnore() {
  info("Writing npmignore");
  outputFileSync(resolvePathToCwd(NPM_IGNORE), content.trim());
}
