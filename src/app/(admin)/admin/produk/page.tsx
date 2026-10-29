import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Plus } from "lucide-react";

import { AdminPagination } from "@/components/admin/pagination";
import { FlashMessage } from "@/components/admin/flash-message";
import { PageHeader } from "@/components/admin/page-header";
import { ProductFilters } from "@/components/admin/product-filters";
import { ProductTable } from "@/components/admin/product-table";
import { Button } from "@/components/ui/button";
import {
  listAdminProducts,
  listTagOptions,
} from "@/features/catalog/admin-repository";
import { parseAdminProductFilters } from "@/features/catalog/admin-filters";

export const instant = false;

export const metadata: Metadata = {
  title: "Produk",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getFlash(params: Record<string, string | string[] | undefined>) {
  const saved = first(params.saved);
  const deleted = first(params.deleted);
  const error = first(params.error);

  if (saved === "created") {
    return { message: "Produk baru berhasil ditambahkan." };
  }

  if (saved === "updated") {
    return { message: "Perubahan produk berhasil disimpan." };
  }

  if (deleted) {
    return { message: "Produk berhasil dihapus." };
  }

  if (error) {
    return {
      message: "Produk tidak dapat dihapus. Coba lagi.",
      variant: "destructive" as const,
    };
  }

  return null;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseAdminProductFilters(params);
  await connection();
  const [productList, tags] = await Promise.all([
    listAdminProducts(filters),
    listTagOptions(),
  ]);
  const flash = getFlash(params);

  return (
    <>
      <PageHeader
        title="Produk"
        description="Kelola katalog, harga, status, dan filter produk."
        actions={
          <Button asChild>
            <Link href="/admin/produk/new">
              <Plus aria-hidden="true" />
              Tambah produk
            </Link>
          </Button>
        }
      />

      {flash ? (
        <FlashMessage message={flash.message} variant={flash.variant} />
      ) : null}

      <ProductFilters tags={tags} />
      <ProductTable products={productList.items} />
      <AdminPagination
        basePath="/admin/produk"
        params={params}
        page={productList.page}
        totalPages={productList.totalPages}
        totalItems={productList.total}
      />
    </>
  );
}
