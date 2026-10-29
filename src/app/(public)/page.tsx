import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Gift,
  HandHeart,
  PackageCheck,
  Palette,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Souvenir Custom untuk Momen Berharga",
};

const highlights = [
  {
    title: "Custom sesuai kebutuhan",
    description:
      "Pilih produk, bahan, warna, dan detail cetak yang paling cocok untuk acara atau brand Anda.",
    icon: Palette,
  },
  {
    title: "Dikerjakan dengan teliti",
    description:
      "Setiap pesanan disiapkan dengan perhatian pada detail, dari pemilihan bahan sampai finishing.",
    icon: HandHeart,
  },
  {
    title: "Harga jelas dan transparan",
    description:
      "Harga ditampilkan dalam Rupiah tanpa biaya tersembunyi, sehingga mudah disesuaikan dengan anggaran.",
    icon: BadgeCheck,
  },
];

const occasions = [
  "Souvenir kantor",
  "Pernikahan",
  "Hadiah premium",
  "Acara komunitas",
];

export default function PublicHomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-muted/30">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-muted/80 via-background to-background" />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Souvenir custom untuk momen spesial
            </Badge>

            <div className="space-y-4">
              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Souvenir yang membuat momen dan brand Anda lebih berkesan.
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Bakul Souvenir membantu Anda menyiapkan souvenir custom untuk
                kantor, pernikahan, komunitas, dan hadiah spesial. Pilih produk,
                sesuaikan detailnya, lalu biarkan kami menyiapkan sisanya.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/produk">
                  Jelajahi katalog
                  <ArrowRight data-icon="inline-end" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/#tentang">Kenali Bakul Souvenir</Link>
              </Button>
            </div>
          </div>

          <Card className="border-primary/15 bg-primary text-primary-foreground shadow-xl shadow-primary/10">
            <CardHeader>
              <CardTitle className="text-base font-medium text-primary-foreground/80">
                Satu tempat untuk souvenir yang berkesan
              </CardTitle>
              <CardDescription className="text-primary-foreground/70">
                Dari kebutuhan kantor sampai momen personal, semuanya bisa
                disesuaikan.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: Gift,
                  title: "Pilihan produk beragam",
                  description:
                    "Tote bag, mug, tumbler, pouch, dan masih banyak lagi.",
                },
                {
                  icon: PackageCheck,
                  title: "Siap untuk pesanan rombongan",
                  description:
                    "Cocok untuk souvenir acara, hadiah klien, dan hampers.",
                },
                {
                  icon: HandHeart,
                  title: "Dikerjakan lokal",
                  description:
                    "Melibatkan pengrajin lokal dengan sentuhan handmade.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                    <item.icon className="size-4" aria-hidden="true" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm leading-6 text-primary-foreground/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        id="tentang"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20"
      >
        <div className="max-w-2xl space-y-3">
          <Badge variant="outline">Tentang kami</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Souvenir yang dibuat dengan teliti, bukan sekadar jadi.
          </h2>
          <p className="text-base leading-7 text-muted-foreground">
            Kami percaya souvenir yang baik bukan hanya tentang barang yang
            diberikan, tetapi juga kesan yang tertinggal. Karena itu, setiap
            detail pesanan kami siapkan agar sesuai dengan cerita dan kebutuhan
            Anda.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {highlights.map((highlight) => (
            <Card key={highlight.title}>
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
                  <highlight.icon className="size-5" aria-hidden="true" />
                </div>
                <CardTitle>{highlight.title}</CardTitle>
                <CardDescription className="leading-6">
                  {highlight.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Untuk setiap momen yang ingin dikenang
            </h2>
            <p className="text-sm text-muted-foreground">
              Mulai dari kebutuhan profesional sampai perayaan personal.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {occasions.map((occasion) => (
              <Badge key={occasion} variant="secondary">
                {occasion}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20">
        <Card className="bg-muted/40">
          <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Siap membuat souvenir yang berkesan?
              </h2>
              <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                Jelajahi katalog produk kami, gunakan filter untuk menemukan
                pilihan yang tepat, lalu sampaikan kebutuhan custom Anda.
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/produk">
                Buka katalog
                <ArrowRight data-icon="inline-end" aria-hidden="true" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
