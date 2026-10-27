"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main id="main-content" className="min-h-[calc(100svh-5rem)] bg-[#fffaf2] px-5 py-16">
      <div className="mx-auto max-w-lg">
        <h1 className="font-display text-3xl font-bold">Yönetim ekranı yüklenemedi.</h1>
        <p role="alert" className="mt-4 text-sm leading-7 text-espresso/65">Bağlantınızı kontrol edip tekrar deneyin.</p>
        <button onClick={reset} className="mt-6 min-h-11 rounded-sm bg-leaf px-5 py-3 text-sm font-semibold text-white">Tekrar dene</button>
      </div>
    </main>
  );
}
