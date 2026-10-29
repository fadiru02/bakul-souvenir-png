"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { LoaderCircle, Save } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  createProduct,
  updateProduct,
} from "@/features/catalog/actions";
import { slugify } from "@/features/catalog/slug";
import type {
  FormState,
  ProductFormValues,
  ProductOptionGroup,
} from "@/features/catalog/types";

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

function SubmitBar() {
  const { pending } = useFormStatus();

  return (
    <div className="sticky bottom-4 z-10 flex items-center justify-end gap-2 rounded-xl border bg-background/95 p-3 shadow-sm backdrop-blur">
      <Button type="button" variant="outline" asChild>
        <Link href="/admin/produk">Batal</Link>
      </Button>
      <Button type="submit" disabled={pending}>
        {pending ? (
          <LoaderCircle className="animate-spin" aria-hidden="true" />
        ) : (
          <Save aria-hidden="true" />
        )}
        {pending ? "Menyimpan..." : "Simpan produk"}
      </Button>
    </div>
  );
}

const initialState: FormState = {};

export function ProductForm({
  product,
  groups,
}: {
  product?: ProductFormValues;
  groups: ProductOptionGroup[];
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const selectedIds = new Set(product?.optionIds ?? []);
  const action = product
    ? updateProduct.bind(null, product.id)
    : createProduct;
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.error ? (
        <Alert variant="destructive">
          <AlertTitle>Tidak dapat menyimpan</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>Informasi produk</CardTitle>
          <CardDescription>
            Nama, slug, dan deskripsi yang tampil di katalog.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nama produk</Label>
            <Input
              id="name"
              name="name"
              value={name}
              onChange={(event) => {
                const value = event.target.value;
                setName(value);

                if (!slugTouched) {
                  setSlug(slugify(value));
                }
              }}
              placeholder="Contoh: Tote Bag Kanvas Custom"
              required
              aria-invalid={Boolean(state.fieldErrors?.name)}
            />
            <FieldError messages={state.fieldErrors?.name} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              name="slug"
              value={slug}
              onChange={(event) => {
                setSlugTouched(true);
                setSlug(event.target.value);
              }}
              placeholder="tote-bag-kanvas-custom"
              required
              aria-invalid={Boolean(state.fieldErrors?.slug)}
            />
            <p className="text-xs text-muted-foreground">
              URL publik nanti: /katalog/{slug || "slug-produk"}
            </p>
            <FieldError messages={state.fieldErrors?.slug} />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={product?.description ?? ""}
              rows={5}
              placeholder="Jelaskan bahan, ukuran, dan opsi kustomisasi."
              required
              aria-invalid={Boolean(state.fieldErrors?.description)}
            />
            <FieldError messages={state.fieldErrors?.description} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Harga & status</CardTitle>
          <CardDescription>
            Harga disimpan sebagai bilangan bulat Rupiah.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="price">Harga (Rp)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min={0}
              step={1}
              inputMode="numeric"
              defaultValue={product?.price ?? ""}
              placeholder="45000"
              required
              aria-invalid={Boolean(state.fieldErrors?.price)}
            />
            <FieldError messages={state.fieldErrors?.price} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <NativeSelect
              id="status"
              name="status"
              defaultValue={product?.status ?? "DRAFT"}
              className="w-full"
            >
              <NativeSelectOption value="DRAFT">Draft</NativeSelectOption>
              <NativeSelectOption value="ACTIVE">Aktif</NativeSelectOption>
              <NativeSelectOption value="ARCHIVED">
                Diarsipkan
              </NativeSelectOption>
            </NativeSelect>
            <FieldError messages={state.fieldErrors?.status} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filter & tag</CardTitle>
          <CardDescription>
            Opsi mengikuti group yang dikelola di halaman Filter. Opsi nonaktif
            tetap dipertahankan jika sudah dipilih.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {groups.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Belum ada group filter.{" "}
              <Link href="/admin/filter" className="underline">
                Tambahkan filter
              </Link>{" "}
              terlebih dahulu.
            </p>
          ) : null}

          {groups.map((group) => {
            const selectedInGroup =
              group.type === "SINGLE_SELECT"
                ? group.options.find((option) => selectedIds.has(option.id))?.id
                : undefined;

            return (
              <fieldset key={group.id} className="space-y-3">
                <legend className="flex items-center gap-2 text-sm font-medium">
                  {group.label}
                  <Badge variant="outline" className="font-mono text-[10px]">
                    {group.key}
                  </Badge>
                  {!group.isActive ? (
                    <Badge variant="secondary">Group nonaktif</Badge>
                  ) : null}
                </legend>

                {group.options.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    Group ini belum punya opsi.
                  </p>
                ) : group.type === "MULTI_SELECT" ? (
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {group.options.map((option) => {
                      const isSelected = selectedIds.has(option.id);
                      const disabled = !option.isActive && !isSelected;
                      const id = `option-${group.id}-${option.id}`;

                      return (
                        <div
                          key={option.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <Checkbox
                            id={id}
                            name="optionIds"
                            value={option.id}
                            defaultChecked={isSelected}
                            disabled={disabled}
                          />
                          <Label
                            htmlFor={id}
                            className={
                              disabled
                                ? "text-muted-foreground"
                                : "font-normal"
                            }
                          >
                            {option.label}
                          </Label>
                          {!option.isActive ? (
                            <Badge variant="secondary">Nonaktif</Badge>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <RadioGroup
                    name="optionIds"
                    defaultValue={selectedInGroup}
                    className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {group.options.map((option) => {
                      const isSelected = selectedIds.has(option.id);
                      const disabled = !option.isActive && !isSelected;
                      const id = `option-${group.id}-${option.id}`;

                      return (
                        <div
                          key={option.id}
                          className="flex items-center gap-2 text-sm"
                        >
                          <RadioGroupItem
                            id={id}
                            value={option.id}
                            disabled={disabled}
                          />
                          <Label
                            htmlFor={id}
                            className={
                              disabled
                                ? "text-muted-foreground"
                                : "font-normal"
                            }
                          >
                            {option.label}
                          </Label>
                          {!option.isActive ? (
                            <Badge variant="secondary">Nonaktif</Badge>
                          ) : null}
                        </div>
                      );
                    })}
                  </RadioGroup>
                )}
              </fieldset>
            );
          })}
          <FieldError messages={state.fieldErrors?.optionIds} />
        </CardContent>
      </Card>

      <SubmitBar />
    </form>
  );
}
