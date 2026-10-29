# Bakul Souvenir

Bakul Souvenir terdiri dari dua area yang dipisahkan berdasarkan hostname:

- **Katalog publik** untuk pengunjung di `bakulsouvenir.com`.
- **Panel admin** untuk pengelola toko di `admin.bakulsouvenir.com`.

Keduanya memakai satu aplikasi Next.js, satu database, dan satu deployment.
Pemisahan host dilakukan oleh `src/proxy.ts`. Katalog publik menampilkan produk
aktif, filter, pencarian, pagination, dan halaman detail; panel admin mengelola
produk serta filter tersebut.

## Fitur

- Landing page publik di domain utama.
- Katalog publik di `/produk`: pencarian, filter, pengurutan, pagination, dan
  halaman detail `/produk/[slug]`.
- Cache katalog publik dengan tag `catalog:products` dan `catalog:filters`;
  perubahan dari admin langsung memperbarui cache lewat `updateTag()`.
- Panel admin terpisah di subdomain `admin`.
- Redirect `www` ke domain utama.
- Login admin dengan session yang disimpan di database.
- CRUD produk: nama, slug, deskripsi, harga Rupiah, status, dan filter.
- CRUD group filter dan opsi filter tanpa mengubah kode.
- Pencarian, filter tag/status, pengurutan, dan pagination produk admin.
- Proteksi seluruh halaman admin dan Server Action lewat `requireAdmin()`.
- Seed data contoh: 1 admin, 3 group filter, dan 20 produk.

## Stack

