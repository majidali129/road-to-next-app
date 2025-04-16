import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParser = parseAsString.withDefault("").withOptions({
  clearOnDefault: true,
  shallow: false,
});
export const sortParser = parseAsString.withDefault("newest").withOptions({
  clearOnDefault: true,
  shallow: false,
});

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  sort: sortParser,
});

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
