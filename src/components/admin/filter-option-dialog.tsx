"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle, Pencil, Plus } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createFilterOption,
  updateFilterOption,
} from "@/features/catalog/actions";
import { slugify } from "@/features/catalog/slug";
import type { FilterOptionRow, FormState } from "@/features/catalog/types";

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) {
    return null;
  }

  return (
    <div className="space-y-1">
      {messages.map((message) => (
        <p key={message} className="text-xs text-destructive">
          {message}
        </p>
      ))}
    </div>
  );
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <LoaderCircle className="animate-spin" aria-hidden="true" />
      ) : null}
      {pending ? "Menyimpan..." : label}
    </Button>
  );
}

const initialState: FormState = {};

export function FilterOptionDialog({
  groupId,
  groupLabel,
  option,
}: {
  groupId: string;
  groupLabel: string;
  option?: FilterOptionRow;
}) {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(option?.label ?? "");
  const [slug, setSlug] = useState(option?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(option));
  const action = option
    ? updateFilterOption.bind(null, option.id, groupId)
    : createFilterOption.bind(null, groupId);
  const [state, formAction] = useActionState(action, initialState);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {option ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Edit opsi ${option.label}`}
          >
            <Pencil aria-hidden="true" />
          </Button>
        ) : (
          <Button type="button">
            <Plus aria-hidden="true" />
            Tambah opsi
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {option ? `Edit opsi ${option.label}` : "Tambah opsi filter"}
          </DialogTitle>
          <DialogDescription>
            Opsi untuk group <span className="font-medium">{groupLabel}</span>.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {state.error ? (
            <Alert variant="destructive">
              <AlertTitle>Tidak dapat menyimpan</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor={option ? "edit-option-label" : "option-label"}>
              Label
            </Label>
            <Input
              id={option ? "edit-option-label" : "option-label"}
              name="label"
              value={label}
              onChange={(event) => {
                const value = event.target.value;
                setLabel(value);

                if (!slugTouched) {
                  setSlug(slugify(value));
                }
              }}
              placeholder="Merah"
              required
              aria-invalid={Boolean(state.fieldErrors?.label)}
            />
            <FieldError messages={state.fieldErrors?.label} />
          </div>

          <div className="space-y-2">
            <Label htmlFor={option ? "edit-option-slug" : "option-slug"}>
              Slug
            </Label>
            <Input
              id={option ? "edit-option-slug" : "option-slug"}
              name="slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              placeholder="merah"
              required
              aria-invalid={Boolean(state.fieldErrors?.slug)}
            />
            <FieldError messages={state.fieldErrors?.slug} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={option ? "edit-option-order" : "option-order"}>
                Urutan
              </Label>
              <Input
                id={option ? "edit-option-order" : "option-order"}
                name="sortOrder"
                type="number"
                min={0}
                step={1}
                defaultValue={option?.sortOrder ?? 0}
                aria-invalid={Boolean(state.fieldErrors?.sortOrder)}
              />
              <FieldError messages={state.fieldErrors?.sortOrder} />
            </div>

            <div className="flex items-end pb-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id={option ? "edit-option-active" : "option-active"}
                  name="isActive"
                  defaultChecked={option ? option.isActive : true}
                />
                <Label
                  htmlFor={option ? "edit-option-active" : "option-active"}
                  className="font-normal"
                >
                  Opsi aktif
                </Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <SubmitButton label={option ? "Simpan perubahan" : "Tambah opsi"} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
