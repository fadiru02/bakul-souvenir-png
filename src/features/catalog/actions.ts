"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

import { requireAdmin } from "@/features/auth/dal";
import { prisma } from "@/lib/prisma";

import { productSlugExists } from "./admin-repository";
import { CATALOG_CACHE_TAGS } from "./cache-tags";
import { isPrismaKnownError, validateProductOptions } from "./service";
import type { FormState } from "./types";
import {
  filterGroupCreateSchema,
  filterGroupUpdateSchema,
  filterOptionSchema,
  flattenFieldErrors,
  productSchema,
  readFilterGroupFormData,
  readFilterOptionFormData,
  readProductFormData,
} from "./validation";

function mutationError(error: unknown): FormState {
  if (isPrismaKnownError(error, "P2002")) {
    return { error: "Slug atau key sudah dipakai. Gunakan nilai lain." };
  }

  return { error: "Terjadi kesalahan saat menyimpan data. Coba lagi." };
}

function revalidateCatalog() {
  revalidatePath("/admin/produk");
  revalidatePath("/admin/filter");
  updateTag(CATALOG_CACHE_TAGS.products);
  updateTag(CATALOG_CACHE_TAGS.filters);
}

export async function createProduct(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = productSchema.safeParse(readProductFormData(formData));

  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error) };
  }

  if (await productSlugExists(parsed.data.slug)) {
    return { fieldErrors: { slug: ["Slug sudah dipakai produk lain."] } };
  }

  const optionSelection = await validateProductOptions(parsed.data.optionIds);

  if (!optionSelection.ok) {
    return { error: optionSelection.message };
  }

  try {
    await prisma.product.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description,
        price: parsed.data.price,
        status: parsed.data.status,
        filterValues: {
          create: optionSelection.optionIds.map((optionId) => ({ optionId })),
        },
      },
    });
  } catch (error) {
    return mutationError(error);
  }

  revalidateCatalog();
  redirect("/admin/produk?saved=created");
}

export async function updateProduct(
  id: string,
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = productSchema.safeParse(readProductFormData(formData));

  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error) };
  }

  if (await productSlugExists(parsed.data.slug, id)) {
    return { fieldErrors: { slug: ["Slug sudah dipakai produk lain."] } };
  }

  const optionSelection = await validateProductOptions(parsed.data.optionIds);

  if (!optionSelection.ok) {
    return { error: optionSelection.message };
  }

  try {
    await prisma.$transaction([
      prisma.productFilterValue.deleteMany({ where: { productId: id } }),
      prisma.product.update({
        where: { id },
        data: {
          name: parsed.data.name,
          slug: parsed.data.slug,
          description: parsed.data.description,
          price: parsed.data.price,
          status: parsed.data.status,
          filterValues: {
            create: optionSelection.optionIds.map((optionId) => ({ optionId })),
          },
        },
      }),
    ]);
  } catch (error) {
    if (isPrismaKnownError(error, "P2025")) {
      return { error: "Produk tidak ditemukan. Mungkin sudah dihapus." };
    }

    return mutationError(error);
  }

  revalidateCatalog();
  redirect("/admin/produk?saved=updated");
}

export async function deleteProduct(id: string) {
  await requireAdmin();

  try {
    await prisma.product.delete({ where: { id } });
  } catch (error) {
    if (!isPrismaKnownError(error, "P2025")) {
      redirect("/admin/produk?error=delete");
    }
  }

  revalidateCatalog();
  redirect("/admin/produk?deleted=1");
}

