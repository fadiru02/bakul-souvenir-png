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

  const from = (list.page - 1) * list.pageSize + 1;
  const to = Math.min(list.page * list.pageSize, list.total);

  return (
    <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Menampilkan {from}–{to} dari {list.total} produk
      </p>

      <div className="flex items-center gap-2">
        {list.page > 1 ? (
          <Button asChild variant="outline" size="sm">
            <Link href={buildCatalogHref(filters, { page: list.page - 1 })}>
              <ChevronLeft data-icon="inline-start" aria-hidden="true" />
              Sebelumnya
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            <ChevronLeft data-icon="inline-start" aria-hidden="true" />
            Sebelumnya
          </Button>
        )}

        <span className="px-1 text-sm text-muted-foreground">
          Halaman {list.page} dari {list.totalPages}
        </span>

        {list.page < list.totalPages ? (
          <Button asChild variant="outline" size="sm">
            <Link href={buildCatalogHref(filters, { page: list.page + 1 })}>
              Berikutnya
              <ChevronRight data-icon="inline-end" aria-hidden="true" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" size="sm" disabled>
            Berikutnya
            <ChevronRight data-icon="inline-end" aria-hidden="true" />
          </Button>
        )}
      </div>
    </div>
  );
}
