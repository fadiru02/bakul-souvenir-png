import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ImagePlaceholder } from "@/components/public/image-placeholder";
import { ContactLocationSection } from "@/components/public/contact-location";
import { OrderWhatsAppSheet } from "@/components/catalog/order-whatsapp-sheet";
import { getPublicProductBySlug } from "@/features/catalog/public-repository";
import type { PublicProduct } from "@/features/catalog/public-types";
import { formatRupiah } from "@/features/catalog/service";
import { getSiteUrl } from "@/lib/site";

export const instant = false;

function getDescription(description: string) {
  if (description.length <= 160) {
    return description;
  }

  return `${description.slice(0, 157)}...`;
}

export async function generateMetadata({
  params,
}: PageProps<"/produk/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk tidak ditemukan",
      robots: { index: false, follow: true },
    };
  }

  const description = getDescription(product.description);
  const path = `/produk/${product.slug}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: product.name,
      description,
      type: "website",
      url: path,
    },
  };
}

function ProductDetail({ product }: { product: PublicProduct }) {
  const productUrl = `${getSiteUrl()}/produk/${product.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    url: productUrl,
    brand: {
      "@type": "Brand",
      name: "Bakul Souvenir",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: productUrl,
    },
  };

  const tags =
    product.filterGroups.find((group) => group.key === "tag")?.options ?? [];
  const otherGroups = product.filterGroups.filter((group) => group.key !== "tag");
  const categoryLabel = otherGroups[0]?.label ?? "Souvenir Custom";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/produk">Katalog</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <ImagePlaceholder
            className="aspect-square w-full border border-[#8bbb92]"
            label={product.name}
            variant="warm"
          />
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((index) => (
              <ImagePlaceholder
                key={index}
                className="aspect-square w-full border border-[#8bbb92]"
                label=""
                variant={index === 0 ? "teal" : index === 1 ? "sage" : "dark"}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-[#d8d2c6] text-[#092328]">{categoryLabel}</Badge>
            {tags.slice(0, 1).map((tag) => (
              <Badge key={tag.id} className="bg-[#2a835f] text-white">
                {tag.label}
              </Badge>
            ))}
          </div>

          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-[#092328] sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#12544f]">
            {formatRupiah(product.price)}
            <span className="ml-2 text-sm font-normal text-[#1a4241]">/pcs</span>
          </p>
          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#1a4241]">
            {product.description}
          </p>

          <div className="mt-6 border border-[#8bbb92] bg-white">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-[#8bbb92]/40">
                  <th className="w-40 px-4 py-3 text-left font-medium text-[#092328]">
                    Kategori
                  </th>
                  <td className="px-4 py-3 text-[#1a4241]">{categoryLabel}</td>
                </tr>
                <tr className="border-b border-[#8bbb92]/40">
                  <th className="w-40 px-4 py-3 text-left font-medium text-[#092328]">
                    Personalisasi
                  </th>
                  <td className="px-4 py-3 text-[#1a4241]">
                    Logo, nama, teks, dan warna
                  </td>
                </tr>
                <tr className="border-b border-[#8bbb92]/40">
                  <th className="w-40 px-4 py-3 text-left font-medium text-[#092328]">
                    Material
                  </th>
                  <td className="px-4 py-3 text-[#1a4241]">
                    Dapat disesuaikan dengan kebutuhan
                  </td>
                </tr>
                <tr>
                  <th className="w-40 px-4 py-3 text-left font-medium text-[#092328]">
                    Konsultasi
                  </th>
                  <td className="px-4 py-3 text-[#1a4241]">Gratis konsultasi desain</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <OrderWhatsAppSheet product={product} />
            <Button asChild variant="outline" className="border-[#8bbb92] text-[#092328]">
              <Link href="/produk">
                <ArrowLeft data-icon="inline-start" aria-hidden="true" />
                Kembali ke Katalog
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-xs leading-5 text-[#1a4241]">
            Harga dapat berubah mengikuti material, ukuran, jumlah, dan tingkat kerumitan
            desain.
          </p>
        </div>
      </div>
    </>
  );
}

export default async function ProductDetailPage({
  params,
}: PageProps<"/produk/[slug]">) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-[1240px] px-5 py-12 sm:py-16 md:px-8">
      <ProductDetail product={product} />
      <div className="mt-16">
        <ContactLocationSection />
      </div>
    </section>
  );
}