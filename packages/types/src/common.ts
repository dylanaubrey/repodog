export type CopyBehaviour = "duplicate" | "fail" | "merge" | "overwrite" | "accept" | "reject";

export type MergeStrategy = "destIntoScaffold" | "scaffoldIntoDest";

export type PublicRepositoryFeature = "browser" | "css" | "react" | "typescript";

export type RepositoryFeature = "browser" | "css" | "monorepo" | "react" | "typescript";

export type DependencyConfig = string | [string, { dependantOn: RepositoryFeature[] }];

export interface ConfigDependencies {
  core: string[];
  css?: (string | DependencyConfig)[];
  monorepo?: (string | DependencyConfig)[];
  react?: (string | DependencyConfig)[];
  typescript?: (string | DependencyConfig)[];
}
