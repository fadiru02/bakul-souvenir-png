import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/features/catalog/actions";
import {
  getProductFormValues,
  listGroupsWithOptions,
} from "@/features/catalog/admin-repository";

export const instant = false;

export const metadata: Metadata = {
  title: "Edit Produk",
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await connection();
  const [product, groups] = await Promise.all([
    getProductFormValues(id),
    listGroupsWithOptions(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <>
      <PageHeader
        title="Edit produk"
        description={product.name}
        actions={
          <>
            <Button variant="outline" asChild>
              <Link href="/admin/produk">
                <ArrowLeft aria-hidden="true" />
                Kembali
              </Link>
            </Button>
            <DeleteDialog
              action={deleteProduct.bind(null, product.id)}
              title="Hapus produk?"
              description={`"${product.name}" akan dihapus permanen beserta semua nilai filternya. Tindakan ini tidak dapat dibatalkan.`}
              triggerLabel="Hapus"
            />
          </>
        }
      />
      <ProductForm product={product} groups={groups} />
    </>
  );
}
