import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import { CatalogSkeleton } from "@/components/catalog/catalog-skeleton";
import { ProductCard } from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { parsePublicProductFilters } from "@/features/catalog/public-filters";
import {
  getPublicFilterGroups,
  listPublicProducts,
} from "@/features/catalog/public-repository";

export const metadata: Metadata = {
  title: "Katalog Souvenir Custom",
  description:
    "Jelajahi koleksi souvenir custom Bakul Souvenir untuk kantor, pernikahan, komunitas, dan hadiah spesial.",
  alternates: { canonical: "/produk" },
};

async function CatalogContent({
  searchParams,
}: Pick<PageProps<"/produk">, "searchParams">) {
  const params = await searchParams;
  const groups = await getPublicFilterGroups();
  const filters = parsePublicProductFilters(params, groups);
  const list = await listPublicProducts(filters);
  const hasFilters =
    Boolean(filters.q) || Object.keys(filters.selections).length > 0;

  return (
    <>
      <CatalogFilters groups={groups} filters={filters} />

      <div className="mt-8">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            {list.total} produk ditemukan
          </p>
          {filters.q ? (
            <p className="text-sm text-muted-foreground">
              Hasil untuk “{filters.q}”
            </p>
          ) : null}
        </div>

        {list.items.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {list.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Empty className="border bg-card p-10">
            <EmptyMedia variant="icon">
              <RotateCcw aria-hidden="true" />
            </EmptyMedia>
            <EmptyHeader>
              <EmptyTitle>Produk tidak ditemukan</EmptyTitle>
              <EmptyDescription>
                {hasFilters
                  ? "Coba kata kunci lain atau hapus sebagian filter yang sedang aktif."
                  : "Belum ada produk aktif yang bisa ditampilkan saat ini."}
              </EmptyDescription>
            </EmptyHeader>
            {hasFilters ? (
              <EmptyContent>
                <Button asChild variant="outline">
                  <Link href="/produk">
                    <RotateCcw data-icon="inline-start" aria-hidden="true" />
                    Reset filter
                  </Link>
                </Button>
              </EmptyContent>
            ) : null}
          </Empty>
        )}

        <div className="mt-8">
          <CatalogPagination filters={filters} list={list} />
        </div>
      </div>
    </>
  );
}

export default function PublicProductsPage({
  searchParams,
}: PageProps<"/produk">) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
      <div className="mb-8 max-w-2xl space-y-3">
        <p className="text-sm font-medium text-primary">Katalog</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Souvenir custom untuk setiap momen
        </h1>
        <p className="text-muted-foreground">
          Temukan produk yang cocok untuk acara, komunitas, atau hadiah spesial.
          Gunakan pencarian dan filter untuk mempersempit pilihan.
        </p>
      </div>

      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
