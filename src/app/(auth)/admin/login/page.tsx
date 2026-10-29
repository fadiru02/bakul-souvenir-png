import type { Metadata } from "next";
import { LockKeyhole, Store } from "lucide-react";

import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Masuk Admin",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Store className="size-6" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight">
            Bakul Souvenir
          </h1>
          <p className="text-sm text-muted-foreground">
            Panel admin katalog produk
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="size-4" aria-hidden="true" />
              Masuk ke akun admin
            </CardTitle>
            <CardDescription>
              Gunakan email dan password yang diberikan administrator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Halaman ini khusus pengelola toko. Tidak ada pendaftaran publik.
        </p>
      </div>
    </main>
  );
}
