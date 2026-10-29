import Link from "next/link";
import { PackageOpen } from "lucide-react";

import { ProductRowActions } from "@/components/admin/product-row-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime, formatRupiah } from "@/features/catalog/service";
import type { AdminProductRow, AdminProductStatus } from "@/features/catalog/types";

const statusLabel: Record<AdminProductStatus, string> = {
  DRAFT: "Draft",
  ACTIVE: "Aktif",
  ARCHIVED: "Diarsipkan",
};

const statusClass: Record<AdminProductStatus, string> = {
  DRAFT: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  ACTIVE: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  ARCHIVED: "bg-muted text-muted-foreground",
};

export function ProductTable({ products }: { products: AdminProductRow[] }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PackageOpen aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>Belum ada produk yang cocok</EmptyTitle>
            <EmptyDescription>
              Ubah kata kunci atau filter, atau tambahkan produk baru.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/admin/produk/new">Tambah produk</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow>
              <TableHead>Produk</TableHead>
              <TableHead className="w-36">Harga</TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead className="w-40">Diperbarui</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="min-w-0">
                    <Link
                      href={`/admin/produk/${product.id}/edit`}
                      className="font-medium hover:underline"
                    >
                      {product.name}
                    </Link>
                    <p className="truncate text-xs text-muted-foreground">
                      /{product.slug}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {formatRupiah(product.price)}
                </TableCell>
                <TableCell>
                  <Badge className={statusClass[product.status]}>
                    {statusLabel[product.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {product.tags.length === 0 ? (
                      <span className="text-xs text-muted-foreground">
                        Tanpa tag
                      </span>
                    ) : (
                      product.tags.map((tag) => (
                        <Badge key={tag.id} variant="outline">
                          {tag.label}
                        </Badge>
                      ))
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {formatDateTime(product.updatedAt)}
                </TableCell>
                <TableCell>
                  <ProductRowActions
                    productId={product.id}
                    productName={product.name}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