- [Next.js 16.4.3](https://nextjs.org) App Router dengan Cache Components
- React 19 + TypeScript
- MySQL 8 + Prisma 7.10.1 (`@prisma/adapter-mariadb`, driver `mariadb`)
- Auth database-session (`bcryptjs`, tabel `Session`)
- Zod 4 + Server Actions + `useActionState`
- shadcn/ui base Radix (preset `nova`), Tailwind CSS 4, Lucide, Geist

## Prasyarat

- Node.js 20.9+ (disarankan versi yang dipakai proyek: Node.js 24)
- MySQL 8 yang berjalan dan bisa diakses
- npm

## Setup

1. Install dependency.

   ```bash
   npm install
   ```

2. Buat file environment.

   **PowerShell**

   ```powershell
   Copy-Item .env.example .env
   ```

   **bash**

   ```bash
   cp .env.example .env
   ```

3. Isi `.env`:

   ```dotenv
   DATABASE_URL="mysql://user:password@127.0.0.1:3306/bakul_souvenir"
   SEED_ADMIN_EMAIL="admin@bakulsouvenir.local"
   SEED_ADMIN_PASSWORD="ganti-sebelum-seed"
   SEED_ADMIN_NAME="Administrator"

   ADMIN_HOST="admin.localhost"
   PUBLIC_HOST="localhost"
   ADMIN_URL="http://admin.localhost:3000"
   SITE_URL="http://localhost:3000"
   ```

   `ADMIN_HOST` dan `PUBLIC_HOST` diisi hostname saja, tanpa protokol dan tanpa
   port. `ADMIN_URL` dan `SITE_URL` diisi URL lengkap. Password seed harus 8-72
   karakter. Jangan commit `.env`.

4. Buat database MySQL (sekali saja).

   ```sql
   CREATE DATABASE bakul_souvenir
     CHARACTER SET utf8mb4
     COLLATE utf8mb4_unicode_ci;
   ```

5. Jalankan migrasi, generate Prisma Client, lalu seed.

   ```bash
   npm run db:deploy
   npm run db:seed
   ```

6. Jalankan development server.

   ```bash
   npm run dev
   ```

7. Buka area sesuai hostname:

   | Area | URL lokal |
   | --- | --- |
   | Katalog publik | [http://localhost:3000](http://localhost:3000) |
   | Panel admin | [http://admin.localhost:3000/admin/login](http://admin.localhost:3000/admin/login) |

   Browser modern biasanya sudah mengarahkan `*.localhost` ke loopback. Jika
   `admin.localhost` tidak bisa dibuka, gunakan host lokal lain seperti
   `admin.lvh.me:3000`, lalu sesuaikan `ADMIN_HOST`, `ADMIN_URL`, dan
   `allowedDevOrigins` di `next.config.ts`.

Login memakai `SEED_ADMIN_EMAIL` dan `SEED_ADMIN_PASSWORD` dari `.env` saat seed
pertama. Seed bersifat idempotent, tetapi **tidak menimpa password admin yang
sudah ada**. Jika password perlu diubah, update lewat database atau hapus user
lalu seed ulang.

## Scripts

| Script | Fungsi |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | `prisma generate` lalu build production |
| `npm run start` | Menjalankan hasil build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Pemeriksaan TypeScript |
| `npm run db:generate` | Generate Prisma Client ke `src/generated/prisma` |
| `npm run db:migrate` | `prisma migrate dev` + generate (pengembangan) |
| `npm run db:deploy` | Terapkan migrasi yang sudah ada + generate |
| `npm run db:seed` | Jalankan `prisma/seed.ts` |
| `npm run db:studio` | Buka Prisma Studio |
| `npm run db:reset` | Reset database, migrasi ulang, dan seed (destruktif) |

Prisma Client hasil generate tidak di-commit. Jalankan `npm run db:generate`
setelah clone, install, atau perubahan schema.

Untuk membuat migrasi baru saat mengubah schema:

```bash
npx prisma migrate dev --name nama_perubahan
npm run db:generate
```

## Struktur

```text
prisma/
  schema.prisma          Schema database
  seed.ts                Admin, filter, dan produk contoh
  migrations/            Riwayat migrasi
src/
  proxy.ts               Routing berdasarkan host dan redirect www/admin
  app/
    (public)/            Landing, daftar produk, dan detail katalog publik
    (admin)/admin/       Halaman dan layout admin
    (auth)/admin/login/  Halaman login
    api/internal/        Route internal redirect www
    layout.tsx           Root layout dan metadata umum
  components/
    admin/               Shell, tabel, form, dialog, pagination
    auth/                Form login
    catalog/             Filter, kartu produk, pagination, skeleton publik
    ui/                  Komponen shadcn/ui
  features/
    auth/                Password, session, DAL, rate limit, actions
    catalog/             Tipe, query publik/admin, cache tag, validasi, actions
  lib/
    prisma.ts            Singleton Prisma + adapter MariaDB
    site.ts              Helper URL publik untuk canonical dan JSON-LD
```

## Rute

| Host | Rute | Akses | Keterangan |
| --- | --- | --- | --- |
| Publik | `/` | Publik | Landing page katalog |
| Publik | `/produk` | Publik | Daftar produk aktif dengan cari, filter, urutkan, pagination |
| Publik | `/produk/[slug]` | Publik | Detail produk aktif; status lain menghasilkan 404 |
| Publik | `/admin/*` | - | Redirect ke host admin |
| Admin | `/` | - | Redirect ke `/admin` |
| Admin | `/admin` | Admin | Redirect ke `/admin/produk` |
| Admin | `/admin/login` | Publik | Login admin |
| Admin | `/admin/produk` | Admin | Daftar, cari, filter, urutkan produk |
| Admin | `/admin/produk/new` | Admin | Tambah produk |
| Admin | `/admin/produk/[id]/edit` | Admin | Edit dan hapus produk |
| Admin | `/admin/filter` | Admin | CRUD group filter |
| Admin | `/admin/filter/[groupId]` | Admin | CRUD opsi filter |
| `www` | `/*` | - | Redirect permanen ke domain utama |
| Internal | `/api/internal/redirect` | Internal | Route redirect `www`; target dibatasi origin `SITE_URL` |

Semua rute admin di host admin dilindungi oleh `requireAdmin()` di
`src/app/(admin)/admin/layout.tsx`. Setiap Server Action juga memanggil
`requireAdmin()` sendiri; jangan hanya mengandalkan layout atau proxy.

`src/proxy.ts` hanya menangani routing host, redirect `www`, dan pemisahan
`/admin/*`. Redirect `www` memakai rewrite internal ke
`/api/internal/redirect` agar redirect same-origin tidak dinormalisasi menjadi
path relatif oleh Next dev. Proxy bukan pengganti autentikasi.

## Model data

- **Product** - `name`, `slug` unik, `description`, `price` (`Int`, Rupiah tanpa
  desimal), `status` (`DRAFT` / `ACTIVE` / `ARCHIVED`), timestamps.
- **FilterGroup** - `key` unik, `label`, `type`
  (`MULTI_SELECT` / `SINGLE_SELECT`), `isSystem`, `isActive`, `sortOrder`.
- **FilterOption** - milik satu group, unik per `[groupId, slug]`, punya
  `isActive` dan `sortOrder`.
- **ProductFilterValue** - join table produk dan opsi filter.
- **User** - akun admin, password bcrypt, status aktif.
- **Session** - hash token, expiry, IP, user agent, relasi ke user.

Group dengan key `tag` adalah filter sistem untuk tag produk. Group ini tidak
bisa dihapus dan tipenya dikunci sebagai banyak pilihan. Menghapus product,
group, atau opsi akan meng-cascade nilai filter yang terkait; dialog hapus di UI
menjelaskan dampaknya.

## Auth dan keamanan

- Password di-hash dengan bcrypt cost 12.
- Login membuat token acak 32 byte. Cookie `bakul_session` bersifat HttpOnly,
  SameSite Lax, Secure di production, dan berlaku 7 hari.
- Cookie session bersifat **host-only** untuk host admin. Cookie tidak dikirim
  ke domain katalog publik dan tidak memakai `domain=.bakulsouvenir.com`.
- Database hanya menyimpan SHA-256 hash token.
- Semua halaman admin dilindungi di layout, dan setiap Server Action memanggil
  `requireAdmin()` sendiri.
- Login dibatasi 5 percobaan per 15 menit per kombinasi email + IP.
- Tidak ada registrasi publik. Admin dibuat lewat seed atau operasi database.
- Rate limiter masih in-memory: hilang saat restart dan tidak cocok untuk
  deployment multi-instance. Ganti ke Redis atau database bila diperlukan.
- Cookie Secure membutuhkan HTTPS di production.

## Catatan pengembangan

- Cache Components aktif. Layout dan halaman data admin memakai
  `instant = false`, dan halaman yang membaca database memanggil
  `await connection()` sebelum query. Jangan menghapus keduanya tanpa menguji
  `npm run build` dan `next dev`.
- Semua mutasi admin memakai Server Action + Zod. Setelah mutasi, halaman admin
  terkait di-revalidate dengan `revalidatePath()`.
- Query katalog publik memakai `use cache` + `cacheLife("hours")` + `cacheTag()`
  dengan tag `catalog:products` dan `catalog:filters`. Semua mutasi produk/filter
  memanggil `updateTag()` untuk kedua tag lewat helper yang sudah ada, sehingga
  daftar dan detail publik ikut berubah tanpa menunggu TTL.
- Halaman detail `/produk/[slug]` memakai `instant = false` agar DRAFT,
  ARCHIVED, atau slug yang tidak ada mengembalikan HTTP 404 nyata. Daftar
  `/produk` tetap static shell dan konten katalog di-stream di dalam
  `<Suspense>`.
- Harga selalu bilangan bulat Rupiah dan diformat di UI dengan locale `id-ID`.
- Opsi filter yang nonaktif tidak bisa dipilih baru, tetapi tetap dipertahankan
  jika sudah terpasang pada produk agar data lama tidak hilang.
- Petunjuk kontribusi dan konvensi lengkap ada di `AGENTS.md`.

## Verifikasi

```bash
npm run typecheck
npm run lint
npm run build
```

Untuk perubahan auth atau CRUD, uji juga alur nyata: redirect saat belum login,
login berhasil, tambah/edit/hapus produk, serta CRUD group dan opsi filter.

Untuk perubahan katalog publik, uji:

- `/produk` hanya menampilkan produk `ACTIVE` dan filter/opsi aktif.
- Pencarian, filter multi-select, pengurutan, dan pagination mempertahankan
  query yang aktif.
- Detail produk aktif mengembalikan `200`; DRAFT/ARCHIVED/tidak ada `404`.
- Canonical dan JSON-LD memakai `SITE_URL`.
- Setelah edit produk dari admin, daftar dan detail publik langsung berubah
  tanpa menunggu TTL (bukti `updateTag()`), lalu data uji dikembalikan.

Untuk perubahan host routing, uji:

- `http://localhost:3000/` menampilkan katalog publik.
- `http://localhost:3000/admin` redirect ke host admin.
- `http://admin.localhost:3000/` redirect ke `/admin`.
- `http://admin.localhost:3000/produk` tidak membuka halaman publik.
- Login admin berhasil dan cookie hanya berlaku di host admin.
- `http://www.localhost:3000/produk?q=tote` mengembalikan `308` ke
  `http://localhost:3000/produk?q=tote` tanpa loop.

## Deployment

1. Set environment production:

   ```dotenv
   ADMIN_HOST="admin.bakulsouvenir.com"
   PUBLIC_HOST="bakulsouvenir.com"
   ADMIN_URL="https://admin.bakulsouvenir.com"
   SITE_URL="https://bakulsouvenir.com"
   ```

2. Arahkan DNS `admin` dan `www` ke deployment yang sama.
3. Pastikan reverse proxy meneruskan header `Host` atau `x-forwarded-host`.
4. Gunakan HTTPS dengan wildcard certificate atau certificate terpisah untuk
   domain utama dan subdomain admin.
5. Jalankan `npm run db:deploy`, lalu `npm run build`.
6. Jalankan dengan `npm run start` di balik HTTPS.

Pastikan database MySQL bisa diakses dari environment deploy dan `.env` tidak
ikut masuk repository. Jangan set cookie session dengan domain induk; biarkan
cookie tetap host-only untuk subdomain admin.
