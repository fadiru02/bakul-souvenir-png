"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/produk", label: "Katalog" },
  { href: "/#tentang", label: "Tentang Kami" },
  { href: "/#kontak", label: "Kontak" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 h-20 bg-[rgba(26,66,65,0.95)] text-white backdrop-blur">
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between gap-4 px-5 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center border border-white/30 font-heading text-sm font-semibold tracking-wider">
            BS
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.2em]">
              BAKUL SOUVENIR
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-white/70">
              PONOROGO
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#8bbb92]",
                isActive(item.href) ? "text-[#8bbb92]" : "text-white/90",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="flex size-10 items-center justify-center border border-white/20 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[rgba(26,66,65,0.98)] md:hidden">
          <nav className="mx-auto flex max-w-[1240px] flex-col px-5 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 text-sm font-medium border-b border-white/10 last:border-0",
                  isActive(item.href) ? "text-[#8bbb92]" : "text-white/90",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}