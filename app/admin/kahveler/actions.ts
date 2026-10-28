"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/session";
import { isProductId, validateProduct, type ProductFormState } from "@/lib/admin/product-form";

function refreshCoffeePages() {
  for (const path of ["/admin/kahveler", "/kahvelerimiz", "/", "/toptan"]) revalidatePath(path);
}

function saveError(code?: string) {
  if (code === "42501") return "Kahve düzenleme yetkisi henüz açılmamış. Lütfen siteyi hazırlayan kişiyle iletişime geçin. Bilgileriniz korunuyor.";
  if (code === "23505") return "Bu kahve zaten kayıtlı. Lütfen mevcut kahveyi düzenleyin.";
  return "Kahve kaydedilemedi. Bağlantınızı kontrol edip tekrar deneyin. Bilgileriniz korunuyor.";
}

export async function saveCoffee(_state: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const { supabase } = await requireAdmin();
  const id = formData.get("product_id");
  if (typeof id !== "string" || (id !== "" && !isProductId(id))) {
    return { message: "Geçersiz kahve. Listeye dönüp tekrar deneyin.", errors: {} };
  }
  const { data, errors } = validateProduct(formData);
  if (Object.keys(errors).length > 0) return { message: "Lütfen işaretli alanları kontrol edin.", errors };

  try {
    // No elevated key: both actions use the verified owner's session and RLS.
    const query = id
      ? supabase.from("products").update(data).eq("id", id)
      : supabase.from("products").insert(data);
    const { data: saved, error } = await query.select("id").maybeSingle();
    if (error) return { message: saveError(error.code), errors: {} };
    if (!saved) return { message: "Kahve bulunamadı veya düzenleme yetkiniz yok. Listeyi yenileyip tekrar deneyin.", errors: {} };
  } catch {
    return { message: saveError(), errors: {} };
  }

  refreshCoffeePages();
  if (id) revalidatePath(`/admin/kahveler/${id}`);
  redirect(`/admin/kahveler?notice=${id ? "updated" : "created"}`);
}

export async function deleteCoffee(_state: ProductFormState, formData: FormData): Promise<ProductFormState> {
  const { supabase } = await requireAdmin();
  const id = formData.get("product_id");
  if (typeof id !== "string" || !isProductId(id) || formData.get("confirmed") !== "on") {
    return { message: "Kahveyi kaldırmak için onay kutusunu işaretleyin.", errors: {} };
  }
  try {
    const { data, error } = await supabase.from("products").delete().eq("id", id).select("id").maybeSingle();
    if (error) return { message: error.code === "42501" ? "Kahve kaldırma yetkisi henüz açılmamış. Lütfen siteyi hazırlayan kişiyle iletişime geçin." : "Kahve kaldırılamadı. Lütfen tekrar deneyin.", errors: {} };
    if (!data) return { message: "Kahve bulunamadı veya kaldırma yetkiniz yok. Listeyi yenileyin.", errors: {} };
  } catch {
    return { message: "Kahve kaldırılamadı. Bağlantınızı kontrol edip tekrar deneyin.", errors: {} };
  }
  refreshCoffeePages();
  revalidatePath(`/admin/kahveler/${id}`);
  redirect("/admin/kahveler?notice=deleted");
}

export async function refreshAdminProducts() {
  await requireAdmin();
  revalidatePath("/admin/kahveler");
}
