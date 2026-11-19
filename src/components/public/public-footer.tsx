import Link from "next/link";

export function PublicFooter() {
  return (
    <footer className="bg-[#092328] text-white/80">
      <div className="mx-auto max-w-[1240px] px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center border border-white/30 font-heading text-sm font-semibold tracking-wider text-white">
                BS
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-[0.2em] text-white">
                  BAKUL SOUVENIR
                </span>
                <span className="block text-[10px] tracking-[0.3em] text-white/60">
                  PONOROGO
                </span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-white/70">
              Hadiah kecil yang membawa cerita besar dari tangan perajin lokal
              Ponorogo.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Jelajahi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white">Beranda</Link></li>
              <li><Link href="/produk" className="hover:text-white">Katalog Produk</Link></li>
              <li><Link href="/#tentang" className="hover:text-white">Tentang Kami</Link></li>
              <li><Link href="/#kontak" className="hover:text-white">Hubungi Kami</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Bantuan</h3>
            <ul className="space-y-2 text-sm">
              <li><span>Cara Pemesanan</span></li>
              <li><span>Pengiriman</span></li>
              <li><span>Kebijakan Pengembalian</span></li>
              <li><span>Syarat &amp; Ketentuan</span></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Kunjungi Kami</h3>
            <p className="text-sm leading-6 text-white/70">
              Jl. Arif Rahman Hakim depan MAN 1 No. 57, Perumda, Keniten, Kec.
              Ponorogo, Kabupaten Ponorogo, Jawa Timur 63412
            </p>
            <p className="mt-3 text-sm text-white/70">halo@bakulsouvenir.id</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Bakul Souvenir Ponorogo. Dibuat dengan sepenuh hati.</p>
            <p>Pembayaran aman • Produk lokal • Kemasan rapi</p>
          </div>
        </div>
      </div>
    </footer>
  );
}