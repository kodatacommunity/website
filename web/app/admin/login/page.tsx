"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <div className="min-h-screen bg-[#efeadd] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="border-2 border-[#2d3235] bg-white shadow-[6px_6px_0px_#2d3235] p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#2d3235] uppercase tracking-tight">
              Kodata Admin
            </h1>
            <p className="text-[#5a5f63] text-sm mt-1">
              Connectez-vous pour accéder au dashboard.
            </p>
          </div>

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
          </form>
        </div>
      </div>
    </div>
  );
}
