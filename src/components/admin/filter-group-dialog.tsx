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
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  createFilterGroup,
  updateFilterGroup,
} from "@/features/catalog/actions";
import type { FilterGroupRow, FormState } from "@/features/catalog/types";

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

export function FilterGroupDialog({ group }: { group?: FilterGroupRow }) {
  const [open, setOpen] = useState(false);
  const action = group
    ? updateFilterGroup.bind(null, group.id)
    : createFilterGroup;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {group ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Edit group ${group.label}`}
          >
            <Pencil aria-hidden="true" />
          </Button>
        ) : (
          <Button type="button">
            <Plus aria-hidden="true" />
            Tambah group
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {group ? `Edit group ${group.label}` : "Tambah group filter"}
          </DialogTitle>
          <DialogDescription>
            Group filter menentukan bagian filter yang tampil di katalog nanti.
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
            <Label htmlFor={group ? "edit-group-key" : "group-key"}>
              Key
            </Label>
            {group ? (
              <Input
                id="edit-group-key"
                value={group.key}
                readOnly
                className="font-mono"
              />
            ) : (
              <Input
                id="group-key"
                name="key"
                placeholder="contoh: warna"
                className="font-mono"
                required
                aria-invalid={Boolean(state.fieldErrors?.key)}
              />
            )}
            <p className="text-xs text-muted-foreground">
              Key tidak dapat diubah setelah group dibuat.
            </p>
            <FieldError messages={state.fieldErrors?.key} />
          </div>

          <div className="space-y-2">
            <Label htmlFor={group ? "edit-group-label" : "group-label"}>
              Label
            </Label>
            <Input
              id={group ? "edit-group-label" : "group-label"}
              name="label"
              defaultValue={group?.label ?? ""}
              placeholder="Warna"
              required
              aria-invalid={Boolean(state.fieldErrors?.label)}
            />
            <FieldError messages={state.fieldErrors?.label} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={group ? "edit-group-type" : "group-type"}>
                Tipe pilihan
              </Label>
              {group?.isSystem ? (
                <input type="hidden" name="type" value="MULTI_SELECT" />
              ) : null}
              <NativeSelect
                id={group ? "edit-group-type" : "group-type"}
                name={group?.isSystem ? undefined : "type"}
                defaultValue={group?.type ?? "MULTI_SELECT"}
                disabled={group?.isSystem}
                className="w-full"
              >
                <NativeSelectOption value="MULTI_SELECT">
                  Banyak pilihan
                </NativeSelectOption>
                <NativeSelectOption value="SINGLE_SELECT">
                  Satu pilihan
                </NativeSelectOption>
              </NativeSelect>
              {group?.isSystem ? (
                <p className="text-xs text-muted-foreground">
                  Tipe group sistem dikunci.
                </p>
              ) : null}
              <FieldError messages={state.fieldErrors?.type} />
            </div>

            <div className="space-y-2">
              <Label htmlFor={group ? "edit-group-order" : "group-order"}>
                Urutan
              </Label>
              <Input
                id={group ? "edit-group-order" : "group-order"}
                name="sortOrder"
                type="number"
                min={0}
                step={1}
                defaultValue={group?.sortOrder ?? 0}
                aria-invalid={Boolean(state.fieldErrors?.sortOrder)}
              />
              <FieldError messages={state.fieldErrors?.sortOrder} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id={group ? "edit-group-active" : "group-active"}
              name="isActive"
              defaultChecked={group ? group.isActive : true}
            />
            <Label
              htmlFor={group ? "edit-group-active" : "group-active"}
              className="font-normal"
            >
              Tampilkan group ini
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <SubmitButton label={group ? "Simpan perubahan" : "Tambah group"} />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
