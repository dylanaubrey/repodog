import {
  error,
  info,
  iterateDependencies,
  iteratePackages,
  loadRepodogConfig,
  loadRootPackageJson,
  loadTSConfig,
  resolvePathToCwd,
  warn,
  writeTSConfig,
} from "@repodog/helpers";
import { TSConfig, TSConfigReference } from "@repodog/types";
import { get } from "lodash";
import { BuildPackageReferencesParams, SetReferencesFromDependenciesParams } from "../type-defs";

function setReferencesFromDependencies({
  dependencies,
  globalRefs,
  references,
  scope,
}: SetReferencesFromDependenciesParams) {
  iterateDependencies(dependencies, ({ name }) => {
    if (name.startsWith(`@${scope}`)) {
      references.push({ path: `../${name.replace(`@${scope}/`, "")}` });
    }
  });

  if (globalRefs.length) {
    references.push(...globalRefs.map(name => ({ path: `../${name.replace(`@${scope}/`, "")}` })));
  }
}

export function buildPackageReferences({
  fullPath,
  globalRefs,
  packageJson,
  scope,
  tsconfig,
}: BuildPackageReferencesParams) {
  if (!packageJson.dependencies && !packageJson.devDependencies) return;

  const references: TSConfigReference[] = [];

  if (packageJson.dependencies) {
    setReferencesFromDependencies({ dependencies: packageJson.dependencies, globalRefs, references, scope });
  }

  if (packageJson.devDependencies) {
    setReferencesFromDependencies({ dependencies: packageJson.devDependencies, globalRefs, references, scope });
  }

  writeTSConfig(fullPath, { ...tsconfig, references });
}

export default function buildProjectReferences() {
  info("Building project references");

  try {
    const rootPackageJson = loadRootPackageJson();

    if (!rootPackageJson) {
      return error("Repodog expected a package.json to exist in the project root.");
    }

    const scope = rootPackageJson.name;

    if (!scope) {
      return error("Repodog expected the project package.json to have a name.");
    }

    const { buildReferences, packagesPath } = loadRepodogConfig();
    const globalRefs = get(buildReferences, ["global"], []);
    const references: TSConfigReference[] = [];

    iteratePackages(({ dirName, fullPath, packageJson }) => {
      if (!packageJson) return;

      let packageTSConfig: TSConfig | undefined;

      try {
        packageTSConfig = loadTSConfig(fullPath);
      } catch (errors) {
        warn(errors);
      } finally {
        if (packageTSConfig) {
          references.push({ path: `./${dirName}` });
          buildPackageReferences({ fullPath, globalRefs, packageJson, scope, tsconfig: packageTSConfig });
        }
      }
    });

    let tsconfig: TSConfig | undefined;

    try {
      tsconfig = loadTSConfig(resolvePathToCwd(packagesPath));
    } catch (errors) {
      warn(errors);
    } finally {
      writeTSConfig(resolvePathToCwd(packagesPath), { ...(tsconfig || {}), references });
    }
  } catch (errors) {
    return error(errors);
  }
}
