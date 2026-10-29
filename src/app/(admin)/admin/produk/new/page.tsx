import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";
import { Button } from "@/components/ui/button";
import { listGroupsWithOptions } from "@/features/catalog/admin-repository";

export const instant = false;

export const metadata: Metadata = {
  title: "Tambah Produk",
};

export default async function NewProductPage() {
  await connection();
  const groups = await listGroupsWithOptions();

  return (
    <>
      <PageHeader
        title="Tambah produk"
        description="Isi informasi produk dan pilih filter yang sesuai."
        actions={
          <Button variant="outline" asChild>
            <Link href="/admin/produk">
              <ArrowLeft aria-hidden="true" />
              Kembali
            </Link>
          </Button>
        }
      />
      <ProductForm groups={groups} />
    </>
  );
}
