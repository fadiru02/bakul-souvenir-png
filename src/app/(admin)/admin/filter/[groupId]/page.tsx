import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { FilterOptionDialog } from "@/components/admin/filter-option-dialog";
import { FilterOptionTable } from "@/components/admin/filter-option-table";
import { FlashMessage } from "@/components/admin/flash-message";
import { PageHeader } from "@/components/admin/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFilterGroupDetail } from "@/features/catalog/admin-repository";

export const instant = false;

export const metadata: Metadata = {
  title: "Kelola Opsi Filter",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function FilterDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ groupId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ groupId }, query] = await Promise.all([params, searchParams]);
  await connection();
  const group = await getFilterGroupDetail(groupId);

  if (!group) {
    notFound();
  }

  const saved = first(query.saved);
  const deleted = first(query.deleted);
  const error = first(query.error);
  const flash =
    saved === "option-created"
      ? { message: "Opsi filter berhasil ditambahkan." }
      : saved === "option-updated"
        ? { message: "Opsi filter berhasil diperbarui." }
        : deleted === "option"
          ? { message: "Opsi filter berhasil dihapus." }
          : error
            ? { message: error, variant: "destructive" as const }
            : null;

  return (
    <>
      <PageHeader
        title={group.label}
        description={`Kelola opsi untuk group filter ${group.key}.`}
        actions={
          <>
            <Button variant="outline" asChild>
              <Link href="/admin/filter">
                <ArrowLeft aria-hidden="true" />
                Kembali
              </Link>
            </Button>
            <FilterOptionDialog
              groupId={group.id}
              groupLabel={group.label}
            />
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Badge variant="outline" className="font-mono">
          {group.key}
        </Badge>
        <Badge variant="secondary">
          {group.type === "MULTI_SELECT"
            ? "Banyak pilihan"
            : "Satu pilihan"}
        </Badge>
        <span>{group.optionCount} opsi</span>
        {group.isSystem ? (
          <Badge variant="secondary">Group sistem · tidak bisa dihapus</Badge>
        ) : null}
      </div>

      {flash ? (
        <FlashMessage message={flash.message} variant={flash.variant} />
      ) : null}

      <FilterOptionTable group={group} />
    </>
  );
}
