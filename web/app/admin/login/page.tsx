"use client";

import { useActionState, useState } from "react";
import { login, forgotPassword } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);
  const [forgotState, forgotAction, forgotPending] = useActionState(forgotPassword, null);
  const [showForgot, setShowForgot] = useState(false);

  return (
    <div className="min-h-screen bg-[#efeadd] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="border-2 border-[#2d3235] bg-white shadow-[6px_6px_0px_#2d3235] p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#2d3235] uppercase tracking-tight">
              Kodata Admin
            </h1>
            <p className="text-[#5a5f63] text-sm mt-1">
              {showForgot
                ? "Entrez votre email pour recevoir un lien de réinitialisation."
                : "Connectez-vous pour accéder au dashboard."}
            </p>
          </div>

          {!showForgot ? (
            <form action={formAction} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-bold text-[#2d3235] mb-1 uppercase"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full border-2 border-[#2d3235] px-3 py-2 text-[#2d3235] bg-[#efeadd] focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-bold text-[#2d3235] mb-1 uppercase"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full border-2 border-[#2d3235] px-3 py-2 text-[#2d3235] bg-[#efeadd] focus:outline-none focus:bg-white"
                />
              </div>

              {state?.error && (
                <p className="text-sm text-[#c24b46] font-bold border-2 border-[#c24b46] px-3 py-2 bg-red-50">
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full bg-[#1d8f6d] text-white font-black uppercase py-3 border-2 border-[#2d3235] shadow-[4px_4px_0px_#2d3235] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pending ? "Connexion…" : "Se connecter"}
              </button>

              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="w-full text-sm text-[#5a5f63] hover:text-[#2d3235] underline text-center mt-2"
              >
                Mot de passe oublié ?
              </button>
            </form>
          ) : (
            <form action={forgotAction} className="space-y-4">
              <div>
                <label
                  htmlFor="forgot-email"
                  className="block text-sm font-bold text-[#2d3235] mb-1 uppercase"
                >
                  Email
                </label>
                <input
                  id="forgot-email"
                  name="email"
                  type="email"
                  required
                  className="w-full border-2 border-[#2d3235] px-3 py-2 text-[#2d3235] bg-[#efeadd] focus:outline-none focus:bg-white"
                />
              </div>

              {forgotState?.error && (
                <p className="text-sm text-[#c24b46] font-bold border-2 border-[#c24b46] px-3 py-2 bg-red-50">
                  {forgotState.error}
                </p>
              )}

              {forgotState?.success && (
                <p className="text-sm text-[#1d8f6d] font-bold border-2 border-[#1d8f6d] px-3 py-2 bg-green-50">
                  Email envoyé ! Vérifiez votre boîte mail.
                </p>
              )}

              <button
                type="submit"
                disabled={forgotPending}
                className="w-full bg-[#2d3235] text-white font-black uppercase py-3 border-2 border-[#2d3235] shadow-[4px_4px_0px_#5a5f63] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {forgotPending ? "Envoi…" : "Envoyer le lien"}
              </button>

              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="w-full text-sm text-[#5a5f63] hover:text-[#2d3235] underline text-center mt-2"
              >
                ← Retour à la connexion
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
