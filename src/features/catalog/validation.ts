import { z } from "zod";

export const RESERVED_FILTER_KEYS = new Set([
  "q",
  "status",
  "tag",
  "sort",
  "page",
  "pageSize",
  "minPrice",
  "maxPrice",
]);

const slugSchema = z
  .string()
  .trim()
  .min(2, "Slug minimal 2 karakter.")
  .max(180, "Slug maksimal 180 karakter.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.",
  );

const optionSlugSchema = z
  .string()
  .trim()
  .min(1, "Slug minimal 1 karakter.")
  .max(120, "Slug maksimal 120 karakter.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung.",
  );

const checkboxSchema = z.preprocess(
  (value) => value === "on" || value === "true" || value === true,
  z.boolean(),
);

const sortOrderSchema = z.preprocess(
  (value) => (value === "" || value == null ? 0 : Number(value)),
  z
    .number()
    .int("Urutan harus bilangan bulat.")
    .min(0, "Urutan minimal 0.")
    .max(9999, "Urutan maksimal 9999."),
);

const priceSchema = z.preprocess(
  (value) => (value === "" || value == null ? Number.NaN : Number(value)),
  z
    .number()
    .int("Harga harus bilangan bulat.")
    .min(0, "Harga tidak boleh negatif.")
    .max(1_000_000_000, "Harga terlalu besar."),
);

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama produk minimal 2 karakter.")
    .max(150, "Nama produk maksimal 150 karakter."),
  slug: slugSchema,
  description: z
    .string()
    .trim()
    .min(5, "Deskripsi minimal 5 karakter.")
    .max(5000, "Deskripsi maksimal 5000 karakter."),
  price: priceSchema,
  status: z.enum(["DRAFT", "ACTIVE", "ARCHIVED"]),
  optionIds: z.array(z.string().min(1)).default([]),
});

export const filterGroupCreateSchema = z.object({
  key: z
    .string()
    .trim()
    .min(2, "Key minimal 2 karakter.")
    .max(50, "Key maksimal 50 karakter.")
    .regex(
      /^[a-z][a-z0-9_-]*$/,
      "Key harus dimulai huruf kecil dan hanya berisi huruf, angka, _ atau -.",
    )
    .refine((key) => !RESERVED_FILTER_KEYS.has(key), {
      message: "Key ini dipakai sistem, pilih key lain.",
    }),
  label: z
    .string()
    .trim()
    .min(2, "Label minimal 2 karakter.")
    .max(100, "Label maksimal 100 karakter."),
  type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]),
  isActive: checkboxSchema,
  sortOrder: sortOrderSchema,
});

export const filterGroupUpdateSchema = filterGroupCreateSchema.omit({
  key: true,
});

export const filterOptionSchema = z.object({
  label: z
    .string()
    .trim()
    .min(1, "Label opsi minimal 1 karakter.")
    .max(100, "Label opsi maksimal 100 karakter."),
  slug: optionSlugSchema,
  isActive: checkboxSchema,
  sortOrder: sortOrderSchema,
});

export function readProductFormData(formData: FormData) {
  return {
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    price: formData.get("price"),
    status: formData.get("status"),
    optionIds: formData.getAll("optionIds").map(String),
  };
}

export function readFilterGroupFormData(formData: FormData) {
  return {
    key: formData.get("key"),
    label: formData.get("label"),
    type: formData.get("type"),
    isActive: formData.get("isActive"),
    sortOrder: formData.get("sortOrder"),
  };
}

export function readFilterOptionFormData(formData: FormData) {
  return {
    label: formData.get("label"),
    slug: formData.get("slug"),
    isActive: formData.get("isActive"),
    sortOrder: formData.get("sortOrder"),
  };
}

export function flattenFieldErrors(
  error: z.ZodError,
): Record<string, string[]> {
  return error.flatten().fieldErrors;
}
