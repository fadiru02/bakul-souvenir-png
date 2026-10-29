import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AdminNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <SearchX className="size-6" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Data tidak ditemukan</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Halaman atau data yang kamu cari mungkin sudah dihapus atau alamatnya
          salah.
        </p>
      </div>
      <Button asChild>
        <Link href="/admin/produk">Kembali ke produk</Link>
      </Button>
    </div>
  );
}
