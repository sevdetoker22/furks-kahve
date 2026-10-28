"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { MAX_MESSAGE_LENGTH, type AssistantReply, type ChatMessage } from "@/lib/coffee-assistant/contracts";
import { formatPrice } from "@/lib/products/format";
import styles from "./coffee-assistant.module.css";

const starters = ["Meyvemsi bir kahve öner", "Çikolata notalarını seviyorum", "450 ₺ altında olsun"];
type Turn = { question: string; reply: AssistantReply };

function CupIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 9h12v6a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V9ZM17 10h1a3 3 0 1 1 0 6h-1M8 3v2m4-3v3m4-2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Reply({ reply, close }: { reply: AssistantReply; close: () => void }) {
  return (
    <div className={styles.answer}>
      <p>{reply.message}</p>
      {reply.recommendations.length > 0 && <ul className={styles.suggestions}>
        {reply.recommendations.map((coffee) => (
          <li key={coffee.id}>
            <div className={styles.coffeeHeading}><h3>{coffee.name}</h3><span>{formatPrice(coffee.price)}</span></div>
            <p className={styles.facts}>{coffee.origin} · {coffee.roastLevel} kavrum</p>
            <p>{coffee.reason}</p>
            <p className={styles.notes}>{coffee.matchedNotes.join(" · ")}</p>
            <Link href={coffee.href} onClick={close}>Kahveyi keşfet <span aria-hidden="true">↗</span></Link>
          </li>
        ))}
      </ul>}
    </div>
  );
}

function AssistantPanel() {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const transcript = useRef<HTMLDivElement>(null);
  const controller = useRef<AbortController | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState("");
  const titleId = useId();
  const inputId = useId();
  const hintId = useId();
  const dialogId = useId();

  useEffect(() => {
    transcript.current?.scrollTo({ top: transcript.current.scrollHeight });
  }, [turns, pending, error]);
  useEffect(() => {
    if (pending === null && dialog.current?.open) input.current?.focus();
  }, [pending]);
  useEffect(() => () => controller.current?.abort(), []);

  const close = () => dialog.current?.close();
  const reset = () => {
    if (controller.current) return;
    setTurns([]); setDraft(""); setError(""); input.current?.focus();
  };

  async function send(question: string) {
    const text = question.trim();
    if (!text || text.length > MAX_MESSAGE_LENGTH || controller.current) return;
    const requestController = new AbortController();
    controller.current = requestController;
    setDraft(text); setPending(text); setError("");
    const messages: ChatMessage[] = turns.slice(-4).flatMap((turn) => [
      { role: "user", content: turn.question },
      { role: "assistant", content: JSON.stringify({ message: turn.reply.message, productIds: turn.reply.recommendations.map((p) => p.id) }) },
    ]);
    messages.push({ role: "user", content: text });
    try {
      const response = await fetch("/api/kahve-asistani", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
        signal: AbortSignal.any([requestController.signal, AbortSignal.timeout(28_000)]),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(typeof data.error === "string" ? data.error : "Mesaj gönderilemedi. Lütfen tekrar dene.");
      setTurns((previous) => [...previous, { question: text, reply: data as AssistantReply }].slice(-12));
      setDraft("");
    } catch (issue) {
      if (!requestController.signal.aborted) {
        setError(issue instanceof Error && issue.name === "Error" ? issue.message : "Bağlantı kurulamadı. Lütfen tekrar dene.");
      }
    } finally {
      controller.current = null; setPending(null);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(draft);
  }

  return (
    <>
      <button type="button" className={styles.launcher} aria-haspopup="dialog" aria-controls={dialogId}
        onClick={() => { dialog.current?.showModal(); input.current?.focus(); }}>
        <CupIcon /><span>Kahveni bul</span><span className={styles.launcherDot} aria-hidden="true" />
      </button>
      <dialog ref={dialog} id={dialogId} className={styles.dialog} aria-labelledby={titleId}>
        <header className={styles.header}>
          <div className={styles.mark}><CupIcon /></div>
          <div><p className={styles.brand}>FURKS KAHVE</p><h2 id={titleId}>Kahve rehberin</h2><p className={styles.caption}>Yapay zekâ destekli</p></div>
          <button type="button" className={styles.close} aria-label="Kahve asistanını kapat" onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </button>
        </header>
        <div ref={transcript} className={styles.transcript}>
          <div className={styles.welcome}>
            <span className={styles.eyebrow}>DAMAK TADINA BİR YOLCULUK</span>
            <h3>Fincanını birlikte<br /><em>seçelim.</em></h3>
            <p>Meyvemsi mi, çikolatalı mı? Sevdiğin tatları anlat; seçkimizden sana yakın kahveleri bulalım.</p>
          </div>
          {turns.length === 0 && pending === null && <div className={styles.starters} aria-label="Örnek sorular">
            {starters.map((starter) => <button type="button" key={starter} onClick={() => void send(starter)}>{starter}<span aria-hidden="true">↗</span></button>)}
          </div>}
          <div role="log" aria-label="Kahve sohbeti" aria-live="polite" aria-relevant="additions" className={styles.messages}>
            {turns.map((turn, index) => <div key={index} className={styles.turn}>
              <p className={styles.question}><span className="sr-only">Sen: </span>{turn.question}</p>
              <Reply reply={turn.reply} close={close} />
            </div>)}
            {pending !== null && <div className={styles.turn}>
              <p className={styles.question}>{pending}</p>
              <p role="status" className={styles.pending}><span aria-hidden="true" />Seçkimize bakıyorum…</p>
            </div>}
          </div>
          {error && <div className={styles.error} role="alert"><p>{error}</p><Link href="/kahvelerimiz" onClick={close}>Kahve seçkisine göz at <span aria-hidden="true">↗</span></Link></div>}
        </div>
        <footer className={styles.footer}>
          <form onSubmit={submit} className={styles.form}>
            <label htmlFor={inputId} className="sr-only">Nasıl bir kahve arıyorsun?</label>
            <textarea ref={input} id={inputId} rows={2} value={draft} maxLength={MAX_MESSAGE_LENGTH} disabled={pending !== null}
              aria-describedby={hintId} placeholder="Nasıl bir kahve arıyorsun?" onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); if (pending === null) void send(draft); } }} />
            <button type="submit" aria-label="Mesajı gönder" disabled={pending !== null || !draft.trim()}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 19V5m-5 5 5-5 5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </form>
          <div className={styles.footerActions}><p id={hintId}>Seçkimizden öneriler · {draft.length}/{MAX_MESSAGE_LENGTH}</p><button type="button" onClick={reset} disabled={pending !== null || (turns.length === 0 && !draft && !error)}>Sohbeti temizle</button></div>
          <p className={styles.disclosure}>Mesajların yanıt için yapay zekâ hizmetine iletilir. Kişisel bilgi paylaşma.</p>
        </footer>
      </dialog>
    </>
  );
}

export function CoffeeAssistant() {
  const pathname = usePathname();
  return pathname.startsWith("/admin") ? null : <AssistantPanel />;
}
