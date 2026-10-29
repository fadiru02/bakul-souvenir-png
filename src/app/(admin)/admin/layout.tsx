import type { Metadata } from "next";
import { connection } from "next/server";

import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdmin } from "@/features/auth/dal";

export const instant = false;

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Bakul Souvenir Admin",
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();
  const user = await requireAdmin();

  return <AdminShell user={user}>{children}</AdminShell>;
}
