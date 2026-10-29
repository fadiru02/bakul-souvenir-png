import Link from "next/link";
import { ListTree, SlidersHorizontal } from "lucide-react";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import { FilterGroupDialog } from "@/components/admin/filter-group-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
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
import { deleteFilterGroup } from "@/features/catalog/actions";
import type { FilterGroupRow } from "@/features/catalog/types";

export function FilterGroupTable({ groups }: { groups: FilterGroupRow[] }) {
  if (groups.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <SlidersHorizontal aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>Belum ada group filter</EmptyTitle>
            <EmptyDescription>
              Tambahkan group seperti warna atau bahan untuk mulai mengelola
              filter produk.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead>Group</TableHead>
              <TableHead className="w-40">Tipe</TableHead>
              <TableHead className="w-28">Opsi</TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead className="w-36 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{group.label}</span>
                    {group.isSystem ? (
                      <Badge variant="secondary">Sistem</Badge>
                    ) : null}
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">
                    {group.key}
                  </p>
                </TableCell>
                <TableCell className="text-sm">
                  {group.type === "MULTI_SELECT"
                    ? "Banyak pilihan"
                    : "Satu pilihan"}
                </TableCell>
                <TableCell className="text-sm">{group.optionCount}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      group.isActive
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {group.isActive ? "Aktif" : "Nonaktif"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <FilterGroupDialog group={group} />
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/filter/${group.id}`}>
                        <ListTree aria-hidden="true" />
                        Opsi
                      </Link>
                    </Button>
                    {group.isSystem ? null : (
                      <DeleteDialog
                        action={deleteFilterGroup.bind(null, group.id)}
                        title="Hapus group filter?"
                        description={`Group "${group.label}" beserta ${group.optionCount} opsi dan semua nilai filter produk yang memakainya akan dihapus. Tindakan ini tidak dapat dibatalkan.`}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
