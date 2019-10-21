export type CopyBehaviour = "duplicate" | "fail" | "merge" | "overwrite" | "accept" | "reject";

export type MergeStrategy = "destIntoScaffold" | "scaffoldIntoDest";

export type PublicRepositoryFeature = "browser" | "css" | "react" | "typescript";

export type RepositoryFeature = "browser" | "css" | "monorepo" | "react" | "typescript";

export type RepositoryFeatureConfig = RepositoryFeature | [RepositoryFeature, { dependantOn: RepositoryFeature[] }];