export async function createFilterGroup(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = filterGroupCreateSchema.safeParse(
    readFilterGroupFormData(formData),
  );

  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error) };
  }

  try {
    await prisma.filterGroup.create({
      data: {
        key: parsed.data.key,
        label: parsed.data.label,
        type: parsed.data.type,
        isActive: parsed.data.isActive,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch (error) {
    return mutationError(error);
  }

  revalidateCatalog();
  redirect("/admin/filter?saved=group-created");
}

export async function updateFilterGroup(
  id: string,
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = filterGroupUpdateSchema.safeParse(
    readFilterGroupFormData(formData),
  );

  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error) };
  }

  const existing = await prisma.filterGroup.findUnique({
    where: { id },
    select: { isSystem: true },
  });

  if (!existing) {
    return { error: "Group filter tidak ditemukan." };
  }

  try {
    await prisma.filterGroup.update({
      where: { id },
      data: {
        label: parsed.data.label,
        type: existing.isSystem ? "MULTI_SELECT" : parsed.data.type,
        isActive: parsed.data.isActive,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch (error) {
    return mutationError(error);
  }

  revalidateCatalog();
  redirect("/admin/filter?saved=group-updated");
}

export async function deleteFilterGroup(id: string) {
  await requireAdmin();

  const group = await prisma.filterGroup.findUnique({
    where: { id },
    select: { isSystem: true },
  });

  if (!group) {
    redirect("/admin/filter?error=group-missing");
  }

  if (group.isSystem) {
    redirect(
      `/admin/filter?error=${encodeURIComponent("Group tag adalah filter sistem dan tidak bisa dihapus.")}`,
    );
  }

  try {
    await prisma.filterGroup.delete({ where: { id } });
  } catch (error) {
    if (!isPrismaKnownError(error, "P2025")) {
      redirect("/admin/filter?error=delete");
    }
  }

  revalidateCatalog();
  redirect("/admin/filter?deleted=group");
}

export async function createFilterOption(
  groupId: string,
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = filterOptionSchema.safeParse(
    readFilterOptionFormData(formData),
  );

  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error) };
  }

  const group = await prisma.filterGroup.findUnique({
    where: { id: groupId },
    select: { id: true },
  });

  if (!group) {
    return { error: "Group filter tidak ditemukan." };
  }

  try {
    await prisma.filterOption.create({
      data: {
        groupId,
        label: parsed.data.label,
        slug: parsed.data.slug,
        isActive: parsed.data.isActive,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch (error) {
    if (isPrismaKnownError(error, "P2002")) {
      return {
        fieldErrors: {
          slug: ["Slug opsi sudah dipakai di group ini."],
        },
      };
    }

    return mutationError(error);
  }

  revalidateCatalog();
  redirect(`/admin/filter/${groupId}?saved=option-created`);
}

export async function updateFilterOption(
  id: string,
  groupId: string,
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireAdmin();

  const parsed = filterOptionSchema.safeParse(
    readFilterOptionFormData(formData),
  );

  if (!parsed.success) {
    return { fieldErrors: flattenFieldErrors(parsed.error) };
  }

  try {
    await prisma.filterOption.update({
      where: { id },
      data: {
        label: parsed.data.label,
        slug: parsed.data.slug,
        isActive: parsed.data.isActive,
        sortOrder: parsed.data.sortOrder,
      },
    });
  } catch (error) {
    if (isPrismaKnownError(error, "P2002")) {
      return {
        fieldErrors: {
          slug: ["Slug opsi sudah dipakai di group ini."],
        },
      };
    }

    if (isPrismaKnownError(error, "P2025")) {
      return { error: "Opsi tidak ditemukan. Mungkin sudah dihapus." };
    }

    return mutationError(error);
  }

  revalidateCatalog();
  redirect(`/admin/filter/${groupId}?saved=option-updated`);
}

export async function deleteFilterOption(id: string, groupId: string) {
  await requireAdmin();

  try {
    await prisma.filterOption.delete({ where: { id } });
  } catch (error) {
    if (!isPrismaKnownError(error, "P2025")) {
      redirect(`/admin/filter/${groupId}?error=delete`);
    }
  }

  revalidateCatalog();
  redirect(`/admin/filter/${groupId}?deleted=option`);
}
