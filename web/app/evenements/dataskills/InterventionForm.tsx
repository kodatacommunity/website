"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const inputClass =
  "border-2 border-[#2d3235] px-4 py-3 bg-[#efeadd] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#2d3235] transition-all placeholder:text-[#5a5f63]/60 w-full";

export default function InterventionForm() {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    thematique: "",
    sujet_propose: "",
    bio_courte: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/dataskills/intervenir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
    } else {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue. Réessayez.");
    }
  }

  if (success) {
    return (
      <div className="border-2 border-[#2d3235] bg-white shadow-[4px_4px_0px_0px_#1d8f6d] px-10 py-12 text-center">
        <CheckCircle className="w-12 h-12 text-[#1d8f6d] mx-auto mb-4" />
        <h4 className="text-xl font-black text-[#2d3235] mb-2">Proposition reçue !</h4>
        <p className="text-[#5a5f63] leading-relaxed">
          Merci ! L&apos;équipe Kodata: reviendra vers vous rapidement.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-2 border-[#2d3235] bg-white shadow-[4px_4px_0px_0px_#2d3235] p-6 md:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mb-2">
        Candidature libre
      </p>
      <h3 className="text-2xl font-black text-[#2d3235] mb-6">
        Proposer votre intervention
      </h3>

      <div className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="int-prenom"
              className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]"
            >
              Prénom <span className="text-[#c24b46]">*</span>
            </label>
            <input
              id="int-prenom"
              name="prenom"
              type="text"
              required
              value={form.prenom}
              onChange={handleChange}
              placeholder="Votre prénom"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="int-nom"
              className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]"
            >
              Nom <span className="text-[#c24b46]">*</span>
            </label>
            <input
              id="int-nom"
              name="nom"
              type="text"
              required
              value={form.nom}
              onChange={handleChange}
              placeholder="Votre nom"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="int-email"
            className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]"
          >
            Email <span className="text-[#c24b46]">*</span>
          </label>
          <input
            id="int-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="vous@exemple.com"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="int-thematique"
            className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]"
          >
            Thématique
          </label>
          <input
            id="int-thematique"
            name="thematique"
            type="text"
            value={form.thematique}
            onChange={handleChange}
            placeholder="Ex : Machine Learning, Data governance…"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="int-sujet"
            className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]"
          >
            Sujet proposé <span className="text-[#c24b46]">*</span>
          </label>
          <input
            id="int-sujet"
            name="sujet_propose"
            type="text"
            required
            value={form.sujet_propose}
            onChange={handleChange}
            placeholder="Ex : Introduction à dbt, Visualisation avec Plotly…"
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="int-bio"
            className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]"
          >
            Présentation courte <span className="text-[#c24b46]">*</span>
          </label>
          <textarea
            id="int-bio"
            name="bio_courte"
            rows={4}
            required
            value={form.bio_courte}
            onChange={handleChange}
            placeholder="Qui êtes-vous ? Quelle expertise apportez-vous sur ce sujet ?"
            className="border-2 border-[#2d3235] px-4 py-3 bg-[#efeadd] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#2d3235] transition-all resize-none placeholder:text-[#5a5f63]/60 w-full"
          />
        </div>

        {error && (
          <p className="text-[#c24b46] font-semibold border-2 border-[#c24b46] px-4 py-3 bg-[#c24b46]/10 text-sm">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 bg-[#1d8f6d] text-white px-6 py-3 border-2 border-[#2d3235] shadow-[4px_4px_0px_0px_#2d3235] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d3235] transition-all font-semibold disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 w-full justify-center"
        >
          {loading ? "Envoi…" : "Envoyer ma proposition"}
          {!loading && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </form>
  );
}
