import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  HandHeart,
  MessageCircle,
  PackageCheck,
  Palette,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/public/image-placeholder";
import { ContactLocationSection } from "@/components/public/contact-location";
import { ProductCard } from "@/components/catalog/product-card";
import { listPublicProducts } from "@/features/catalog/public-repository";

export const metadata: Metadata = {
  title: "Souvenir Custom untuk Momen Berharga",
};

const benefits = ["Bisa custom", "Harga grosir", "Kirim se-Indonesia"];

const stats = [
  { value: "500+", label: "Produk dibuat", icon: PackageCheck },
  { value: "200+", label: "Pelanggan bahagia", icon: BadgeCheck },
  { value: "50+", label: "Pilihan desain", icon: Palette },
  { value: "38", label: "Kota terjangkau", icon: HandHeart },
];

const portfolio = [
  {
    title: "Pernikahan Nadia & Arif",
    tag: "Wedding • 350 pcs",
    quote: "Tamu suka sekali, semua detail nama tercetak rapi.",
    variant: "teal" as const,
  },
  {
    title: "Gathering Tim Nusantara",
    tag: "Corporate • 500 pcs",
    quote: "Selesai sesuai deadline dan pengemasan sangat aman.",
    variant: "dark" as const,
  },
  {
    title: "Wisuda Angkatan 2025",
    tag: "Graduation • 180 pcs",
    quote: "Desain custom-nya membuat kenang-kenangan makin spesial.",
    variant: "sage" as const,
  },
];

const testimonials = [
  {
    quote:
      "Hasilnya lebih cantik dari ekspektasi. Detail nama custom-nya rapi dan semua tamu suka!",
    name: "Nadia A.",
    type: "Souvenir Pernikahan",
  },
  {
    quote:
      "Admin sangat membantu dari pilih desain sampai pengiriman. Datang tepat waktu dan aman.",
    name: "Maya Putri",
    type: "Hampers Ulang Tahun",
  },
  {
    quote:
      "Sudah tiga kali repeat order untuk acara kantor. Kualitas konsisten dan harganya bersahabat.",
    name: "Dimas P.",
    type: "Pesanan Korporat",
  },
];

