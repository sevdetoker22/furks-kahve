"use server";

import { supabase } from "@/lib/supabase/client";

export type WholesaleFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const monthlyCoffeeNeedOptions = new Set([
  "under_5",
  "between_5_20",
  "between_20_50",
  "over_50",
]);

function getText(formData: FormData, field: string): string {
  const value = formData.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitWholesaleRequest(
  _previousState: WholesaleFormState,
  formData: FormData,
): Promise<WholesaleFormState> {
  const contactName = getText(formData, "contact_name");
  const businessName = getText(formData, "business_name");
  const businessType = getText(formData, "business_type");
  const email = getText(formData, "email").toLocaleLowerCase("tr-TR");
  const phone = getText(formData, "phone");
  const monthlyCoffeeNeed = getText(formData, "monthly_coffee_need");
  const message = getText(formData, "message");
  const productId = getText(formData, "product_id");
  const kvkkAccepted = formData.get("kvkk_accepted") === "on";

  if (
    contactName.length < 2 ||
    businessName.length < 2 ||
    businessType.length < 2
  ) {
    return {
      status: "error",
      message: "Ad, işletme adı ve işletme türü alanlarını eksiksiz doldurun.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Geçerli bir e-posta adresi girin." };
  }

  const phoneDigits = phone.replace(/\D/g, "");
  if (
    !/^\+?[\d\s().-]+$/.test(phone) ||
    phone.length > 30 ||
    phoneDigits.length < 7 ||
    phoneDigits.length > 15
  ) {
    return { status: "error", message: "Geçerli bir telefon numarası girin." };
  }

  if (monthlyCoffeeNeed && !monthlyCoffeeNeedOptions.has(monthlyCoffeeNeed)) {
    return {
      status: "error",
      message: "Geçerli bir aylık kahve ihtiyacı seçin.",
    };
  }

  if (message.length > 2000) {
    return {
      status: "error",
      message: "Mesajınız en fazla 2000 karakter olabilir.",
    };
  }

  if (!kvkkAccepted) {
    return {
      status: "error",
      message: "Talebi göndermek için KVKK onayını vermelisiniz.",
    };
  }

  let requestMessage = message;
  if (productId) {
    const { data: product, error: productError } = await supabase
      .schema("public")
      .from("products")
      .select("id,name")
      .eq("id", productId)
      .maybeSingle();

    if (productError || !product) {
      return { status: "error", message: "Lütfen listeden geçerli bir kahve seçin." };
    }
    // Preserve the existing insert-only schema; resolve the current product
    // name on the server instead of trusting a submitted name.
    requestMessage = `İlgilenilen kahve: ${product.name}${message ? `\n\n${message}` : ""}`;
    if (requestMessage.length > 2000) {
      return { status: "error", message: "Kahve seçimiyle birlikte mesajınız en fazla 2000 karakter olabilir. Lütfen mesajınızı biraz kısaltın." };
    }
  }

  const { error } = await supabase.from("wholesale_requests").insert({
    contact_name: contactName,
    business_name: businessName,
    business_type: businessType,
    email,
    phone,
    monthly_coffee_need: monthlyCoffeeNeed || null,
    message: requestMessage || null,
    kvkk_accepted: true,
  });

  if (error) {
    return {
      status: "error",
      message:
        "Talebiniz şu anda gönderilemedi. Lütfen kısa bir süre sonra tekrar deneyin.",
    };
  }

  return {
    status: "success",
    message:
      "Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.",
  };
}
