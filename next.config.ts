import type { NextConfig } from "next";

function getHost(value: string | undefined) {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return null;
  }

  try {
    return new URL(
      trimmed.includes("://") ? trimmed : `http://${trimmed}`,
    ).host;
  } catch {
    return null;
  }
}

const adminOrigins = Array.from(
  new Set(
    [
      getHost(process.env.ADMIN_HOST ?? "admin.localhost"),
      getHost(process.env.ADMIN_URL ?? "http://admin.localhost:3000"),
    ].filter((host): host is string => Boolean(host)),
  ),
);

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    serverActions: {
      // Next.js compares Origin with x-forwarded-host. The dev server can
      // report the admin host without its port, so allow both forms.
      allowedOrigins: adminOrigins,
    },
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
