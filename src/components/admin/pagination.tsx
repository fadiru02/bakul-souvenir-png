import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function buildHref(
  basePath: string,
  params: Record<string, string | string[] | undefined>,
  page: number,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (
      key === "page" ||
      key === "saved" ||
      key === "deleted" ||
      key === "error" ||
      value == null
    ) {
      continue;
    }

    const first = Array.isArray(value) ? value[0] : value;

    if (first) {
      searchParams.set(key, first);
    }
  }

  if (page > 1) {
    searchParams.set("page", String(page));
  }

  const query = searchParams.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function AdminPagination({
  basePath,
  params,
  page,
  totalPages,
  totalItems,
}: {
  basePath: string;
  params: Record<string, string | string[] | undefined>;
  page: number;
  totalPages: number;
  totalItems: number;
}) {
  if (totalItems === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3 border-t px-4 py-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>
        Halaman {page} dari {totalPages} · {totalItems} data
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon-sm" asChild>
          <Link
            href={buildHref(basePath, params, 1)}
            aria-label="Halaman pertama"
            aria-disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          >
            <ChevronsLeft aria-hidden="true" />
          </Link>
        </Button>
        <Button variant="outline" size="icon-sm" asChild>
          <Link
            href={buildHref(basePath, params, Math.max(1, page - 1))}
            aria-label="Halaman sebelumnya"
            aria-disabled={page <= 1}
            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
          >
            <ChevronLeft aria-hidden="true" />
          </Link>
        </Button>
        <Button variant="outline" size="icon-sm" asChild>
          <Link
            href={buildHref(basePath, params, Math.min(totalPages, page + 1))}
            aria-label="Halaman berikutnya"
            aria-disabled={page >= totalPages}
            className={
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          >
            <ChevronRight aria-hidden="true" />
          </Link>
        </Button>
        <Button variant="outline" size="icon-sm" asChild>
          <Link
            href={buildHref(basePath, params, totalPages)}
            aria-label="Halaman terakhir"
            aria-disabled={page >= totalPages}
            className={
              page >= totalPages ? "pointer-events-none opacity-50" : ""
            }
          >
            <ChevronsRight aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
