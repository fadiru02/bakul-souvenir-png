import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buildCatalogHref } from "@/features/catalog/public-filters";
import type {
  PublicProductFilters,
  PublicProductList,
} from "@/features/catalog/public-types";

export function CatalogPagination({
  filters,
  list,
}: {
  filters: PublicProductFilters;
  list: PublicProductList;
}) {
  if (list.total === 0) {
    return null;
  }

  const pages = Array.from({ length: list.totalPages }, (_, index) => index + 1);

  return (
    <div className="flex flex-col gap-3 border-t border-[#8bbb92]/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-[#1a4241]">
        Menampilkan {(list.page - 1) * list.pageSize + 1}–
        {Math.min(list.page * list.pageSize, list.total)} dari {list.total} produk
      </p>

      <div className="flex items-center gap-2">
        {list.page > 1 ? (
          <Button asChild variant="outline" size="sm" className="border-[#8bbb92]">
            <Link href={buildCatalogHref(filters, { page: list.page - 1 })}>
              <ChevronLeft data-icon="inline-start" aria-hidden="true" />
              Prev
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled className="border-[#8bbb92]">
            <ChevronLeft data-icon="inline-start" aria-hidden="true" />
            Prev
          </Button>
        )}

        <div className="flex items-center gap-1">
          {pages.map((page) => (
            <Button
              key={page}
              asChild={page !== list.page}
              variant={page === list.page ? "default" : "outline"}
              size="sm"
              className={
                page === list.page
                  ? "bg-[#092328] text-white hover:bg-[#12544f]"
                  : "border-[#8bbb92] text-[#092328] hover:bg-[#8bbb92]"
              }
            >
              {page === list.page ? (
                <span>{page}</span>
              ) : (
                <Link href={buildCatalogHref(filters, { page })}>{page}</Link>
              )}
            </Button>
          ))}
        </div>

        {list.page < list.totalPages ? (
          <Button asChild variant="outline" size="sm" className="border-[#8bbb92]">
            <Link href={buildCatalogHref(filters, { page: list.page + 1 })}>
              Next
              <ChevronRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled className="border-[#8bbb92]">
            Next
            <ChevronRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
}