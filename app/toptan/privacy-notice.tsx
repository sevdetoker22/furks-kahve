"use client";

import { useId, useRef, type KeyboardEvent } from "react";

const noticeSections = [
  {
    title: "Hangi bilgiler alınır?",
    text: "Formda paylaştığınız ad ve soyadı, işletme bilgileri, e-posta adresi, telefon numarası ve talebinize ilişkin bilgiler alınır. İsteğe bağlı alanları boş bırakabilirsiniz.",
  },
  {
    title: "Bilgileriniz ne için kullanılır?",
    text: "Toptan kahve talebinizi değerlendirmek, ihtiyacınıza uygun teklif hazırlamak ve talebiniz hakkında sizinle iletişime geçmek için kullanılır.",
  },
  {
    title: "Bilgiler nasıl alınır?",
    text: "Bilgileriniz, bu form aracılığıyla elektronik ortamda iletilir ve talebin değerlendirilmesi için kullanılan sistemde saklanır.",
  },
  {
    title: "Haklarınız ve iletişim",
    text: "Kişisel verileriniz hakkında bilgi almak, bilgilerinizin düzeltilmesini veya silinmesini istemek için iletişim sayfasındaki kanallardan bize ulaşabilirsiniz.",
  },
];

export function WholesalePrivacyNotice({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const checkboxId = useId();
  const labelId = useId();
  const dialogId = useId();
  const titleId = useId();

  function closeNotice() {
    dialog.current?.close();
  }

  function keepFocusInNotice(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;

    const elements = event.currentTarget.querySelectorAll<HTMLElement>(
      'button:not(:disabled), a[href], [tabindex="0"]',
    );
    const first = elements[0];
    const last = elements[elements.length - 1];
    const active = event.currentTarget.ownerDocument.activeElement;
    if (!first || !last) return;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <div className="flex items-start gap-2.5 text-xs leading-5 text-espresso/70">
        <input
          id={checkboxId}
          type="checkbox"
          name="kvkk_accepted"
          required
          checked={checked}
          onChange={(event) => onCheckedChange(event.target.checked)}
          aria-labelledby={labelId}
          className="mt-0.5 size-4 shrink-0 accent-roast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roast"
        />
        <div id={labelId}>
          <button
            type="button"
            aria-haspopup="dialog"
            aria-controls={dialogId}
            onClick={() => dialog.current?.showModal()}
            className="cursor-pointer rounded-sm text-left font-semibold text-espresso underline decoration-espresso/35 underline-offset-2 transition-colors hover:text-roast focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roast"
          >
            KVKK Aydınlatma Metni
          </button>
          <label htmlFor={checkboxId} className="cursor-pointer">
            ’ni okudum ve bilgilendirildim.
            <span className="ml-1 text-roast" aria-hidden="true">*</span>
          </label>
        </div>
      </div>

      <dialog
        ref={dialog}
        id={dialogId}
        aria-labelledby={titleId}
        onKeyDown={keepFocusInNotice}
        className="fixed inset-0 m-auto max-h-[calc(100dvh_-_2rem)] w-[calc(100%_-_2rem)] max-w-xl overflow-hidden rounded-2xl border border-espresso/10 bg-[#fffaf2] p-0 text-espresso shadow-2xl open:flex open:flex-col backdrop:bg-espresso/45 backdrop:backdrop-blur-[2px]"
      >
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-espresso/10 p-5 sm:p-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-leaf">
              Furks Kahve · Örnek metin
            </p>
            <h2 id={titleId} className="mt-2 font-display text-xl font-bold leading-tight tracking-[-0.025em] sm:text-2xl">
              KVKK Aydınlatma Metni
            </h2>
          </div>
          <button
            type="button"
            aria-label="Aydınlatma metnini kapat"
            onClick={closeNotice}
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full border border-espresso/15 text-espresso/70 transition-colors hover:bg-espresso/5 hover:text-espresso focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roast"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div
          role="document"
          tabIndex={0}
          className="min-h-0 space-y-5 overflow-y-auto overscroll-contain px-5 py-5 text-sm leading-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-roast sm:px-6"
        >
          <p className="rounded-lg bg-espresso/5 px-3 py-2.5 text-xs leading-5 text-espresso/65">
            Bu metin, kurgusal Furks Kahve sitesi için hazırlanmış bir arayüz
            örneğidir.
          </p>
          {noticeSections.map((section) => (
            <section key={section.title}>
              <h3 className="font-semibold text-espresso">{section.title}</h3>
              <p className="mt-1 text-espresso/70">{section.text}</p>
            </section>
          ))}
        </div>

        <div className="flex shrink-0 justify-end border-t border-espresso/10 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={closeNotice}
            className="min-h-11 cursor-pointer rounded-full bg-espresso px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-leaf focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roast"
          >
            Forma dön
          </button>
        </div>
      </dialog>
    </>
  );
}
