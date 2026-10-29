import type {
  PublicFilterGroup,
  PublicProductFilters,
  PublicProductSort,
} from "./public-types";

const sorts = new Set<PublicProductSort>([
  "newest",
  "name_asc",
  "price_asc",
  "price_desc",
]);

const PAGE_SIZE = 12;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function readValues(value: string | string[] | undefined) {
  return (Array.isArray(value) ? value : [value])
    .filter((item): item is string => Boolean(item))
    .flatMap((item) => item.split(","))
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parsePublicProductFilters(
  params: Record<string, string | string[] | undefined>,
  groups: PublicFilterGroup[],
): PublicProductFilters {
  const selections: Record<string, string[]> = {};

  for (const group of groups) {
    const availableSlugs = group.options.map((option) => option.slug);
    const selectedSlugs = new Set(readValues(params[group.key]));
    const values = availableSlugs.filter((slug) => selectedSlugs.has(slug));

    if (values.length === 0) {
      continue;
    }

    selections[group.key] =
      group.type === "SINGLE_SELECT" ? values.slice(0, 1) : values;
  }

  const rawSort = firstValue(params.sort);
  const rawPage = Number(firstValue(params.page) ?? "1");

  return {
    q: (firstValue(params.q) ?? "").trim().slice(0, 100),
    selections,
    sort:
      rawSort && sorts.has(rawSort as PublicProductSort)
        ? (rawSort as PublicProductSort)
        : "newest",
    page:
      Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1,
    pageSize: PAGE_SIZE,
  };
}

type CatalogHrefOverrides = {
  page?: number;
  sort?: PublicProductSort;
  q?: string;
  selections?: Record<string, string[]>;
};

export function buildCatalogHref(
  filters: PublicProductFilters,
  overrides: CatalogHrefOverrides = {},
) {
  const merged = { ...filters, ...overrides };
  const searchParams = new URLSearchParams();

  if (merged.q) {
    searchParams.set("q", merged.q);
  }

  if (merged.sort !== "newest") {
    searchParams.set("sort", merged.sort);
  }

  for (const [key, values] of Object.entries(merged.selections)) {
    for (const value of values) {
      searchParams.append(key, value);
    }
  }

  if (merged.page > 1) {
    searchParams.set("page", String(merged.page));
  }

  const query = searchParams.toString();
  return query ? `/produk?${query}` : "/produk";
}

export function removeCatalogSelection(
  filters: PublicProductFilters,
  groupKey: string,
  optionSlug: string,
) {
  const selections = Object.fromEntries(
    Object.entries(filters.selections)
      .map(([key, values]) => [
        key,
        key === groupKey
          ? values.filter((value) => value !== optionSlug)
          : values,
      ])
      .filter(([, values]) => values.length > 0),
  );

  return buildCatalogHref(filters, { selections, page: 1 });
}
