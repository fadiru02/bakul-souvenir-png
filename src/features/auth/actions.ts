"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { verifyPassword } from "./password";
import {
  checkLoginRateLimit,
  resetLoginRateLimit,
} from "./rate-limit";
import {
  createSession,
  deleteExpiredSessions,
  destroySession,
} from "./session";
import { loginSchema } from "./validation";

export type LoginState = {
  error?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

async function getRequestMeta() {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  const ipAddress =
    forwardedFor?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown";

  return {
    ipAddress: ipAddress.slice(0, 45),
    userAgent: requestHeaders.get("user-agent")?.slice(0, 255),
  };
}

export async function login(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const meta = await getRequestMeta();
  const rateLimitKey = `${parsed.data.email}:${meta.ipAddress}`;
  const rateLimit = checkLoginRateLimit(rateLimitKey);

  if (!rateLimit.allowed) {
    const minutes = Math.max(
      1,
      Math.ceil((rateLimit.retryAfterMs ?? 0) / 60000),
    );

    return {
      error: `Terlalu banyak percobaan login. Coba lagi dalam ${minutes} menit.`,
    };
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: {
      id: true,
      passwordHash: true,
      isActive: true,
    },
  });

  const isValid =
    user?.isActive &&
    (await verifyPassword(parsed.data.password, user.passwordHash));

  if (!isValid) {
    return {
      error: "Email atau password salah.",
    };
  }

  resetLoginRateLimit(rateLimitKey);
  await deleteExpiredSessions();
  await createSession(user.id, meta);
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  });

  redirect("/admin/produk");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
