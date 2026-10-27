"use client";

import { useActionState, useState } from "react";
import type { Product } from "@/lib/supabase/products";
import { submitWholesaleRequest, type WholesaleFormState } from "./actions";

const initialFormValues = {
  contact_name: "",
  business_name: "",
  business_type: "",
  email: "",
  phone: "",
  monthly_coffee_need: "",
  message: "",
  kvkk_accepted: false,
  product_id: "",
};

const fieldClassName =
  "mt-1.5 min-h-11 w-full min-w-0 rounded-sm border border-espresso/20 bg-[#fffdf8] px-3 py-2.5 text-base font-normal text-espresso outline-none transition-colors placeholder:text-espresso/45 focus:border-roast focus:ring-2 focus:ring-roast/15";

const labelClassName = "min-w-0 text-sm font-semibold text-espresso";

export function WholesaleForm({
  products = [],
  selectedProductId = "",
}: {
  products?: Pick<Product, "id" | "name">[];
  selectedProductId?: string;
}) {
  const [values, setValues] = useState({
    ...initialFormValues,
    product_id: products.some((product) => String(product.id) === selectedProductId) ? selectedProductId : "",
  });
  const [state, formAction, pending] = useActionState(
    async (previousState: WholesaleFormState, formData: FormData) => {
      try {
        const result = await submitWholesaleRequest(previousState, formData);
        if (result.status === "success") {
          setValues(initialFormValues);
        }
        return result;
      } catch {
        return {
          status: "error" as const,
          message:
            "Talebiniz gönderilemedi. Bilgileriniz korundu; lütfen tekrar deneyin.",
        };
      }
    },
    { status: "idle", message: "" } as WholesaleFormState,
  );

  // React resets action forms even on validation errors; clear only on success.
  return (
    <form
      action={formAction}
      onReset={(event) => event.preventDefault()}
      aria-labelledby="wholesale-form-heading"
      aria-busy={pending}
      className="mt-5"
    >
      <p className="mb-4 text-xs text-espresso/60">
        <span className="text-roast" aria-hidden="true">*</span> işaretli alanlar
        zorunludur.
      </p>
      <fieldset disabled={pending} className="min-w-0 space-y-4 disabled:opacity-70">
        <legend className="sr-only">İşletme ve iletişim bilgileriniz</legend>
        {products.length > 0 && (
          <label className={`block ${labelClassName}`}>
            İlgilendiğiniz kahve
            <span className="ml-1 font-normal text-espresso/60">(isteğe bağlı)</span>
            <select
              className={fieldClassName}
              name="product_id"
              value={values.product_id}
              onChange={(event) => setValues({ ...values, product_id: event.target.value })}
            >
              <option value="">Birlikte karar verelim</option>
              {products.map((product) => (
                <option key={product.id} value={String(product.id)}>{product.name}</option>
              ))}
            </select>
          </label>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClassName}>
            Adınız ve soyadınız <span className="text-roast" aria-hidden="true">*</span>
            <input
              className={fieldClassName}
              type="text"
              name="contact_name"
              autoComplete="name"
              minLength={2}
              required
              value={values.contact_name}
              onChange={(event) => setValues({ ...values, contact_name: event.target.value })}
            />
          </label>
          <label className={labelClassName}>
            İşletme adı <span className="text-roast" aria-hidden="true">*</span>
            <input
              className={fieldClassName}
              type="text"
              name="business_name"
              autoComplete="organization"
              minLength={2}
              required
              value={values.business_name}
              onChange={(event) => setValues({ ...values, business_name: event.target.value })}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClassName}>
            E-posta <span className="text-roast" aria-hidden="true">*</span>
            <input
              className={fieldClassName}
              type="email"
              name="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={(event) => setValues({ ...values, email: event.target.value })}
            />
          </label>
          <label className={labelClassName}>
            Telefon <span className="text-roast" aria-hidden="true">*</span>
            <input
              className={fieldClassName}
              type="tel"
              name="phone"
              autoComplete="tel"
              minLength={7}
              maxLength={30}
              pattern={String.raw`\+?[0-9\s\(\)\.\-]{7,30}`}
              title="7–15 rakam içeren geçerli bir telefon numarası girin."
              required
              value={values.phone}
              onChange={(event) => setValues({ ...values, phone: event.target.value })}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelClassName}>
            İşletme türü <span className="text-roast" aria-hidden="true">*</span>
            <select
              className={fieldClassName}
              name="business_type"
              required
              value={values.business_type}
              onChange={(event) => setValues({ ...values, business_type: event.target.value })}
            >
              <option value="" disabled>Seçiniz</option>
              <option value="Kafe">Kafe</option>
              <option value="Restoran">Restoran</option>
              <option value="Ofis">Ofis</option>
              <option value="Otel">Otel</option>
              <option value="Diğer">Diğer</option>
            </select>
          </label>
          <label className={labelClassName}>
            Aylık kahve ihtiyacı
            <select
              className={fieldClassName}
              name="monthly_coffee_need"
              value={values.monthly_coffee_need}
              onChange={(event) => setValues({ ...values, monthly_coffee_need: event.target.value })}
            >
              <option value="">Seçiniz (isteğe bağlı)</option>
              <option value="under_5">5 kilodan az</option>
              <option value="between_5_20">5 ile 20 kilo arası</option>
              <option value="between_20_50">20 ile 50 kilo arası</option>
              <option value="over_50">50 kilodan fazla</option>
            </select>
          </label>
        </div>

        <label className={`block ${labelClassName}`}>
          Bize biraz işletmenizden bahsedin
          <span className="ml-1 font-normal text-espresso/60">(isteğe bağlı)</span>
          <textarea
            className={`${fieldClassName} min-h-22 resize-y`}
            name="message"
            rows={3}
            maxLength={2000}
            placeholder="Ekipmanınız, kahve tercihleriniz veya merak ettikleriniz…"
            value={values.message}
            onChange={(event) => setValues({ ...values, message: event.target.value })}
          />
        </label>

        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-espresso/70">
          <input
            type="checkbox"
            name="kvkk_accepted"
            required
            checked={values.kvkk_accepted}
            onChange={(event) => setValues({ ...values, kvkk_accepted: event.target.checked })}
            className="mt-0.5 size-4 shrink-0 accent-roast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roast"
          />
          <span>
            KVKK kapsamında kişisel verilerimin toptan talebimin değerlendirilmesi
            ve benimle iletişime geçilmesi amacıyla işlenmesini kabul ediyorum.
            <span className="ml-1 text-roast" aria-hidden="true">*</span>
          </span>
        </label>
      </fieldset>

      <div aria-live="polite" aria-atomic="true">
        {state.message && !pending ? (
          <p
            role={state.status === "error" ? "alert" : "status"}
            className={`mt-4 border-l-2 pl-3 text-sm leading-6 ${
              state.status === "success"
                ? "border-leaf text-leaf"
                : "border-roast text-roast-dark"
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-roast px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-roast-dark disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roast"
      >
        {pending ? "Talebiniz gönderiliyor…" : "Teklif Talebi Gönder"}
      </button>
      <p className="mt-3 text-center text-xs leading-5 text-espresso/60">
        Bilgileriniz yalnızca toptan talebinizi değerlendirmek için kullanılır.
      </p>
    </form>
  );
}
