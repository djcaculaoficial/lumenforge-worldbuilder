/**
 * Rewritten by scripts/write-build-info.mjs immediately before each production build.
 * The committed fallback makes a local development build visibly distinguishable.
 */
export const BUILD_INFO = {
  product: "Lumenforge Worldbuilder",
  release: "0.3.3 · WORLDBUILDER",
  sourceRevision: "development",
  generatedAt: "unbuilt",
} as const;
