import { ListChecks } from "lucide-react";

import { DeleteDialog } from "@/components/admin/delete-dialog";
import { FilterOptionDialog } from "@/components/admin/filter-option-dialog";
import { Badge } from "@/components/ui/badge";
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
import { deleteFilterOption } from "@/features/catalog/actions";
import type {
  FilterGroupDetail,
  FilterOptionRow,
} from "@/features/catalog/types";

export function FilterOptionTable({ group }: { group: FilterGroupDetail }) {
  if (group.options.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ListChecks aria-hidden="true" />
            </EmptyMedia>
            <EmptyTitle>Belum ada opsi</EmptyTitle>
            <EmptyDescription>
              Tambahkan opsi pertama untuk group {group.label}.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <Table className="min-w-[640px]">
          <TableHeader>
            <TableRow>
              <TableHead>Opsi</TableHead>
              <TableHead className="w-40">Dipakai</TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead className="w-28 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {group.options.map((option: FilterOptionRow) => (
              <TableRow key={option.id}>
                <TableCell>
                  <p className="font-medium">{option.label}</p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {option.slug}
                  </p>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {option.productCount} produk
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      option.isActive
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {option.isActive ? "Aktif" : "Nonaktif"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <FilterOptionDialog
                      groupId={group.id}
                      groupLabel={group.label}
                      option={option}
                    />
                    <DeleteDialog
                      action={deleteFilterOption.bind(
                        null,
                        option.id,
                        group.id,
                      )}
                      title="Hapus opsi filter?"
                      description={
                        option.productCount > 0
                          ? `Opsi "${option.label}" dipakai oleh ${option.productCount} produk. Nilai filter pada produk tersebut akan ikut terhapus.`
                          : `Opsi "${option.label}" akan dihapus permanen.`
                      }
                    />
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
