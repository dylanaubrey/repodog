export const COPY_BEHAVIOUR = {
  DUPLICATE: "duplicate" as const,
  FAIL: "fail" as const,
  OVERWRITE: "overwrite" as const,
};

export const FILES_EXCLUDED_FROM_MERGE = ["LICENSE"];
export const JSON_EXT = ".json";
export const SCAFFOLD_DIR_PATH = "node_modules/@repodog/new-monorepo/scaffold";
