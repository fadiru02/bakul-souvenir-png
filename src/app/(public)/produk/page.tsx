import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { CatalogPagination } from "@/components/catalog/catalog-pagination";
import { CatalogSkeleton } from "@/components/catalog/catalog-skeleton";
import { ProductCard } from "@/components/catalog/product-card";
import { ContactLocationSection } from "@/components/public/contact-location";
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
  title: "Katalog Lengkap Souvenir",
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
    Boolean(filters.q) ||
    filters.priceRange !== "all" ||
    Object.keys(filters.selections).length > 0;

  return (
    <>
      <CatalogFilters groups={groups} filters={filters} />

      <div className="mt-8">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm font-medium text-[#092328]">
            <span className="font-semibold">{list.total}</span> produk ditemukan
          </p>
          {filters.q ? (
            <p className="text-sm text-[#1a4241]">
              Hasil untuk “{filters.q}”
            </p>
          ) : null}
        </div>

        {list.items.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {list.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Empty className="border border-[#8bbb92] bg-white p-10">
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
                <Button asChild variant="outline" className="border-[#8bbb92]">
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
    <div className="bg-[#ece5dd]">
      {/* Catalog hero */}
      <section className="border-b border-[#8bbb92]/40 bg-[#12544f]">
        <div className="mx-auto max-w-[1240px] px-5 py-12 md:px-8 md:py-16">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#8bbb92]">
            Semua koleksi
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Katalog Lengkap Souvenir
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80">
            Jelajahi koleksi vandel, plakat, ganci, jam, dan signage yang dapat disesuaikan
            untuk berbagai kebutuhan.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1240px] px-5 py-12 sm:py-16 md:px-8">
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogContent searchParams={searchParams} />
        </Suspense>
      </section>

      <ContactLocationSection />
    </div>
  );
}