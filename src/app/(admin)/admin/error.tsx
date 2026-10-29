"use client";

import { CircleAlert, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="flex size-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
        <CircleAlert className="size-6" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Terjadi kesalahan</h2>
        <p className="max-w-md text-sm text-muted-foreground">
          Data admin gagal dimuat. Coba muat ulang halaman. Jika masalah
          berlanjut, periksa koneksi database dan log server.
        </p>
        {error.digest ? (
          <p className="font-mono text-xs text-muted-foreground">
            Kode: {error.digest}
          </p>
        ) : null}
      </div>
      <Button type="button" variant="outline" onClick={reset}>
        <RotateCcw aria-hidden="true" />
        Coba lagi
      </Button>
    </div>
  );
}
