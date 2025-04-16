import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParser = parseAsString.withDefault("").withOptions({
  clearOnDefault: true,
  shallow: false,
});

export const sortParser = {
  sortKey: parseAsString.withDefault("createdAt"),
  sortValue: parseAsString.withDefault("desc"),
};
export const paginationParser = {
  page: parseAsInteger.withDefault(0),
  size: parseAsInteger.withDefault(5),
};

export const sortOptions = {
  shallow: false,
  clearonDefault: true,
};
export const paginationOptions = {
  shallow: false,
  clearonDefault: true,
};

export const searchParamsCache = createSearchParamsCache({
  search: searchParser,
  ...sortParser,
  ...paginationParser,
});

export type ParsedSearchParams = ReturnType<typeof searchParamsCache.parse>;
