import "server-only";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

import type {
  AdminProductFilters,
  AdminProductList,
  AdminProductRow,
  FilterGroupDetail,
  FilterGroupRow,
  FilterOptionSummary,
  ProductFormValues,
  ProductOptionGroup,
} from "./types";

const productSortMap: Record<
  AdminProductFilters["sort"],
  Prisma.ProductOrderByWithRelationInput
> = {
  updated_desc: { updatedAt: "desc" },
  name_asc: { name: "asc" },
  price_asc: { price: "asc" },
  price_desc: { price: "desc" },
};

export async function listAdminProducts(
  filters: AdminProductFilters,
): Promise<AdminProductList> {
  const where: Prisma.ProductWhereInput = {
    ...(filters.status !== "ALL" ? { status: filters.status } : {}),
    ...(filters.tag
      ? {
          filterValues: {
            some: {
              option: {
                slug: filters.tag,
                group: { key: "tag" },
              },
            },
          },
        }
      : {}),
    ...(filters.q
      ? {
          OR: [
            { name: { contains: filters.q } },
            { slug: { contains: filters.q } },
            { description: { contains: filters.q } },
          ],
        }
      : {}),
  };

  const total = await prisma.product.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / filters.pageSize));
  const page = Math.min(filters.page, totalPages);

  const products = await prisma.product.findMany({
    where,
    orderBy: productSortMap[filters.sort],
    skip: (page - 1) * filters.pageSize,
    take: filters.pageSize,
    select: {
      id: true,
      name: true,
      slug: true,
      price: true,
      status: true,
      updatedAt: true,
      filterValues: {
        select: {
          option: {
            select: {
              id: true,
              label: true,
              slug: true,
              group: { select: { key: true } },
            },
          },
        },
      },
    },
  });

  const items: AdminProductRow[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    status: product.status,
    updatedAt: product.updatedAt,
    tags: product.filterValues
      .filter((value) => value.option.group.key === "tag")
      .map((value) => ({
        id: value.option.id,
        label: value.option.label,
        slug: value.option.slug,
      })),
  }));

  return {
    items,
    total,
    page,
    pageSize: filters.pageSize,
    totalPages,
  };
}

export async function listGroupsWithOptions(): Promise<ProductOptionGroup[]> {
  const groups = await prisma.filterGroup.findMany({
    orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
    select: {
      id: true,
      key: true,
      label: true,
      type: true,
      isSystem: true,
      isActive: true,
      options: {
        orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
        select: {
          id: true,
          label: true,
          slug: true,
          isActive: true,
        },
      },
    },
  });

  return groups;
}

export async function getProductFormValues(
  id: string,
): Promise<ProductFormValues | null> {
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      status: true,
      filterValues: {
        select: { optionId: true },
      },
    },
  });

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    status: product.status,
    optionIds: product.filterValues.map((value) => value.optionId),
  };
}

export async function listFilterGroups(): Promise<FilterGroupRow[]> {
  const groups = await prisma.filterGroup.findMany({
    orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
    select: {
      id: true,
      key: true,
      label: true,
      type: true,
      isSystem: true,
      isActive: true,
      sortOrder: true,
      _count: { select: { options: true } },
    },
  });

  return groups.map((group) => ({
    id: group.id,
    key: group.key,
    label: group.label,
    type: group.type,
    isSystem: group.isSystem,
    isActive: group.isActive,
    sortOrder: group.sortOrder,
    optionCount: group._count.options,
  }));
}

export async function getFilterGroupDetail(
  id: string,
): Promise<FilterGroupDetail | null> {
  const group = await prisma.filterGroup.findUnique({
    where: { id },
    select: {
      id: true,
      key: true,
      label: true,
      type: true,
      isSystem: true,
      isActive: true,
      sortOrder: true,
      options: {
        orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
        select: {
          id: true,
          label: true,
          slug: true,
          isActive: true,
          sortOrder: true,
          _count: { select: { filterValues: true } },
        },
      },
    },
  });

  if (!group) {
    return null;
  }

  return {
    id: group.id,
    key: group.key,
    label: group.label,
    type: group.type,
    isSystem: group.isSystem,
    isActive: group.isActive,
    sortOrder: group.sortOrder,
    optionCount: group.options.length,
    options: group.options.map((option) => ({
      id: option.id,
      label: option.label,
      slug: option.slug,
      isActive: option.isActive,
      sortOrder: option.sortOrder,
      productCount: option._count.filterValues,
    })),
  };
}

export async function listTagOptions(): Promise<FilterOptionSummary[]> {
  const group = await prisma.filterGroup.findUnique({
    where: { key: "tag" },
    select: {
      options: {
        orderBy: [{ sortOrder: "asc" }, { label: "asc" }],
        select: { id: true, label: true, slug: true },
      },
    },
  });

  return group?.options ?? [];
}

export async function productSlugExists(slug: string, excludeId?: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
    select: { id: true },
  });

  return Boolean(product);
}
