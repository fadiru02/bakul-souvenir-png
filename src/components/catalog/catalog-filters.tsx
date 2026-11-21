import Link from "next/link";
import { RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  buildCatalogHref,
  removeCatalogSelection,
} from "@/features/catalog/public-filters";
import type {
  PublicFilterGroup,
  PublicProductFilters,
  PublicProductSort,
} from "@/features/catalog/public-types";

const sortOptions: { value: PublicProductSort; label: string }[] = [
  { value: "newest", label: "Terbaru" },
  { value: "name_asc", label: "Nama A-Z" },
  { value: "price_asc", label: "Harga terendah" },
  { value: "price_desc", label: "Harga tertinggi" },
];

const priceRangeOptions = [
  { value: "all", label: "Semua harga" },
  { value: "lt25", label: "< Rp25.000" },
  { value: "25to75", label: "Rp25.000–Rp75.000" },
  { value: "gt75", label: "> Rp75.000" },
];

export function CatalogFilters({
  groups,
  filters,
}: {
  groups: PublicFilterGroup[];
  filters: PublicProductFilters;
}) {
  const activeFilters = groups.flatMap((group) =>
    (filters.selections[group.key] ?? []).flatMap((slug) => {
      const option = group.options.find((item) => item.slug === slug);
      return option ? [{ group, option }] : [];
    }),
  );

  return (
    <div className="space-y-4">
      <form
        action="/produk"
        method="get"
        className="rounded-none border border-[#8bbb92] bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <div className="flex-1 space-y-1.5">
            <label htmlFor="catalog-q" className="text-sm font-medium text-[#092328]">
              Cari produk
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#1a4241]"
                aria-hidden="true"
              />
              <Input
                id="catalog-q"
                name="q"
                type="search"
                defaultValue={filters.q}
                placeholder="Cari produk atau kategori..."
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="catalog-sort" className="text-sm font-medium text-[#092328]">
              Urutkan
            </label>
            <NativeSelect
              id="catalog-sort"
              name="sort"
              defaultValue={filters.sort}
              className="w-full lg:w-48"
            >
              {sortOptions.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="catalog-price-range"
              className="text-sm font-medium text-[#092328]"
            >
              Rentang harga
            </label>
            <NativeSelect
              id="catalog-price-range"
              name="priceRange"
              defaultValue={filters.priceRange}
              className="w-full lg:w-48"
            >
              {priceRangeOptions.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="bg-[#092328] text-white hover:bg-[#12544f]">
              <SlidersHorizontal data-icon="inline-start" aria-hidden="true" />
              Terapkan
            </Button>
            <Button asChild variant="outline" className="border-[#8bbb92]">
              <Link href="/produk">
                <RotateCcw data-icon="inline-start" aria-hidden="true" />
                Reset
              </Link>
            </Button>
          </div>
        </div>

        {groups.length > 0 ? (
          <div className="mt-5 grid gap-5 border-t border-[#8bbb92]/40 pt-5 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => {
              const selected = filters.selections[group.key] ?? [];

              return (
                <fieldset key={group.id} className="min-w-0">
                  <legend className="mb-2 text-sm font-medium text-[#092328]">
                    {group.label}
                  </legend>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {group.type === "SINGLE_SELECT" ? (
                      <label className="flex cursor-pointer items-center gap-2 text-sm text-[#1a4241]">
                        <input
                          type="radio"
                          name={group.key}
                          value=""
                          defaultChecked={selected.length === 0}
                          className="size-4 accent-[#12544f]"
                        />
                        Semua
                      </label>
                    ) : null}

                    {group.options.map((option) => (
                      <label
                        key={option.id}
                        className="flex cursor-pointer items-center gap-2 text-sm text-[#092328]"
                      >
                        <input
                          type={
                            group.type === "SINGLE_SELECT" ? "radio" : "checkbox"
                          }
                          name={group.key}
                          value={option.slug}
                          defaultChecked={selected.includes(option.slug)}
                          className="size-4 accent-[#12544f]"
                        />
                        {option.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
            })}
          </div>
        ) : null}
      </form>

      {filters.q || activeFilters.length > 0 || filters.priceRange !== "all" ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-[#1a4241]">Filter aktif:</span>

          {filters.q ? (
            <Badge asChild variant="outline" className="border-[#8bbb92]">
              <Link
                href={buildCatalogHref(filters, { q: "", page: 1 })}
                aria-label={`Hapus pencarian ${filters.q}`}
              >
                Cari: {filters.q}
                <X aria-hidden="true" />
              </Link>
            </Badge>
          ) : null}

          {filters.priceRange !== "all" ? (
            <Badge asChild variant="outline" className="border-[#8bbb92]">
              <Link
                href={buildCatalogHref(filters, { priceRange: "all", page: 1 })}
                aria-label="Hapus filter harga"
              >
                Harga: {priceRangeOptions.find((o) => o.value === filters.priceRange)?.label}
                <X aria-hidden="true" />
              </Link>
            </Badge>
          ) : null}

          {activeFilters.map(({ group, option }) => (
            <Badge
              key={`${group.key}:${option.slug}`}
              asChild
              variant="secondary"
              className="bg-[#d8d2c6] text-[#092328]"
            >
              <Link
                href={removeCatalogSelection(filters, group.key, option.slug)}
                aria-label={`Hapus filter ${group.label}: ${option.label}`}
              >
                {group.label}: {option.label}
                <X aria-hidden="true" />
              </Link>
            </Badge>
          ))}

          <Link
            href="/produk"
            className="text-sm text-[#1a4241] underline-offset-4 hover:text-[#092328] hover:underline"
          >
            Hapus semua
          </Link>
        </div>
      ) : null}
    </div>
  );
}