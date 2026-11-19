# Prompt Relume AI per Page — Bakul Souvenir Ponorogo

Gunakan setiap prompt secara terpisah di Relume AI. Setiap prompt sudah memuat aturan global, header, isi halaman, section kontak dan lokasi, serta footer agar dapat menghasilkan wireframe secara mandiri.

Jangan menggabungkan ketiga prompt dalam satu input. Buat satu page Relume untuk setiap prompt.

## Batas prompt

Setiap prompt halaman wajib memiliki panjang maksimum **5.000 kata**. Versi saat ini sudah memenuhi batas tersebut:

| Page | Jumlah kata prompt | Status |
|---|---:|---|
| Home / Beranda | 1.472 kata | Di bawah 5.000 kata |
| Katalog Lengkap | 944 kata | Di bawah 5.000 kata |
| Detail Produk | 904 kata | Di bawah 5.000 kata |

Jumlah di atas hanya menghitung isi di dalam blok prompt `text`, bukan judul atau petunjuk penggunaan README.

---

# Page 1 — Home / Beranda

**Panjang prompt: 1.472 kata dari batas maksimum 5.000 kata.**

Salin seluruh prompt berikut ke Relume AI:

```text
Buat wireframe satu halaman Home untuk website toko souvenir custom bernama “Bakul Souvenir Ponorogo”. Gunakan Bahasa Indonesia.

PENTING: Ikuti struktur dan layout yang dijelaskan secara presisi. Ini adalah rekonstruksi layout yang sudah ada, bukan redesign. Jangan mengubah urutan section, jumlah kolom, posisi elemen, atau hierarki konten. Jangan menambahkan section baru, sidebar, carousel, floating button, announcement bar, FAQ, blog, newsletter, logo cloud, pricing table, team section, atau banner promosi.

ARAH VISUAL
- Gaya elegan, hangat, editorial, lokal, dan tepercaya.
- Heading serif editorial dan body sans-serif bersih.
- Semua sudut tajam tanpa rounded corners.
- Container maksimum sekitar 1240px dan rata tengah.
- Padding horizontal sekitar 20px pada mobile dan 32px pada tablet/desktop.
- Background utama off-white #ECE5DD.
- Warna: dark navy-teal #092328, header teal #1A4241, deep teal #12544F, emerald #2A835F, soft sage #8BBB92, warm beige #D8D2C6, putih #FFFFFF.
- Gunakan border tipis, shadow halus, dan whitespace lega.
- Jangan membuat floating WhatsApp button.

Buat section dengan urutan persis berikut:
1. Sticky Header
2. Hero dua kolom
3. Statistik empat item
4. Produk Unggulan empat kartu
5. Tentang Kami dua kolom
6. Portofolio tiga kartu masonry
7. Testimoni tiga kartu
8. Kontak & Lokasi dua kolom
9. Footer empat kolom

SECTION 1 — STICKY HEADER
- Tinggi sekitar 80px dan sticky di atas.
- Background rgba(26, 66, 65, 0.95).
- Logo dan wordmark di kiri: monogram BS, “BAKUL SOUVENIR”, dan teks kecil “PONOROGO”.
- Navigasi desktop di tengah: Beranda, Katalog, Tentang Kami, Kontak.
- Area action minimal di kanan dan hamburger pada mobile.
- Mobile menu tampil vertikal di bawah header.
- Jangan menambahkan CTA button atau announcement bar.

SECTION 2 — HERO DUA KOLOM
- Minimum tinggi sekitar 690px.
- Desktop menggunakan grid sekitar 46% teks dan 54% visual, gap 48px, rata tengah vertikal.
- Mobile menumpuk teks lebih dulu lalu visual.

Kolom kiri, urutan wajib:
1. H1 besar: “Souvenir unik, dibuat spesial dari Ponorogo.”
2. Frasa “dibuat spesial” italic dan berwarna teal.
3. Paragraf: “Temukan koleksi hadiah dan kerajinan tangan penuh makna—dibuat teliti oleh perajin lokal untuk setiap momen istimewa Anda.”
4. Dua tombol sejajar pada desktop dan bertumpuk pada mobile:
   - Primary: “Jelajahi katalog”
   - Secondary dengan ikon WhatsApp: “Butuh cepat? Hubungi kami”
5. Tiga benefit dalam satu baris yang dapat wrap:
   - Bisa custom
   - Harga grosir
   - Kirim se-Indonesia

Jangan menambahkan eyebrow di atas H1.

Kolom kanan harus berupa collage overlap, bukan satu image atau gallery grid:
- Satu image utama besar di kanan bawah, sekitar 82% lebar collage dan 92% tinggi.
- Satu image kecil overlap di kiri atas, sekitar 40% lebar dan 37% tinggi.
- Image utama mempunyai gradient bawah dengan teks “Koleksi terbaru” dan “Cerita Kecil dari Ponorogo”.
- Satu kartu rating overlap di kiri bawah berisi lima bintang, “4.9 dari 5”, dan “200+ pelanggan bahagia”.
- Pertahankan overlap ini pada mobile.

SECTION 3 — STATISTIK
- Full-width horizontal band dengan background warm beige dan border atas-bawah.
- Empat item sama lebar pada desktop dan dua kolom pada mobile.
- Gunakan divider antaritem.
- Setiap item memiliki ikon di kiri dan angka serta label di kanan.
- Data berurutan:
  1. 500+ — Produk dibuat
  2. 200+ — Pelanggan bahagia
  3. 50+ — Pilihan desain
  4. 38 — Kota terjangkau

SECTION 4 — PRODUK UNGGULAN
- Heading center.
- Eyebrow: “Pilihan terbaik kami”
- H2: “Produk Unggulan”
- Deskripsi: “Koleksi pilihan yang paling banyak dipesan untuk hadiah, acara perusahaan, dan momen istimewa.”
- Tampilkan tepat empat kartu dalam grid: empat kolom desktop, dua tablet, satu mobile.
- Jangan menggunakan carousel.

Struktur setiap kartu:
1. Image persegi di atas.
2. Badge kecil di kiri atas image bila tersedia.
3. Kategori uppercase kecil.
4. Nama produk serif.
5. Harga dan /pcs.
6. Tombol full-width “Pesan via WA”.

Produk:
1. Ganci Akrilik — Rp12.000 /pcs — badge Terlaris
2. Vandel Kayu — Rp35.000 /pcs — badge Favorit
3. Jam Custom — Rp45.000 /pcs
4. Vandel Akrilik — Rp18.000 /pcs — badge Bisa Custom

Setelah grid tampilkan tombol center “Lihat Semua Produk di Katalog”.

SECTION 5 — TENTANG KAMI
- Background #1A4241 dan teks putih.
- Grid dua kolom 50/50 pada desktop.
- Image di kiri dan teks di kanan; mobile menumpuk image lalu teks.

Kolom kiri:
- Image portrait besar, aspect ratio sekitar 4:4.4.
- Kartu putih overlap di kanan bawah image.
- Isi kartu: “Sejak 2018” dan “Tumbuh bersama perajin lokal Ponorogo.”
- Jangan memindahkan kartu ke kolom kanan.

Kolom kanan:
1. Eyebrow: “Tentang kami”
2. H2: “Bukan sekadar souvenir, ini tentang cerita.”
3. Kata “cerita.” italic dan soft sage.
4. Paragraf: “Bakul Souvenir lahir dari kecintaan pada karya tangan dan budaya Ponorogo. Kami percaya setiap perayaan layak dikenang melalui hadiah yang dibuat dengan hati.”
5. Paragraf: “Bersama perajin lokal, kami merancang souvenir yang personal, berkualitas, dan tetap ramah di kantong—dari satu buah hingga ribuan pesanan.”
6. Text link underline: “Kenal lebih dekat”

SECTION 6 — PORTOFOLIO
- Header section rata kiri dan label kecil di kanan pada desktop.
- Eyebrow: “Dipercaya di hari istimewa”
- H2: “Dokumentasi & Portofolio Event”
- Deskripsi: “Inspirasi aplikasi souvenir untuk pernikahan, acara perusahaan, dan momen kelulusan.”
- Label kanan: “Visual portofolio prototype”

Buat masonry tepat tiga kartu:
- Desktop memakai grid lima kolom.
- Kartu pertama di kiri mengambil tiga kolom dan dua baris, minimum tinggi sekitar 625px.
- Kartu kedua di kanan atas mengambil dua kolom.
- Kartu ketiga di kanan bawah mengambil dua kolom.
- Mobile menumpuk vertikal.
- Jangan membuat ketiga kartu sama besar.

Setiap kartu memakai full-cover image, gradient gelap dari bawah, dan teks kiri bawah.

Data:
1. Wedding • 350 pcs — Pernikahan Nadia & Arif — “Tamu suka sekali, semua detail nama tercetak rapi.”
2. Corporate • 500 pcs — Gathering Tim Nusantara — “Selesai sesuai deadline dan pengemasan sangat aman.”
3. Graduation • 180 pcs — Wisuda Angkatan 2025 — “Desain custom-nya membuat kenang-kenangan makin spesial.”

SECTION 7 — TESTIMONI
- Background warm beige dan heading center.
- Eyebrow: “Kata mereka”
- H2: “Cerita dari pelanggan”
- Tiga kartu sejajar pada desktop dan satu kolom pada mobile.
- Kartu tengah naik sekitar 16px pada desktop.
- Jangan menggunakan carousel.

Setiap kartu berisi lima bintang, kutipan serif, divider, nama, dan jenis pesanan.

Data:
1. “Hasilnya lebih cantik dari ekspektasi. Detail nama custom-nya rapi dan semua tamu suka!” — Nadia A. — Souvenir Pernikahan
2. “Admin sangat membantu dari pilih desain sampai pengiriman. Datang tepat waktu dan aman.” — Maya Putri — Hampers Ulang Tahun
3. “Sudah tiga kali repeat order untuk acara kantor. Kualitas konsisten dan harganya bersahabat.” — Dimas P. — Pesanan Korporat

SECTION 8 — KONTAK & LOKASI
- Full-width dua kolom sama besar pada desktop dan satu kolom pada mobile.
- Jangan menaruh seluruh section di dalam card center.

Kolom kiri — Form konsultasi:
- Background #092328 dan teks putih.
- Padding besar.
- Eyebrow: “Mari bercerita”
- H2: “Punya ide souvenir sendiri?”
- Paragraf: “Ceritakan kebutuhanmu. Tim kami siap membantu dari ide, desain, hingga produk tiba di tangan.”
- Dua contact item sejajar: WhatsApp +62 896-3652-8462 dan Instagram @bakul.souvenir_png.
- Form dua kolom:
  - Baris 1: Nama lengkap dan Nomor WhatsApp.
  - Baris 2 full-width: Kebutuhan souvenir.
  - Baris 3 full-width: Ceritakan idemu.
  - Baris 4 full-width: tombol Kirim pesan.

Kolom kanan — Lokasi:
- Background putih.
- Bagian atas berupa konten lokasi dengan padding besar.
- Bagian bawah berupa map full-width minimum tinggi sekitar 430px.
- Jangan menaruh map di samping teks lokasi.
- Eyebrow: “Datang & lihat langsung”
- H2: “Lokasi Workshop & Toko”
- Paragraf: “Kunjungi workshop kami untuk melihat sample material kayu, akrilik, dan kuningan serta berkonsultasi langsung dengan tim desain.”
- Alamat: “Jl. Arif Rahman Hakim depan MAN 1 No. 57, Perumda, Keniten, Kec. Ponorogo, Kabupaten Ponorogo, Jawa Timur 63412”
- Jam: “Senin–Sabtu, 08.00–17.00 WIB” dan “Minggu dengan perjanjian”
- Tombol: “Buka di Google Maps”
- Badge kiri bawah map: “Bakul Suvenir” dan “Workshop & Toko”

SECTION 9 — FOOTER
- Background #092328 dengan teks putih transparan.
- Empat kolom desktop, dua tablet, satu mobile.
- Kolom 1: logo dan teks “Hadiah kecil yang membawa cerita besar dari tangan perajin lokal Ponorogo.”
- Kolom 2, heading “Jelajahi”: Beranda, Katalog Produk, Tentang Kami, Hubungi Kami.
- Kolom 3, heading “Bantuan”: Cara Pemesanan, Pengiriman, Kebijakan Pengembalian, Syarat & Ketentuan.
- Kolom 4, heading “Kunjungi Kami”: alamat workshop dan halo@bakulsouvenir.id.
- Divider horizontal sebelum copyright.
- Baris bawah kiri: “© 2026 Bakul Souvenir Ponorogo. Dibuat dengan sepenuh hati.”
- Baris bawah kanan: “Pembayaran aman • Produk lokal • Kemasan rapi”

VALIDASI
- Jangan mengubah hero menjadi centered hero.
- Jangan mengubah collage menjadi single image.
- Jangan mengubah produk atau testimoni menjadi carousel.
- Jangan mengubah masonry menjadi tiga kartu sama besar.
- Jangan memisahkan Kontak dan Lokasi menjadi dua section berbeda.
- Jangan menambahkan section apa pun.
- Jangan menampilkan floating WhatsApp button.
- Jangan menggunakan lorem ipsum.
```

