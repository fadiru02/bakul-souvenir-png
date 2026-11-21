"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlaceholder } from "@/components/public/image-placeholder";
import { formatRupiah } from "@/lib/format";
import type { PublicProduct } from "@/features/catalog/public-types";
import { useIsMobile } from "@/hooks/use-mobile";

const WHATSAPP_NUMBER = "6289636528462";

const quantityPresets = ["50 pcs", "100 pcs", "500+ pcs"];

export function OrderWhatsAppSheet({ product }: { product: PublicProduct }) {
  const isMobile = useIsMobile();
  const [quantity, setQuantity] = useState("");
  const [customText, setCustomText] = useState("");
  const [open, setOpen] = useState(false);

  const leadTime = "7-14 hari kerja";

  function handleContinue() {
    const message = [
      "Halo Bakul Souvenir, saya ingin memesan produk berikut:",
      `Produk: ${product.name}`,
      `Harga: ${formatRupiah(product.price)} /pcs`,
      quantity ? `Jumlah: ${quantity}` : null,
      customText ? `Detail custom: ${customText}` : null,
      "Mohon info total dan proses pemesanan. Terima kasih.",
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-full bg-[#092328] text-white hover:bg-[#12544f] sm:w-auto">
          <MessageCircle data-icon="inline-start" aria-hidden="true" />
          Pesan Produk via WhatsApp
        </Button>
      </SheetTrigger>
      <SheetContent side={isMobile ? "bottom" : "right"} className="max-w-[512px]">
        <SheetHeader>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#2a835f]">
            Generator pesanan
          </p>
          <SheetTitle className="font-heading text-xl text-[#092328]">
            Pesan via WhatsApp
          </SheetTitle>
          <SheetDescription>
            Lengkapi detail pesanan, lalu lanjutkan ke WhatsApp.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-4">
          <div className="flex items-center gap-3 border border-[#8bbb92] bg-white p-3">
            <ImagePlaceholder className="size-16 shrink-0" label={product.name} variant="warm" />
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#2a835f]">
                {product.filterGroups[0]?.label ?? "Produk"}
              </p>
              <p className="truncate font-heading text-base font-semibold text-[#092328]">
                {product.name}
              </p>
              <p className="text-xs text-[#1a4241]">Lead time: {leadTime}</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="order-quantity" className="text-sm font-medium text-[#092328]">
              Jumlah pesanan
            </label>
            <Input
              id="order-quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="Masukkan jumlah (pcs)"
            />
            <div className="flex flex-wrap gap-2">
              {quantityPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setQuantity(preset.replace(" pcs", ""))}
                  className="border border-[#8bbb92] px-3 py-1 text-xs text-[#092328] hover:bg-[#8bbb92]"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="order-custom" className="text-sm font-medium text-[#092328]">
              Teks atau detail custom
            </label>
            <Textarea
              id="order-custom"
              value={customText}
              onChange={(event) => setCustomText(event.target.value)}
              rows={4}
              placeholder="Contoh: logo perusahaan, nama tamu, warna, ukuran..."
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#092328]">
              Pilih referensi logo/desain
            </label>
            <input
              type="file"
              className="block w-full text-sm text-[#1a4241] file:mr-3 file:border-0 file:bg-[#d8d2c6] file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-[#092328]"
            />
            <p className="text-xs text-[#1a4241]">
              Lampirkan file referensi; tim kami akan meminta ulang via WhatsApp bila diperlukan.
            </p>
          </div>

          <div className="border border-[#8bbb92] bg-[#ece5dd] p-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#2a835f]">
              Ringkasan harga
            </p>
            <p className="mt-2 font-heading text-2xl font-semibold text-[#092328]">
              {formatRupiah(product.price)}
              <span className="ml-1 text-xs font-normal text-[#1a4241]">/pcs</span>
            </p>
            <p className="mt-1 text-xs text-[#1a4241]">
              Harga dapat berubah mengikuti material, ukuran, jumlah, dan tingkat kerumitan
              desain.
            </p>
          </div>
        </div>

        <div className="border-t border-[#8bbb92]/40 p-4">
          <Button
            onClick={handleContinue}
            className="w-full bg-[#2a835f] text-white hover:bg-[#8bbb92] hover:text-[#092328]"
          >
            Lanjutkan ke WhatsApp
          </Button>
          <p className="mt-2 text-center text-xs text-[#1a4241]">
            Anda akan diarahkan ke WhatsApp.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}