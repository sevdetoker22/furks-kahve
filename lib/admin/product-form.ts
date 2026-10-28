export type ProductValues = {
  name: string;
  origin: string;
  tasting_notes: string;
  roast_level: string;
  price: string;
  in_stock: boolean;
};

export type ProductErrors = Partial<Record<keyof ProductValues, string>>;
export type ProductFormState = { message: string; errors: ProductErrors };

export const roastLevels = ["Açık", "Orta", "Koyu"] as const;

export function isProductId(value: string) {
  return /^[1-9]\d{0,18}$/.test(value) && BigInt(value) <= BigInt("9223372036854775807");
}

export function validateProduct(formData: FormData) {
  const text = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  const values: ProductValues = {
    name: text("name"),
    origin: text("origin"),
    tasting_notes: text("tasting_notes"),
    roast_level: text("roast_level"),
    price: text("price"),
    in_stock: formData.get("in_stock") === "on",
  };
  const errors: ProductErrors = {};

  if (values.name.length < 2 || values.name.length > 100) errors.name = "Kahve adı 2–100 karakter olmalı.";
  if (values.origin.length < 2 || values.origin.length > 150) errors.origin = "Köken bilgisi 2–150 karakter olmalı.";
  if (values.tasting_notes.length < 2 || values.tasting_notes.length > 300) errors.tasting_notes = "Tadım notları 2–300 karakter olmalı.";
  if (!roastLevels.some((level) => level === values.roast_level)) errors.roast_level = "Bir kavurma derecesi seçin.";

  const price = values.price.replace(",", ".");
  if (!/^\d{1,7}(?:\.\d{1,2})?$/.test(price) || Number(price) <= 0 || Number(price) > 1000000) {
    errors.price = "0’dan büyük, en fazla 1.000.000 ₺ olan bir fiyat girin. Örnek: 420,50.";
  }

  return { values, errors, data: { ...values, price } };
}