---

# Page 2 — Katalog Lengkap

**Panjang prompt: 944 kata dari batas maksimum 5.000 kata.**

Salin seluruh prompt berikut ke Relume AI:

```text
Buat wireframe satu halaman Katalog Lengkap untuk website toko souvenir custom “Bakul Souvenir Ponorogo”. Gunakan Bahasa Indonesia.

PENTING: Ini adalah rekonstruksi layout yang sudah ada, bukan redesign. Jangan mengubah urutan section, jumlah kolom, posisi elemen, atau hierarki konten. Jangan menambahkan sidebar filter, carousel, floating button, announcement bar, FAQ, blog, newsletter, logo cloud, pricing, atau section lain.

ARAH VISUAL
- Gaya elegan, hangat, editorial, lokal, dan tepercaya.
- Heading serif editorial dan body sans-serif.
- Semua sudut tajam tanpa rounded corners.
- Container maksimum 1240px, rata tengah.
- Padding horizontal 20px mobile dan 32px tablet/desktop.
- Warna: #092328, #1A4241, #12544F, #2A835F, #8BBB92, #D8D2C6, #ECE5DD, dan putih.
- Background halaman warm beige/off-white.
- Gunakan border tipis dan shadow halus.
- Jangan membuat floating WhatsApp button.

Buat section dengan urutan persis:
1. Sticky Header
2. Catalog Hero
3. Panel filter horizontal
4. Jumlah hasil dan reset filter
5. Grid produk delapan kartu
6. Pagination
7. Kontak & Lokasi dua kolom
8. Footer empat kolom

SECTION 1 — STICKY HEADER
- Tinggi sekitar 80px, sticky di atas, background rgba(26, 66, 65, 0.95).
- Kiri: logo monogram BS, “BAKUL SOUVENIR”, dan “PONOROGO”.
- Tengah desktop: Beranda, Katalog, Tentang Kami, Kontak.
- Tandai Katalog sebagai link aktif.
- Kanan: area action minimal dan hamburger mobile.
- Mobile menu vertikal di bawah header.
- Jangan menambahkan CTA pada header.

SECTION 2 — CATALOG HERO
- Full-width background deep teal #12544F.
- Border bawah soft sage.
- Konten rata kiri dalam container.
- Lebih pendek daripada hero Home; gunakan padding vertikal medium.
- Eyebrow: “Semua koleksi”
- H1: “Katalog Lengkap Souvenir”
- Paragraf: “Jelajahi koleksi vandel, plakat, ganci, jam, dan signage yang dapat disesuaikan untuk berbagai kebutuhan.”
- Jangan menambahkan image pada hero.

SECTION 3 — PANEL FILTER
- Panel putih full-width di dalam container.
- Border soft sage dan shadow halus.
- Desktop satu baris dengan empat area.
- Search paling lebar, tiga select lebih sempit.
- Tablet dua kolom dan mobile satu kolom.

Urutan field:
1. Search: “Cari produk atau kategori...”
2. Select Kategori
3. Select Urutkan
4. Select Rentang harga

Pilihan kategori:
- Semua
- Vandel Kayu
- Vandel Akrilik
- Plakat & Prasasti
- Ganci Akrilik
- Jam Custom
- Signage

Pilihan urutan:
- Terpopuler
- Terbaru
- Harga Terendah
- Harga Tertinggi

Pilihan rentang harga:
- Semua
- < Rp25.000
- Rp25.000–Rp75.000
- > Rp75.000

Jangan mengubah filter menjadi sidebar, drawer, tab, atau filter chips.

SECTION 4 — JUMLAH HASIL
- Satu baris di bawah panel filter.
- Kiri: “16 produk ditemukan”, dengan angka lebih tebal.
- Kanan: text button “Reset filter”.
- Divider horizontal di bawah baris.

SECTION 5 — GRID PRODUK
- Tampilkan delapan kartu pada halaman pertama wireframe.
- Grid empat kolom desktop, tiga laptop, dua tablet, satu mobile.
- Jangan menggunakan carousel atau horizontal scroll.

Struktur setiap kartu:
1. Image persegi.
2. Badge kecil di kiri atas image bila tersedia.
3. Kategori uppercase kecil.
4. Nama produk serif.
5. Harga dan /pcs.
6. Tombol full-width “Pesan via WA”.

Tampilkan delapan produk berikut:
1. Ganci Akrilik — kategori Ganci Akrilik — Rp12.000 /pcs — badge Terlaris
2. Vandel Kayu — kategori Vandel Kayu — Rp35.000 /pcs — badge Favorit
3. Jam Custom — kategori Jam Custom — Rp45.000 /pcs
4. Vandel Akrilik — kategori Vandel Akrilik — Rp18.000 /pcs — badge Bisa Custom
5. Plakat & Prasasti — kategori Plakat & Prasasti — Rp85.000 /pcs
6. Signage/Akrilik — kategori Signage — Rp28.000 /pcs — badge Baru
7. Vandel Kayu Eksklusif — kategori Vandel Kayu — Rp65.000 /pcs — badge Premium
8. Plakat Akrilik Premium — kategori Plakat & Prasasti — Rp95.000 /pcs — badge Terbaru

SECTION 6 — PAGINATION
- Center di bawah grid.
- Urutan: Prev, 1, 2, Next.
- Nomor 1 tampil aktif.
- Gunakan button kotak bersudut tajam.

SECTION 7 — KONTAK & LOKASI
- Full-width dua kolom sama besar desktop dan satu kolom mobile.
- Jangan memisahkannya menjadi dua section.

Kolom kiri:
- Background #092328 dan teks putih.
- Eyebrow “Mari bercerita”.
- H2 “Punya ide souvenir sendiri?”
- Paragraf “Ceritakan kebutuhanmu. Tim kami siap membantu dari ide, desain, hingga produk tiba di tangan.”
- WhatsApp +62 896-3652-8462 dan Instagram @bakul.souvenir_png.
- Form dua kolom: Nama lengkap, Nomor WhatsApp, Kebutuhan souvenir full-width, Ceritakan idemu full-width, tombol Kirim pesan full-width.

Kolom kanan:
- Background putih.
- Bagian atas berisi konten lokasi dan bagian bawah berisi map full-width minimum tinggi 430px.
- Eyebrow “Datang & lihat langsung”.
- H2 “Lokasi Workshop & Toko”.
- Paragraf “Kunjungi workshop kami untuk melihat sample material kayu, akrilik, dan kuningan serta berkonsultasi langsung dengan tim desain.”
- Alamat “Jl. Arif Rahman Hakim depan MAN 1 No. 57, Perumda, Keniten, Kec. Ponorogo, Kabupaten Ponorogo, Jawa Timur 63412”.
- Jam “Senin–Sabtu, 08.00–17.00 WIB” dan “Minggu dengan perjanjian”.
- Tombol “Buka di Google Maps”.
- Badge map: “Bakul Suvenir” dan “Workshop & Toko”.

SECTION 8 — FOOTER
- Background #092328.
- Empat kolom desktop, dua tablet, satu mobile.
- Kolom 1: brand dan “Hadiah kecil yang membawa cerita besar dari tangan perajin lokal Ponorogo.”
- Kolom 2, “Jelajahi”: Beranda, Katalog Produk, Tentang Kami, Hubungi Kami.
- Kolom 3, “Bantuan”: Cara Pemesanan, Pengiriman, Kebijakan Pengembalian, Syarat & Ketentuan.
- Kolom 4, “Kunjungi Kami”: alamat dan halo@bakulsouvenir.id.
- Divider lalu copyright:
  - “© 2026 Bakul Souvenir Ponorogo. Dibuat dengan sepenuh hati.”
  - “Pembayaran aman • Produk lokal • Kemasan rapi”

VALIDASI
- Filter harus horizontal pada desktop, bukan sidebar.
- Grid harus berisi delapan kartu dan bukan carousel.
- Pagination harus berada di bawah grid.
- Kontak & Lokasi harus tetap satu section dua kolom.
- Jangan menambahkan section baru.
- Jangan membuat floating WhatsApp button.
- Jangan menggunakan lorem ipsum.
```

