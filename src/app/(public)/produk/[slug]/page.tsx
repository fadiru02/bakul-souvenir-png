import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Package } from "lucide-react";

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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
              <Link href="/">Beranda</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
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

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article>
          <div className="flex aspect-video items-center justify-center rounded-xl border bg-gradient-to-br from-muted via-background to-secondary/30">
            <Package className="size-14 text-primary/50" aria-hidden="true" />
          </div>

          <h1 className="mt-7 text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 whitespace-pre-line text-muted-foreground">
            {product.description}
          </p>

          {product.filterGroups.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {product.filterGroups.map((group) => (
                <section
                  key={group.key}
                  className="rounded-lg border bg-card p-4"
                >
                  <h2 className="text-sm font-medium">{group.label}</h2>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {group.options.map((option) => (
                      <Badge key={option.id} variant="secondary">
                        {option.label}
                      </Badge>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          ) : null}
        </article>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card>
            <CardHeader>
              <CardTitle>Harga</CardTitle>
              <CardDescription>
                Harga produk per unit. Hubungi kami untuk detail pesanan custom.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-heading text-3xl font-semibold tracking-tight">
                {formatRupiah(product.price)}
              </p>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-2">
              <Button asChild>
                <Link href="/produk">Lihat produk lain</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft data-icon="inline-start" aria-hidden="true" />
                  Kembali ke beranda
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </aside>
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
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:py-16">
      <ProductDetail product={product} />
    </section>
  );
}
