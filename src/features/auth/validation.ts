import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email wajib diisi.")
    .max(191, "Email terlalu panjang.")
    .email("Format email tidak valid.")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter.")
    .max(72, "Password maksimal 72 karakter."),
});

export type LoginInput = z.infer<typeof loginSchema>;
