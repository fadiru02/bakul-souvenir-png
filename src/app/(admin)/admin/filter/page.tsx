import type { Metadata } from "next";
import { connection } from "next/server";

import { FilterGroupDialog } from "@/components/admin/filter-group-dialog";
import { FilterGroupTable } from "@/components/admin/filter-group-table";
import { FlashMessage } from "@/components/admin/flash-message";
import { PageHeader } from "@/components/admin/page-header";
import { listFilterGroups } from "@/features/catalog/admin-repository";

export const instant = false;

export const metadata: Metadata = {
  title: "Filter",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getFlash(params: Record<string, string | string[] | undefined>) {
  const saved = first(params.saved);
  const deleted = first(params.deleted);
  const error = first(params.error);

  if (saved === "group-created") {
    return { message: "Group filter berhasil ditambahkan." };
  }

  if (saved === "group-updated") {
    return { message: "Group filter berhasil diperbarui." };
  }

  if (deleted === "group") {
    return { message: "Group filter berhasil dihapus." };
  }

  if (error) {
    return {
      message: error,
      variant: "destructive" as const,
    };
  }

  return null;
}

export default async function FilterPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  await connection();
  const groups = await listFilterGroups();
  const flash = getFlash(params);

  return (
    <>
      <PageHeader
        title="Filter"
        description="Atur group dan opsi filter yang bisa dipilih pada produk."
        actions={<FilterGroupDialog />}
      />

      {flash ? (
        <FlashMessage message={flash.message} variant={flash.variant} />
      ) : null}

      <FilterGroupTable groups={groups} />
    </>
  );
}
