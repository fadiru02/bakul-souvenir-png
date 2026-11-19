import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/public/image-placeholder";
import { formatRupiah } from "@/features/catalog/service";
import type { PublicProduct } from "@/features/catalog/public-types";

const WHATSAPP_NUMBER = "6289636528462";

export function ProductCard({ product }: { product: PublicProduct }) {
  const tags =
    product.filterGroups.find((group) => group.key === "tag")?.options ?? [];
  const primaryTag = tags[0];
  const category = product.filterGroups.find((group) => group.key !== "tag");

  const whatsappMessage = encodeURIComponent(
    `Halo Bakul Souvenir, saya tertarik dengan ${product.name} (${formatRupiah(product.price)}). Mohon info lebih lanjut.`,
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <Card className="h-full pt-0">
      <div className="relative">
        <ImagePlaceholder
          className="aspect-square w-full"
          label={product.name}
          variant="warm"
        />
        {primaryTag ? (
          <Badge className="absolute top-3 left-3 bg-[#2a835f] text-white">
            {primaryTag.label}
          </Badge>
        ) : null}
      </div>

      <CardHeader className="space-y-1">
        {category ? (
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#2a835f]">
            {category.label}
          </p>
        ) : null}
        <CardTitle className="font-heading text-lg leading-snug">
          <Link
            href={`/produk/${product.slug}`}
            className="hover:text-[#12544f]"
          >
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-auto">
        <p className="font-heading text-xl font-semibold tracking-tight text-[#092328]">
          {formatRupiah(product.price)}
          <span className="ml-1 text-xs font-normal text-[#1a4241]">/pcs</span>
        </p>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full bg-[#092328] text-white hover:bg-[#12544f]">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle data-icon="inline-start" aria-hidden="true" />
            Pesan via WA
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

