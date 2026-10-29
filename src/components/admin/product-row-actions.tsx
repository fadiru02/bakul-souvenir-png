"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/features/catalog/actions";
import { DeleteDialog } from "@/components/admin/delete-dialog";

export function ProductRowActions({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button variant="ghost" size="icon-sm" asChild>
        <Link
          href={`/admin/produk/${productId}/edit`}
          aria-label={`Edit ${productName}`}
        >
          <Pencil aria-hidden="true" />
        </Link>
      </Button>
      <DeleteDialog
        action={deleteProduct.bind(null, productId)}
        title="Hapus produk?"
        description={`"${productName}" akan dihapus permanen beserta semua nilai filternya. Tindakan ini tidak dapat dibatalkan.`}
      />
    </div>
  );
}
