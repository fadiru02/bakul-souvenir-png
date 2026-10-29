import { CircleAlert, CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function FlashMessage({
  message,
  variant = "success",
}: {
  message?: string;
  variant?: "success" | "destructive";
}) {
  if (!message) {
    return null;
  }

  return (
    <Alert variant={variant === "destructive" ? "destructive" : "default"}>
      {variant === "success" ? (
        <CircleCheck aria-hidden="true" />
      ) : (
        <CircleAlert aria-hidden="true" />
      )}
      <AlertTitle>
        {variant === "success" ? "Berhasil" : "Tidak dapat diproses"}
      </AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