export default async function PublicHomePage() {
  const featured = await listPublicProducts({
    q: "",
    selections: {},
    sort: "newest",
    priceRange: "all",
    page: 1,
    pageSize: 4,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#ece5dd]">
        <div className="mx-auto grid min-h-[690px] w-full max-w-[1240px] items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[46%_54%]">
          <div className="space-y-6">
            <h1 className="font-heading text-4xl font-semibold leading-tight tracking-tight text-[#092328] sm:text-5xl lg:text-6xl">
              Souvenir unik, <span className="italic text-[#12544f]">dibuat spesial</span> dari
              Ponorogo.
            </h1>
            <p className="max-w-xl text-base leading-7 text-[#1a4241] sm:text-lg">
              Temukan koleksi hadiah dan kerajinan tangan penuh makna—dibuat teliti oleh
              perajin lokal untuk setiap momen istimewa Anda.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-[#092328] text-white hover:bg-[#12544f]">
                <Link href="/produk">Jelajahi katalog</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#8bbb92] text-[#092328] hover:bg-[#8bbb92]"
              >
                <a
                  href="https://wa.me/6289636528462"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle data-icon="inline-start" aria-hidden="true" />
                  Butuh cepat? Hubungi kami
                </a>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-medium text-[#1a4241]">
              {benefits.map((benefit) => (
                <span key={benefit} className="border border-[#8bbb92] px-3 py-1.5">
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Collage */}
          <div className="relative min-h-[420px] sm:min-h-[520px]">
            <ImagePlaceholder
              className="absolute right-0 bottom-0 h-[92%] w-[82%]"
              label="Koleksi terbaru"
              variant="warm"
            />
            <div className="absolute right-0 bottom-6 w-[82%] bg-gradient-to-t from-black/60 to-transparent px-6 py-6 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                Koleksi terbaru
              </p>
              <p className="font-heading text-2xl font-semibold">Cerita Kecil dari Ponorogo</p>
            </div>
            <ImagePlaceholder
              className="absolute left-0 top-0 h-[37%] w-[40%] border-4 border-white"
              label=""
              variant="teal"
            />
            <div className="absolute bottom-6 left-0 w-[46%] border border-[#8bbb92] bg-white p-4 shadow-lg">
              <div className="flex items-center gap-1 text-[#2a835f]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-2 font-heading text-lg font-semibold text-[#092328]">
                4.9 dari 5
              </p>
              <p className="text-xs text-[#1a4241]">200+ pelanggan bahagia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-[#8bbb92] bg-[#d8d2c6]">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-0 px-5 md:grid-cols-4 md:px-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 border-r border-[#8bbb92]/60 px-4 py-8 last:border-r-0"
            >
              <stat.icon className="size-8 shrink-0 text-[#12544f]" aria-hidden="true" />
              <div>
                <p className="font-heading text-2xl font-semibold text-[#092328]">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-[0.15em] text-[#1a4241]">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-[#ece5dd] py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#2a835f]">
              Pilihan terbaik kami
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#092328] md:text-4xl">
              Produk Unggulan
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#1a4241]">
              Koleksi pilihan yang paling banyak dipesan untuk hadiah, acara perusahaan, dan
              momen istimewa.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="border-[#8bbb92] text-[#092328]">
              <Link href="/produk">Lihat Semua Produk di Katalog</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-[#1a4241] py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-[1240px] gap-10 px-5 md:px-8 lg:grid-cols-2">
          <div className="relative">
            <ImagePlaceholder
              className="aspect-[4/4.4] w-full"
              label="Workshop Bakul Souvenir"
              variant="warm"
            />
            <div className="absolute right-6 bottom-6 w-56 border border-white/20 bg-white p-4 text-[#092328] shadow-lg">
              <p className="font-heading text-2xl font-semibold">Sejak 2018</p>
              <p className="mt-1 text-xs text-[#1a4241]">
                Tumbuh bersama perajin lokal Ponorogo.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#8bbb92]">
              Tentang kami
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
              Bukan sekadar souvenir, ini tentang <span className="italic text-[#8bbb92]">cerita.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-white/80">
              Bakul Souvenir lahir dari kecintaan pada karya tangan dan budaya Ponorogo. Kami
              percaya setiap perayaan layak dikenang melalui hadiah yang dibuat dengan hati.
            </p>
            <p className="mt-4 text-sm leading-7 text-white/80">
              Bersama perajin lokal, kami merancang souvenir yang personal, berkualitas, dan
              tetap ramah di kantong—dari satu buah hingga ribuan pesanan.
            </p>
            <Link
              href="/#tentang"
              className="mt-6 inline-flex text-sm font-medium text-[#8bbb92] underline-offset-4 hover:underline"
            >
              Kenal lebih dekat
            </Link>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="bg-[#ece5dd] py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#2a835f]">
                Dipercaya di hari istimewa
              </p>
              <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#092328] md:text-4xl">
                Dokumentasi &amp; Portofolio Event
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#1a4241]">
                Inspirasi aplikasi souvenir untuk pernikahan, acara perusahaan, dan momen
                kelulusan.
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#1a4241]">
              Visual portofolio prototype
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-5">
            <div className="relative min-h-[625px] md:col-span-3 md:row-span-2">
              <ImagePlaceholder
                className="absolute inset-0"
                label={portfolio[0].title}
                variant={portfolio[0].variant}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                  {portfolio[0].tag}
                </p>
                <p className="mt-2 font-heading text-2xl font-semibold">
                  {portfolio[0].title}
                </p>
                <p className="mt-2 text-sm text-white/80">“{portfolio[0].quote}”</p>
              </div>
            </div>
            {portfolio.slice(1).map((item) => (
              <div key={item.title} className="relative min-h-[300px] md:col-span-2">
                <ImagePlaceholder
                  className="absolute inset-0"
                  label={item.title}
                  variant={item.variant}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/80">{item.tag}</p>
                  <p className="mt-2 font-heading text-xl font-semibold">{item.title}</p>
                  <p className="mt-2 text-sm text-white/80">“{item.quote}”</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#d8d2c6] py-16 md:py-20">
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#2a835f]">
              Kata mereka
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#092328] md:text-4xl">
              Cerita dari pelanggan
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <div
                key={item.name}
                className={`border border-[#8bbb92] bg-white p-6 shadow-sm ${
                  index === 1 ? "md:-translate-y-4" : ""
                }`}
              >
                <div className="flex items-center gap-1 text-[#2a835f]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-4 font-heading text-lg leading-7 text-[#092328]">
                  “{item.quote}”
                </p>
                <div className="mt-5 border-t border-[#8bbb92]/40 pt-4">
                  <p className="text-sm font-semibold text-[#092328]">{item.name}</p>
                  <p className="text-xs text-[#1a4241]">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactLocationSection />
    </>
  );
}