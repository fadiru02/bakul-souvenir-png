import "server-only";

const DEFAULT_SITE_URL = "http://localhost:3000";

export function getSiteUrl() {
  const value = process.env.SITE_URL?.trim();

  return value ? value.replace(/\/+$/, "") : DEFAULT_SITE_URL;
}
