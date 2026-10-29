import type {
  AdminProductFilters,
  AdminProductSort,
  AdminProductStatus,
} from "./types";

const statuses = new Set<AdminProductStatus | "ALL">([
  "ALL",
  "DRAFT",
  "ACTIVE",
  "ARCHIVED",
]);

const sorts = new Set<AdminProductSort>([
  "updated_desc",
  "name_asc",
  "price_asc",
  "price_desc",
]);

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function parseAdminProductFilters(
  params: Record<string, string | string[] | undefined>,
): AdminProductFilters {
  const rawStatus = firstValue(params.status);
  const rawSort = firstValue(params.sort);
  const rawPage = Number(firstValue(params.page) ?? "1");

  return {
    q: (firstValue(params.q) ?? "").trim().slice(0, 100),
    status:
      rawStatus && statuses.has(rawStatus as AdminProductStatus | "ALL")
        ? (rawStatus as AdminProductStatus | "ALL")
        : "ALL",
    tag: (firstValue(params.tag) ?? "").trim().slice(0, 120),
    sort:
      rawSort && sorts.has(rawSort as AdminProductSort)
        ? (rawSort as AdminProductSort)
        : "updated_desc",
    page:
      Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1,
    pageSize: 10,
  };
}
