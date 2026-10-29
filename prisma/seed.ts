import "dotenv/config";

import { hash } from "bcryptjs";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../src/generated/prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set.");
}

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(databaseUrl),
});

type SeedProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  status: "DRAFT" | "ACTIVE" | "ARCHIVED";
  tags: string[];
  colors: string[];
  materials: string[];
};

const products: SeedProduct[] = [
  {
    name: "Tote Bag Kanvas Custom",
    slug: "tote-bag-kanvas-custom",
    description:
      "Tote bag kanvas tebal dengan sablon custom. Cocok untuk souvenir kantor, seminar, dan pernikahan.",
    price: 45000,
    status: "ACTIVE",
    tags: ["souvenir", "custom", "handmade"],
    colors: ["natural", "hitam"],
    materials: ["kain"],
  },
  {
    name: "Mug Keramik Premium",
    slug: "mug-keramik-premium",
    description:
      "Mug keramik premium 350 ml dengan opsi cetak logo full color.",
    price: 35000,
    status: "ACTIVE",
    tags: ["souvenir", "custom"],
    colors: ["putih", "hitam"],
    materials: ["keramik"],
  },
  {
    name: "Gantungan Kunci Kayu Ukir",
    slug: "gantungan-kunci-kayu-ukir",
    description:
      "Gantungan kunci kayu ukir dengan nama atau logo. Dikerjakan handmade oleh pengrajin lokal.",
    price: 15000,
    status: "ACTIVE",
    tags: ["souvenir", "handmade", "murah"],
    colors: ["natural"],
    materials: ["kayu"],
  },
  {
    name: "Lanyard Custom Printing",
    slug: "lanyard-custom-printing",
    description:
      "Lanyard printing full color dengan hook dan safety clip. Minimum order 50 pcs.",
    price: 12000,
    status: "ACTIVE",
    tags: ["souvenir", "custom", "kantor"],
    colors: ["hitam", "navy", "merah"],
    materials: ["kain"],
  },
  {
    name: "Pulpen Metal Eksklusif",
    slug: "pulpen-metal-eksklusif",
    description:
      "Pulpen metal dengan ukiran laser logo perusahaan. Packing box tersedia.",
    price: 28000,
    status: "ACTIVE",
    tags: ["souvenir", "premium", "kantor"],
    colors: ["hitam", "navy"],
    materials: ["logam"],
  },
  {
    name: "Notebook Kulit Custom",
    slug: "notebook-kulit-custom",
    description:
      "Notebook A5 dengan cover kulit sintetis dan emboss logo.",
    price: 65000,
    status: "ACTIVE",
    tags: ["souvenir", "premium", "kantor"],
    colors: ["hitam", "natural"],
    materials: ["kulit"],
  },
  {
    name: "Topi Baseball Bordir",
    slug: "topi-baseball-bordir",
    description:
      "Topi baseball dengan bordir logo. Tersedia beberapa pilihan warna.",
    price: 40000,
    status: "ACTIVE",
    tags: ["custom", "kantor"],
    colors: ["hitam", "navy", "putih"],
    materials: ["kain"],
  },
  {
    name: "Tumbler Stainless 500ml",
    slug: "tumbler-stainless-500ml",
    description:
      "Tumbler stainless steel 500 ml, tahan panas dan dingin, bisa custom laser.",
    price: 85000,
    status: "ACTIVE",
    tags: ["souvenir", "premium", "custom"],
    colors: ["hitam", "putih"],
    materials: ["logam"],
  },
  {
    name: "Pouch Kanvas Serut",
    slug: "pouch-kanvas-serut",
    description:
      "Pouch kanvas dengan tali serut, cocok untuk hampers dan souvenir pernikahan.",
    price: 18000,
    status: "ACTIVE",
    tags: ["souvenir", "pernikahan", "murah"],
    colors: ["natural"],
    materials: ["kain"],
  },
  {
    name: "Bingkai Foto Kayu Minimalis",
    slug: "bingkai-foto-kayu-minimalis",
    description:
      "Bingkai foto kayu minimalis ukuran 4R, bisa custom ukiran nama.",
    price: 55000,
    status: "ACTIVE",
    tags: ["souvenir", "pernikahan", "handmade"],
    colors: ["natural"],
    materials: ["kayu"],
  },
  {
    name: "Piring Keramik Custom",
    slug: "piring-keramik-custom",
    description:
      "Piring keramik custom dengan sablon atau hand lettering. Cocok untuk hadiah.",
    price: 75000,
    status: "ACTIVE",
    tags: ["souvenir", "premium", "custom"],
    colors: ["putih"],
    materials: ["keramik"],
  },
  {
    name: "Dompet Kulit Handmade",
    slug: "dompet-kulit-handmade",
    description:
      "Dompet kulit asli handmade dengan opsi monogram inisial.",
    price: 125000,
    status: "ACTIVE",
    tags: ["premium", "handmade"],
    colors: ["hitam", "natural"],
    materials: ["kulit"],
  },
  {
    name: "Sticky Notes Set",
    slug: "sticky-notes-set",
    description:
      "Set sticky notes dengan cover custom, terdiri dari 3 blok catatan.",
    price: 22000,
    status: "ACTIVE",
    tags: ["souvenir", "kantor", "murah"],
    colors: ["putih", "merah"],
    materials: ["kain"],
  },
  {
    name: "Gelas Kaca Custom",
    slug: "gelas-kaca-custom",
    description:
      "Gelas kaca dengan sablon logo, cocok untuk souvenir korporat.",
    price: 48000,
    status: "DRAFT",
    tags: ["souvenir", "custom"],
    colors: ["putih"],
    materials: ["keramik"],
  },
  {
    name: "Kalender Meja Kayu",
    slug: "kalender-meja-kayu",
    description:
      "Kalender meja kayu dengan blok kalender yang bisa diganti setiap tahun.",
    price: 60000,
    status: "ACTIVE",
    tags: ["kantor", "handmade"],
    colors: ["natural"],
    materials: ["kayu"],
  },
  {
    name: "Tas Jinjing Spunbond",
    slug: "tas-jinjing-spunbond",
    description:
      "Tas jinjing spunbond custom dengan sablon, pilihan ekonomis untuk acara.",
    price: 9500,
    status: "ACTIVE",
    tags: ["souvenir", "murah", "custom"],
    colors: ["hitam", "putih", "hijau"],
    materials: ["kain"],
  },
  {
    name: "Set Sendok Garpu Stainless",
    slug: "set-sendok-garpu-stainless",
    description:
      "Set sendok dan garpu stainless dalam pouch, cocok untuk hampers premium.",
    price: 95000,
    status: "ACTIVE",
    tags: ["souvenir", "premium", "pernikahan"],
    colors: ["hitam", "navy"],
    materials: ["logam"],
  },
  {
    name: "Pengharum Ruangan Souvenir",
    slug: "pengharum-ruangan-souvenir",
    description:
      "Pengharum ruangan aroma lavender dengan label custom, cocok untuk hampers.",
    price: 32000,
    status: "ACTIVE",
    tags: ["souvenir", "pernikahan", "handmade"],
    colors: ["putih"],
    materials: ["keramik"],
  },
  {
    name: "Kipas Lipat Custom",
    slug: "kipas-lipat-custom",
    description:
      "Kipas lipat dengan cetak foto atau logo. Sering dipakai untuk souvenir pernikahan.",
    price: 12000,
    status: "ACTIVE",
    tags: ["souvenir", "pernikahan", "murah"],
    colors: ["merah", "hijau", "putih"],
    materials: ["kain"],
  },
  {
    name: "Jam Dinding Kayu Custom",
    slug: "jam-dinding-kayu-custom",
    description:
      "Jam dinding kayu dengan ukiran logo perusahaan. Mesin jam senyap.",
    price: 150000,
    status: "DRAFT",
    tags: ["kantor", "handmade", "premium"],
    colors: ["natural"],
    materials: ["kayu"],
  },
];

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;
  const adminName = process.env.SEED_ADMIN_NAME ?? "Administrator";

  if (!adminEmail || !adminPassword) {
    throw new Error(
      "SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be set before seeding.",
    );
  }

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash: await hash(adminPassword, 12),
    },
  });

  const groupDefinitions = [
    {
      key: "tag",
      label: "Tag Produk",
      type: "MULTI_SELECT" as const,
      isSystem: true,
      sortOrder: 0,
      options: [
        "souvenir",
        "custom",
        "handmade",
        "premium",
        "murah",
        "kantor",
        "pernikahan",
      ],
    },
    {
      key: "warna",
      label: "Warna",
      type: "MULTI_SELECT" as const,
      isSystem: false,
      sortOrder: 1,
      options: ["hitam", "putih", "navy", "merah", "hijau", "natural"],
    },
    {
      key: "bahan",
      label: "Bahan",
      type: "SINGLE_SELECT" as const,
      isSystem: false,
      sortOrder: 2,
      options: ["kayu", "kain", "keramik", "logam", "kulit"],
    },
  ];

  const optionIds = new Map<string, Map<string, string>>();

  for (const definition of groupDefinitions) {
    const group = await prisma.filterGroup.upsert({
      where: { key: definition.key },
      update: {
        label: definition.label,
        type: definition.type,
        sortOrder: definition.sortOrder,
      },
      create: {
        key: definition.key,
        label: definition.label,
        type: definition.type,
        isSystem: definition.isSystem,
        sortOrder: definition.sortOrder,
      },
    });

    const groupOptions = new Map<string, string>();

    for (const [index, slug] of definition.options.entries()) {
      const option = await prisma.filterOption.upsert({
        where: {
          groupId_slug: { groupId: group.id, slug },
        },
        update: {
          label: slug
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" "),
          sortOrder: index,
        },
        create: {
          groupId: group.id,
          label: slug
            .split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" "),
          slug,
          sortOrder: index,
        },
      });

      groupOptions.set(slug, option.id);
    }

    optionIds.set(definition.key, groupOptions);
  }

  for (const item of products) {
    const product = await prisma.product.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        description: item.description,
        price: item.price,
        status: item.status,
      },
      create: {
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        status: item.status,
      },
    });

    const tags = optionIds.get("tag");
    const colors = optionIds.get("warna");
    const materials = optionIds.get("bahan");

    const selectedIds = [
      ...item.tags.map((slug) => tags?.get(slug)),
      ...item.colors.map((slug) => colors?.get(slug)),
      ...item.materials.map((slug) => materials?.get(slug)),
    ].filter((id): id is string => Boolean(id));

    await prisma.productFilterValue.deleteMany({
      where: { productId: product.id },
    });

    await prisma.productFilterValue.createMany({
      data: selectedIds.map((optionId) => ({
        productId: product.id,
        optionId,
      })),
    });
  }

  console.log(
    `Seed selesai: ${products.length} produk, ${groupDefinitions.length} group filter, admin ${adminEmail}.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
