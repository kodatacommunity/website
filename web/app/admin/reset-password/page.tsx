"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError("Erreur : " + error.message);
    } else {
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen bg-[#efeadd] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="border-2 border-[#2d3235] bg-white shadow-[6px_6px_0px_#2d3235] p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-black text-[#2d3235] uppercase tracking-tight">
              Nouveau mot de passe
            </h1>
            <p className="text-[#5a5f63] text-sm mt-1">
              Choisissez un nouveau mot de passe pour votre compte admin.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-[#2d3235] mb-1 uppercase"
              >
                Nouveau mot de passe
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 text-[#2d3235] bg-[#efeadd] focus:outline-none focus:bg-white"
              />
            </div>

            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-bold text-[#2d3235] mb-1 uppercase"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirm"
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 text-[#2d3235] bg-[#efeadd] focus:outline-none focus:bg-white"
              />
            </div>

            {error && (
              <p className="text-sm text-[#c24b46] font-bold border-2 border-[#c24b46] px-3 py-2 bg-red-50">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1d8f6d] text-white font-black uppercase py-3 border-2 border-[#2d3235] shadow-[4px_4px_0px_#2d3235] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Enregistrement…" : "Enregistrer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
