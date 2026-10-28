"use client";

import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { roastLevels, type ProductFormState, type ProductValues } from "@/lib/admin/product-form";
import { deleteCoffee, saveCoffee } from "./actions";

const initialState: ProductFormState = { message: "", errors: {} };
const inputClass = "mt-2 min-h-12 w-full rounded-sm border border-espresso/20 bg-[#fffdf8] px-3 py-2.5 text-base outline-none focus:border-roast focus:ring-2 focus:ring-roast/15 aria-invalid:border-roast-dark";

export function ProductForm({ id = "", initialValues }: { id?: string; initialValues: ProductValues }) {
  const [values, setValues] = useState(initialValues);
  const [state, action, pending] = useActionState(saveCoffee, initialState);
  const update = (key: keyof ProductValues, value: string | boolean) => setValues((previous) => ({ ...previous, [key]: value }));

  return (
    <form action={action} onSubmit={(event) => {
      // React's automatic form reset also resets native selects and checkboxes
      // on validation errors. Dispatch explicitly to preserve every field.
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      startTransition(() => action(data));
    }} aria-busy={pending} className="max-w-3xl">
      <input type="hidden" name="product_id" value={id} />
      <fieldset disabled={pending} className="grid gap-6 disabled:opacity-70 sm:grid-cols-2">
        <legend className="sr-only">Kahve bilgileri</legend>
        {[
          { key: "name", label: "Kahve adı", placeholder: "Ör. Moda Blend", max: 100 },
          { key: "origin", label: "Köken", placeholder: "Ör. Brezilya, Kolombiya", max: 150 },
        ].map(({ key, label, placeholder, max }) => (
          <div key={key}>
            <label htmlFor={key} className="text-sm font-semibold">{label}</label>
            <input id={key} name={key} className={inputClass} value={values[key as "name" | "origin"]}
              onChange={(event) => update(key as "name" | "origin", event.target.value)}
              placeholder={placeholder} required minLength={2} maxLength={max}
              aria-invalid={Boolean(state.errors[key as "name" | "origin"])} aria-describedby={`${key}-error`} />
            <p id={`${key}-error`} className="mt-2 text-sm text-roast-dark">{state.errors[key as "name" | "origin"]}</p>
          </div>
        ))}
        <div>
          <label htmlFor="price" className="text-sm font-semibold">250 g fiyatı (₺)</label>
          <input id="price" name="price" className={inputClass} value={values.price}
            onChange={(event) => update("price", event.target.value)} inputMode="decimal"
            placeholder="Ör. 420,50" maxLength={10} required aria-invalid={Boolean(state.errors.price)} aria-describedby="price-error" />
          <p id="price-error" className="mt-2 text-sm text-roast-dark">{state.errors.price}</p>
        </div>
        <div>
          <label htmlFor="roast_level" className="text-sm font-semibold">Kavurma derecesi</label>
          <select id="roast_level" name="roast_level" className={inputClass} value={values.roast_level}
            onChange={(event) => update("roast_level", event.target.value)} required
            aria-invalid={Boolean(state.errors.roast_level)} aria-describedby="roast_level-error">
            <option value="">Seçiniz</option>
            {roastLevels.map((level) => <option key={level} value={level}>{level}</option>)}
          </select>
          <p id="roast_level-error" className="mt-2 text-sm text-roast-dark">{state.errors.roast_level}</p>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="tasting_notes" className="text-sm font-semibold">Tadım notları</label>
          <textarea id="tasting_notes" name="tasting_notes" rows={3} className={inputClass} value={values.tasting_notes}
            onChange={(event) => update("tasting_notes", event.target.value)} placeholder="Ör. Fındık, sütlü çikolata, karamel"
            required minLength={2} maxLength={300} aria-invalid={Boolean(state.errors.tasting_notes)} aria-describedby="tasting-notes-hint tasting_notes-error" />
          <p id="tasting-notes-hint" className="mt-2 text-xs leading-6 text-espresso/60">Her notayı virgülle ayırın.</p>
          <p id="tasting_notes-error" className="mt-2 text-sm text-roast-dark">{state.errors.tasting_notes}</p>
        </div>
        <label className="flex cursor-pointer items-start gap-3 border-y border-espresso/10 py-5 sm:col-span-2">
          <input type="checkbox" name="in_stock" checked={values.in_stock} onChange={(event) => update("in_stock", event.target.checked)} className="mt-1 size-4 accent-leaf" />
          <span><span className="block text-sm font-semibold">Stokta var</span><span className="mt-1 block text-xs leading-6 text-espresso/60">İşareti kaldırırsanız kahve sitede “Tükendi” olarak görünür.</span></span>
        </label>
      </fieldset>
      <div aria-live="polite" aria-atomic="true" className="mt-5">
        {state.message && !pending ? <p role="alert" className="border-l-2 border-roast pl-3 text-sm leading-7 text-roast-dark">{state.message}</p> : null}
      </div>
      <div className="mt-7 flex flex-wrap items-center gap-5">
        <button disabled={pending} className="min-h-12 rounded-sm bg-leaf px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-espresso disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-roast">
          {pending ? "Kaydediliyor…" : id ? "Değişiklikleri kaydet" : "Kahveyi ekle"}
        </button>
        <Link href="/admin/kahveler" className="text-sm font-semibold underline underline-offset-4">Vazgeç</Link>
      </div>
    </form>
  );
}

export function DeleteProductForm({ id, name }: { id: string; name: string }) {
  const [state, action, pending] = useActionState(deleteCoffee, initialState);
  return (
    <details className="mt-14 max-w-3xl border-t border-espresso/15 pt-6">
      <summary className="cursor-pointer text-sm font-semibold text-roast-dark">Kahveyi listeden kaldır</summary>
      <p className="mt-4 text-sm leading-7 text-espresso/65">“{name}” kahvesi siteden kalıcı olarak kaldırılır. Geçici olarak bulunmuyorsa stok işaretini kaldırmanız yeterli.</p>
      <form action={action} aria-busy={pending} className="mt-4">
        <input type="hidden" name="product_id" value={id} />
        <fieldset disabled={pending}>
          <legend className="sr-only">Kahveyi kaldırma onayı</legend>
          <label className="flex items-start gap-3 text-sm leading-6">
            <input name="confirmed" type="checkbox" required className="mt-1 size-4 accent-roast-dark" />
            Bu kahveyi kalıcı olarak kaldırmak istiyorum.
          </label>
          <button disabled={pending} className="mt-5 min-h-11 rounded-sm border border-roast-dark/40 px-4 py-2 text-sm font-semibold text-roast-dark hover:bg-roast-dark/5 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-roast">
            {pending ? "Kaldırılıyor…" : "Kaldırmayı onayla"}
          </button>
        </fieldset>
        <div aria-live="polite" aria-atomic="true">
          {state.message && !pending ? <p role="alert" className="mt-4 text-sm leading-7 text-roast-dark">{state.message}</p> : null}
        </div>
      </form>
    </details>
  );
}
