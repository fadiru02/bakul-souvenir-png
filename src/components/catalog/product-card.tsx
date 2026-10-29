import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRupiah } from "@/features/catalog/service";
import type { PublicProduct } from "@/features/catalog/public-types";

export function ProductCard({ product }: { product: PublicProduct }) {
  const tags =
    product.filterGroups.find((group) => group.key === "tag")?.options ?? [];

  return (
    <Card className="h-full pt-0">
      <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-muted via-background to-secondary/30">
        <Package
          className="size-10 text-primary/50"
          aria-hidden="true"
        />
      </div>

      <CardHeader>
        <CardTitle className="text-base leading-snug">
          <Link
            href={`/produk/${product.slug}`}
            className="underline-offset-4 hover:underline"
          >
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-3">
        <p className="font-heading text-lg font-semibold tracking-tight">
          {formatRupiah(product.price)}
        </p>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.label}
              </Badge>
            ))}
            {tags.length > 3 ? (
              <Badge variant="outline">+{tags.length - 3}</Badge>
            ) : null}
          </div>
        ) : null}
      </CardContent>

      <CardFooter>
        <Button asChild variant="ghost" size="sm" className="w-full justify-between">
          <Link href={`/produk/${product.slug}`}>
            Lihat detail
            <ArrowRight data-icon="inline-end" aria-hidden="true" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
