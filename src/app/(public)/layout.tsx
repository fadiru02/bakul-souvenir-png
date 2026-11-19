import type { Metadata } from "next";

import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Katalog Souvenir Custom",
    template: "%s | Bakul Souvenir",
  },
  description:
    "Bakul Souvenir menyediakan souvenir custom untuk kantor, pernikahan, dan hadiah spesial dengan harga yang jelas.",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="public-theme flex min-h-svh flex-col bg-background text-foreground">
      <PublicHeader />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}