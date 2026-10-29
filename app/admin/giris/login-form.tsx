"use client";

import { useActionState } from "react";
import { loginAdmin, type LoginState } from "../actions";

const initialState: LoginState = { message: "", username: "" };
const inputClass = "mt-2 min-h-12 w-full rounded-sm border border-espresso/20 bg-[#fffdf8] px-3 py-2.5 text-base outline-none focus:border-roast focus:ring-2 focus:ring-roast/15";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={action} aria-busy={pending} className="mt-7 space-y-5">
      <fieldset disabled={pending} className="space-y-5 disabled:opacity-70">
        <legend className="sr-only">Yönetici giriş bilgileri</legend>
        <label className="block text-sm font-semibold">
          Kullanıcı adı
          <input className={inputClass} name="username" autoComplete="username"
            defaultValue={state.username} maxLength={100} required />
        </label>
        <label className="block text-sm font-semibold">
          Şifre
          <input className={inputClass} type="password" name="password"
            autoComplete="current-password" maxLength={1024} required />
        </label>
      </fieldset>
      <div aria-live="polite" aria-atomic="true">
        {state.message && !pending ? <p role="alert" className="border-l-2 border-roast pl-3 text-sm leading-6 text-roast-dark">{state.message}</p> : null}
      </div>
      <button disabled={pending} className="min-h-12 w-full rounded-sm bg-leaf px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-espresso disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-roast">
        {pending ? "Giriş yapılıyor…" : "Giriş yap"}
      </button>
    </form>
  );
}