---

# Page 3 — Detail Produk

**Panjang prompt: 904 kata dari batas maksimum 5.000 kata.**

Salin seluruh prompt berikut ke Relume AI:

```text
Buat wireframe satu halaman Detail Produk untuk website toko souvenir custom “Bakul Souvenir Ponorogo”. Gunakan contoh produk “Ganci Akrilik” dan Bahasa Indonesia.

PENTING: Ini adalah rekonstruksi layout yang sudah ada, bukan redesign. Jangan mengubah urutan section, jumlah kolom, posisi elemen, atau hierarki konten. Jangan menambahkan related products, review section tambahan, sidebar, carousel, floating button, FAQ, blog, newsletter, atau section lain.

ARAH VISUAL
- Gaya elegan, hangat, editorial, lokal, dan tepercaya.
- Heading serif editorial dan body sans-serif.
- Semua sudut tajam tanpa rounded corners.
- Container maksimum 1240px dan rata tengah.
- Padding horizontal 20px mobile dan 32px tablet/desktop.
- Warna: #092328, #1A4241, #12544F, #2A835F, #8BBB92, #D8D2C6, #ECE5DD, dan putih.
- Background detail warm beige.
- Gunakan border tipis dan shadow halus.
- Jangan membuat floating WhatsApp button.

Buat section dengan urutan persis:
1. Sticky Header
2. Breadcrumb
3. Detail produk dua kolom
4. Kontak & Lokasi dua kolom
5. Footer empat kolom

SECTION 1 — STICKY HEADER
- Tinggi sekitar 80px, sticky di atas, background rgba(26, 66, 65, 0.95).
- Kiri: logo monogram BS, “BAKUL SOUVENIR”, dan “PONOROGO”.
- Tengah desktop: Beranda, Katalog, Tentang Kami, Kontak.
- Tandai Katalog sebagai aktif karena detail merupakan bagian katalog.
- Kanan: area action minimal dan hamburger mobile.
- Mobile menu vertikal di bawah header.
- Jangan menambahkan CTA pada header.

SECTION 2 — BREADCRUMB
- Berada di dalam container di atas detail produk.
- Gunakan teks kecil.
- Urutan: “Katalog”, ikon chevron, “Ganci Akrilik”.
- Jangan menambahkan breadcrumb lebih dari dua level.

SECTION 3 — DETAIL PRODUK DUA KOLOM
- Desktop grid dua kolom dengan gap sekitar 64px.
- Kolom gallery di kiri dan informasi di kanan.
- Mobile menumpuk gallery lebih dulu lalu informasi.

Kolom kiri — Gallery:
1. Satu image utama persegi besar.
2. Tiga thumbnail persegi dalam satu baris di bawah image utama.
3. Gap thumbnail kecil dan konsisten.
4. Thumbnail memakai border tipis.
5. Jangan mengubah gallery menjadi carousel, slider, atau masonry.

Kolom kanan — Informasi:
- Konten rata tengah secara vertikal terhadap gallery.
- Urutan wajib:
  1. Baris badge: “Ganci Akrilik” dan “Terlaris”.
  2. H1 serif besar: “Ganci Akrilik”.
  3. Harga: “Rp12.000 /pcs”.
  4. Deskripsi: “Souvenir custom berkualitas yang dapat disesuaikan dengan logo, nama, warna, dan kebutuhan acara Anda. Tim kami siap membantu menyiapkan desain yang sesuai dengan identitas dan anggaran.”
  5. Tabel spesifikasi empat baris.
  6. Dua tombol sejajar pada desktop dan bertumpuk pada mobile.
  7. Catatan harga kecil.

Tabel spesifikasi:
- Kategori — Ganci Akrilik
- Personalisasi — Logo, nama, teks, dan warna
- Material — Dapat disesuaikan dengan kebutuhan
- Konsultasi — Gratis konsultasi desain

Tombol:
- Primary dengan ikon WhatsApp: “Pesan Produk via WhatsApp”
- Secondary dengan panah kembali: “Kembali ke Katalog”

Catatan:
“Harga dapat berubah mengikuti material, ukuran, jumlah, dan tingkat kerumitan desain.”

Jangan menambahkan quantity selector, varian warna, review rating, social share, accordion, atau rekomendasi produk pada area detail permanen.

COMPONENT STATE — MODAL PESAN WHATSAPP
Jika Relume mendukung modal, buat sebagai component state, bukan section permanen.
- Desktop berupa drawer di sisi kanan, maksimum lebar sekitar 512px.
- Mobile berupa bottom sheet.
- Backdrop gelap.
- Urutan isi:
  1. Eyebrow “Generator pesanan”
  2. Judul “Pesan via WhatsApp”
  3. Tombol close
  4. Ringkasan produk dengan thumbnail, kategori, nama, dan lead time
  5. Input “Jumlah pesanan”
  6. Tiga pilihan: 50 pcs, 100 pcs, 500+ pcs
  7. Textarea “Teks atau detail custom”
  8. Upload “Pilih referensi logo/desain”
  9. Ringkasan harga setelah diskon
  10. Tombol “Lanjutkan ke WhatsApp”
  11. Catatan redirect ke WhatsApp
- Jangan menampilkan modal sebagai section halaman.

SECTION 4 — KONTAK & LOKASI
- Full-width dua kolom sama besar desktop dan satu kolom mobile.
- Jangan memisahkannya menjadi dua section.

Kolom kiri:
- Background #092328 dan teks putih.
- Eyebrow “Mari bercerita”.
- H2 “Punya ide souvenir sendiri?”
- Paragraf “Ceritakan kebutuhanmu. Tim kami siap membantu dari ide, desain, hingga produk tiba di tangan.”
- WhatsApp +62 896-3652-8462 dan Instagram @bakul.souvenir_png.
- Form dua kolom: Nama lengkap, Nomor WhatsApp, Kebutuhan souvenir full-width, Ceritakan idemu full-width, tombol Kirim pesan full-width.

Kolom kanan:
- Background putih.
- Konten lokasi di atas dan map full-width minimum tinggi 430px di bawah.
- Eyebrow “Datang & lihat langsung”.
- H2 “Lokasi Workshop & Toko”.
- Paragraf “Kunjungi workshop kami untuk melihat sample material kayu, akrilik, dan kuningan serta berkonsultasi langsung dengan tim desain.”
- Alamat “Jl. Arif Rahman Hakim depan MAN 1 No. 57, Perumda, Keniten, Kec. Ponorogo, Kabupaten Ponorogo, Jawa Timur 63412”.
- Jam “Senin–Sabtu, 08.00–17.00 WIB” dan “Minggu dengan perjanjian”.
- Tombol “Buka di Google Maps”.
- Badge map: “Bakul Suvenir” dan “Workshop & Toko”.

SECTION 5 — FOOTER
- Background #092328.
- Empat kolom desktop, dua tablet, satu mobile.
- Kolom 1: brand dan “Hadiah kecil yang membawa cerita besar dari tangan perajin lokal Ponorogo.”
- Kolom 2, “Jelajahi”: Beranda, Katalog Produk, Tentang Kami, Hubungi Kami.
- Kolom 3, “Bantuan”: Cara Pemesanan, Pengiriman, Kebijakan Pengembalian, Syarat & Ketentuan.
- Kolom 4, “Kunjungi Kami”: alamat dan halo@bakulsouvenir.id.
- Divider lalu copyright:
  - “© 2026 Bakul Souvenir Ponorogo. Dibuat dengan sepenuh hati.”
  - “Pembayaran aman • Produk lokal • Kemasan rapi”

VALIDASI
- Breadcrumb harus berada di atas layout detail.
- Gallery harus di kiri dan informasi di kanan pada desktop.
- Gallery bukan carousel.
- Jangan menambahkan related products atau review section.
- Kontak & Lokasi harus tetap satu section dua kolom.
- Jangan menambahkan section baru.
- Jangan membuat floating WhatsApp button.
- Jangan menggunakan lorem ipsum.
```

---

## Urutan penggunaan di Relume

1. Buat page **Home** dan gunakan Prompt Page 1.
2. Buat page **Katalog Lengkap** dan gunakan Prompt Page 2.
3. Buat page **Detail Produk** dan gunakan Prompt Page 3.
4. Periksa bahwa Header, Kontak & Lokasi, serta Footer konsisten pada ketiga page.
5. Tolak rekomendasi section tambahan dari Relume agar layout tetap sama dengan desain acuan.
