"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LoaderCircle, RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import type { FilterOptionSummary } from "@/features/catalog/types";

const statusOptions = [
  { value: "ALL", label: "Semua status" },
  { value: "DRAFT", label: "Draft" },
  { value: "ACTIVE", label: "Aktif" },
  { value: "ARCHIVED", label: "Diarsipkan" },
];

const sortOptions = [
  { value: "updated_desc", label: "Terakhir diubah" },
  { value: "name_asc", label: "Nama A-Z" },
  { value: "price_asc", label: "Harga terendah" },
  { value: "price_desc", label: "Harga tertinggi" },
];

export function ProductFilters({
  tags,
}: {
  tags: FilterOptionSummary[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [isPending, startTransition] = useTransition();

  const navigate = useCallback(
    (params: URLSearchParams) => {
      params.delete("saved");
      params.delete("deleted");
      params.delete("error");
      const nextQuery = params.toString();
      startTransition(() => {
        router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
          scroll: false,
        });
      });
    },
    [pathname, router],
  );

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value && !(key === "status" && value === "ALL")) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      params.delete("page");
      navigate(params);
    },
    [navigate, searchParams],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentQuery = searchParams.get("q") ?? "";

      if (query === currentQuery) {
        return;
      }

      const params = new URLSearchParams(searchParams.toString());

      if (query.trim()) {
        params.set("q", query.trim());
      } else {
        params.delete("q");
      }

      params.delete("page");
      navigate(params);
    }, 350);

    return () => clearTimeout(timeout);
  }, [navigate, query, searchParams]);

  const hasFilters =
    Boolean(searchParams.get("q")) ||
    Boolean(searchParams.get("status")) ||
    Boolean(searchParams.get("tag")) ||
    Boolean(searchParams.get("sort"));

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 lg:flex-row lg:items-center">
      <form
        className="relative min-w-0 flex-1"
        onSubmit={(event) => {
          event.preventDefault();
          const params = new URLSearchParams(searchParams.toString());

          if (query.trim()) {
            params.set("q", query.trim());
          } else {
            params.delete("q");
          }

          params.delete("page");
          navigate(params);
        }}
      >
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari nama, slug, atau deskripsi..."
          className="pl-9"
          aria-label="Cari produk"
        />
      </form>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex">
        <NativeSelect
          value={searchParams.get("status") ?? "ALL"}
          onChange={(event) => updateParam("status", event.target.value)}
          aria-label="Filter status"
          className="w-full lg:w-36"
        >
          {statusOptions.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect
          value={searchParams.get("tag") ?? ""}
          onChange={(event) => updateParam("tag", event.target.value)}
          aria-label="Filter tag"
          className="w-full lg:w-36"
        >
          <NativeSelectOption value="">Semua tag</NativeSelectOption>
          {tags.map((tag) => (
            <NativeSelectOption key={tag.id} value={tag.slug}>
              {tag.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <NativeSelect
          value={searchParams.get("sort") ?? "updated_desc"}
          onChange={(event) => updateParam("sort", event.target.value)}
          aria-label="Urutkan produk"
          className="w-full lg:w-44"
        >
          {sortOptions.map((option) => (
            <NativeSelectOption key={option.value} value={option.value}>
              {option.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>

        <div className="flex items-center gap-2">
          {isPending ? (
            <LoaderCircle
              className="size-4 animate-spin text-muted-foreground"
              aria-label="Memuat"
            />
          ) : null}
          {hasFilters ? (
            <Button variant="outline" size="sm" asChild>
              <Link href={pathname}>
                <RotateCcw aria-hidden="true" />
                Reset
              </Link>
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
