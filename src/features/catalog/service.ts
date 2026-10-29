import "server-only";

import { prisma } from "@/lib/prisma";

export function isPrismaKnownError(
  error: unknown,
  code: "P2002" | "P2025",
): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === code
  );
}

export async function validateProductOptions(optionIds: string[]) {
  const uniqueIds = [...new Set(optionIds)];

  if (uniqueIds.length === 0) {
    return { ok: true as const, optionIds: uniqueIds };
  }

  const options = await prisma.filterOption.findMany({
    where: { id: { in: uniqueIds } },
    select: {
      id: true,
      group: {
        select: {
          id: true,
          type: true,
        },
      },
    },
  });

  if (options.length !== uniqueIds.length) {
    return {
      ok: false as const,
      message: "Ada filter yang tidak ditemukan. Muat ulang halaman lalu coba lagi.",
    };
  }

  const selectedByGroup = new Map<string, number>();

  for (const option of options) {
    const count = selectedByGroup.get(option.group.id) ?? 0;
    selectedByGroup.set(option.group.id, count + 1);

    if (option.group.type === "SINGLE_SELECT" && count >= 1) {
      return {
        ok: false as const,
        message: "Setiap filter dengan tipe pilihan tunggal hanya boleh diisi satu opsi.",
      };
    }
  }

  return { ok: true as const, optionIds: uniqueIds };
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(value);
}
