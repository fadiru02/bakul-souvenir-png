import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

import { CATALOG_CACHE_TAGS } from "./cache-tags";
import type {
  PublicFilterGroup,
  PublicProduct,
  PublicProductFilters,
  PublicProductList,
} from "./public-types";

const productSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  price: true,
  filterValues: {
    where: {
      option: {
        isActive: true,
        group: { isActive: true },
      },
    },
    select: {
      option: {
        select: {
          id: true,
          label: true,
          slug: true,
          sortOrder: true,
          group: {
            select: {
              key: true,
              label: true,
              sortOrder: true,
            },
          },
        },
      },
    },
  },
} satisfies Prisma.ProductSelect;

type ProductPayload = Prisma.ProductGetPayload<{
  select: typeof productSelect;
}>;

const productSortMap: Record<
  PublicProductFilters["sort"],
  Prisma.ProductOrderByWithRelationInput[]
> = {
  newest: [{ createdAt: "desc" }, { name: "asc" }],
  name_asc: [{ name: "asc" }],
  price_asc: [{ price: "asc" }, { name: "asc" }],
  price_desc: [{ price: "desc" }, { name: "asc" }],
};

function mapProduct(product: ProductPayload): PublicProduct {
  const groupMap = new Map<
    string,
    {
      key: string;
      label: string;
      sortOrder: number;
      options: {
        id: string;
        label: string;
        slug: string;
        sortOrder: number;
      }[];
    }
  >();

  for (const { option } of product.filterValues) {
    const group = groupMap.get(option.group.key) ?? {
      key: option.group.key,
      label: option.group.label,
      sortOrder: option.group.sortOrder,
      options: [],
    };

    group.options.push({
      id: option.id,
      label: option.label,
      slug: option.slug,
      sortOrder: option.sortOrder,
    });
    groupMap.set(option.group.key, group);
  }

  const filterGroups = [...groupMap.values()]
    .sort(
      (a, b) =>
        a.sortOrder - b.sortOrder || a.label.localeCompare(b.label, "id"),
    )
    .map((group) => ({
      key: group.key,
      label: group.label,
      options: group.options
        .sort(
          (a, b) =>
            a.sortOrder - b.sortOrder || a.label.localeCompare(b.label, "id"),
        )
        .map((option) => ({
          id: option.id,
          label: option.label,
          slug: option.slug,
        })),
    }));

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    filterGroups,
  };
}

function buildProductWhere(
  filters: PublicProductFilters,
): Prisma.ProductWhereInput {
  const selections = Object.entries(filters.selections);

  return {
    status: "ACTIVE",
    ...(filters.q
      ? {
          OR: [
            { name: { contains: filters.q } },
            { slug: { contains: filters.q } },
            { description: { contains: filters.q } },
          ],
        }
      : {}),
    ...(selections.length > 0
      ? {
          AND: selections.map(([groupKey, optionSlugs]) => ({
            filterValues: {
              some: {
                option: {
                  slug: { in: optionSlugs },
                  isActive: true,
                  group: { key: groupKey, isActive: true },
                },
              },
            },
          })),
        }
      : {}),
  };
}

export async function getPublicFilterGroups(): Promise<PublicFilterGroup[]> {
  "use cache";

  cacheLife("hours");
  cacheTag(CATALOG_CACHE_TAGS.filters);

  return prisma.filterGroup.findMany({
    where: {
      isActive: true,
      options: { some: { isActive: true } },
    },
    orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
    select: {
      id: true,
      key: true,
      label: true,
      type: true,
      options: {
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
        select: {
          id: true,
          label: true,
          slug: true,
        },
      },
    },
  });
}

export async function listPublicProducts(
  filters: PublicProductFilters,
): Promise<PublicProductList> {
  "use cache";

  cacheLife("hours");
  cacheTag(CATALOG_CACHE_TAGS.products);

  const where = buildProductWhere(filters);
  const total = await prisma.product.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / filters.pageSize));
  const page = Math.min(Math.max(filters.page, 1), totalPages);

  const products =
    total === 0
      ? []
      : await prisma.product.findMany({
          where,
          orderBy: productSortMap[filters.sort],
          skip: (page - 1) * filters.pageSize,
          take: filters.pageSize,
          select: productSelect,
        });

  return {
    items: products.map(mapProduct),
    total,
    page,
    pageSize: filters.pageSize,
    totalPages,
  };
}

export async function getPublicProductBySlug(
  slug: string,
): Promise<PublicProduct | null> {
  "use cache";

  cacheLife("hours");
  cacheTag(CATALOG_CACHE_TAGS.products);

  const product = await prisma.product.findFirst({
    where: { slug, status: "ACTIVE" },
    select: productSelect,
  });

  return product ? mapProduct(product) : null;
}
