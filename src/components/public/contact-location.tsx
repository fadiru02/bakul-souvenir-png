"use client";

import { FormEvent, useState } from "react";
import { MapPin, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "6289636528462";

export function ContactLocationSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [need, setNeed] = useState("");
  const [idea, setIdea] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = [
      "Halo Bakul Souvenir, saya ingin konsultasi souvenir.",
      name ? `Nama: ${name}` : null,
      phone ? `WhatsApp: ${phone}` : null,
      need ? `Kebutuhan: ${need}` : null,
      idea ? `Ide: ${idea}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="kontak" className="bg-[#ece5dd]">
      <div className="mx-auto grid max-w-[1240px] gap-0 px-5 md:px-8 lg:grid-cols-2">
        <div className="bg-[#092328] px-8 py-12 text-white md:px-12 md:py-16">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#8bbb92]">
            Mari bercerita
          </p>
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Punya ide souvenir sendiri?
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-white/75">
            Ceritakan kebutuhanmu. Tim kami siap membantu dari ide, desain, hingga
            produk tiba di tangan.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/90 hover:text-[#8bbb92]"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              +62 896-3652-8462
            </a>
            <span className="inline-flex items-center gap-2 text-white/90">
              <Phone className="size-4" aria-hidden="true" />
              @bakul.souvenir_png
            </span>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="contact-name" className="text-sm font-medium">
                Nama lengkap
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-10 w-full border border-white/20 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 focus:border-[#8bbb92] focus:outline-none"
                placeholder="Nama lengkap"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="contact-phone" className="text-sm font-medium">
                Nomor WhatsApp
              </label>
              <input
                id="contact-phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="h-10 w-full border border-white/20 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 focus:border-[#8bbb92] focus:outline-none"
                placeholder="08xxxxxxxxxx"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="contact-need" className="text-sm font-medium">
                Kebutuhan souvenir
              </label>
              <input
                id="contact-need"
                value={need}
                onChange={(event) => setNeed(event.target.value)}
                className="h-10 w-full border border-white/20 bg-white/5 px-3 text-sm text-white placeholder:text-white/40 focus:border-[#8bbb92] focus:outline-none"
                placeholder="Contoh: souvenir pernikahan 200 pcs"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label htmlFor="contact-idea" className="text-sm font-medium">
                Ceritakan idemu
              </label>
              <textarea
                id="contact-idea"
                value={idea}
                onChange={(event) => setIdea(event.target.value)}
                rows={4}
                className="w-full border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#8bbb92] focus:outline-none"
                placeholder="Jelaskan konsep, jumlah, dan tenggat waktu..."
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="h-10 w-full bg-[#2a835f] px-4 text-sm font-medium text-white transition-colors hover:bg-[#8bbb92] hover:text-[#092328]"
              >
                Kirim pesan
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col bg-white">
          <div className="px-8 py-12 md:px-12 md:py-16">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#2a835f]">
              Datang &amp; lihat langsung
            </p>
            <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-[#092328] md:text-4xl">
              Lokasi Workshop &amp; Toko
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-[#1a4241]">
              Kunjungi workshop kami untuk melihat sample material kayu, akrilik,
              dan kuningan serta berkonsultasi langsung dengan tim desain.
            </p>
            <div className="mt-6 space-y-2 text-sm text-[#092328]">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#2a835f]" aria-hidden="true" />
                Jl. Arif Rahman Hakim depan MAN 1 No. 57, Perumda, Keniten, Kec.
                Ponorogo, Kabupaten Ponorogo, Jawa Timur 63412
              </p>
              <p className="text-[#1a4241]">
                Senin–Sabtu, 08.00–17.00 WIB • Minggu dengan perjanjian
              </p>
            </div>
            <a
              href="https://maps.google.com/?q=Jl.+Arif+Rahman+Hakim+depan+MAN+1+No.+57,+Perumda,+Keniten,+Kec.+Ponorogo,+Kabupaten+Ponorogo,+Jawa+Timur+63412"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-10 items-center border border-[#8bbb92] px-4 text-sm font-medium text-[#092328] transition-colors hover:bg-[#8bbb92]"
            >
              Buka di Google Maps
            </a>
          </div>

          <div className="relative min-h-[430px] flex-1">
            <iframe
              title="Lokasi Bakul Souvenir"
              src="https://maps.google.com/maps?q=Jl.+Arif+Rahman+Hakim+depan+MAN+1+No.+57,+Perumda,+Keniten,+Kec.+Ponorogo,+Kabupaten+Ponorogo,+Jawa+Timur+63412&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 bg-white px-3 py-2 text-xs shadow-sm">
              <p className="font-semibold text-[#092328]">Bakul Suvenir</p>
              <p className="text-[#1a4241]">Workshop &amp; Toko</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}