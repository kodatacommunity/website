"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle, Calendar, X } from "lucide-react";

type Appel = {
  id: string;
  titre: string;
  description: string;
  theme: string | null;
  competences_recherchees: string[];
  date_workshop: string | null;
  created_at: string;
};

const inputClass =
  "border-2 border-[#2d3235] px-4 py-3 bg-[#efeadd] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#2d3235] transition-all placeholder:text-[#5a5f63]/60 w-full";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function CandidatureForm({ appel, onClose }: { appel: Appel; onClose: () => void }) {
  const [form, setForm] = useState({ prenom: "", nom: "", email: "", sujet_propose: "", bio_courte: "" });
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

    const res = await fetch("/api/dataskills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, appel_id: appel.id }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
    } else {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue. Réessayez.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d3235]/60">
      <div className="bg-[#efeadd] border-2 border-[#2d3235] shadow-[8px_8px_0px_0px_#2d3235] w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between p-6 border-b-2 border-[#2d3235]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mb-1">
              Candidature
            </p>
            <h3 className="text-xl font-black text-[#2d3235]">{appel.titre}</h3>
          </div>
          <button
            onClick={onClose}
            className="border-2 border-[#2d3235] p-1.5 hover:bg-[#2d3235] hover:text-[#efeadd] transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-10">
              <CheckCircle className="w-14 h-14 text-[#1d8f6d] mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-2">Candidature envoyée !</h4>
              <p className="text-[#5a5f63] leading-relaxed">
                Merci ! L&apos;équipe Kodata: reviendra vers vous rapidement.
              </p>
              <button
                onClick={onClose}
                className="mt-6 border-2 border-[#2d3235] px-5 py-2 text-sm font-semibold hover:bg-[#2d3235] hover:text-[#efeadd] transition-colors"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="prenom" className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]">
                    Prénom <span className="text-[#c24b46]">*</span>
                  </label>
                  <input
                    id="prenom"
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
                  <label htmlFor="nom" className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]">
                    Nom <span className="text-[#c24b46]">*</span>
                  </label>
                  <input
                    id="nom"
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
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]">
                  Email <span className="text-[#c24b46]">*</span>
                </label>
                <input
                  id="email"
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
                <label htmlFor="sujet_propose" className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]">
                  Sujet proposé <span className="text-[#c24b46]">*</span>
                </label>
                <input
                  id="sujet_propose"
                  name="sujet_propose"
                  type="text"
                  required
                  value={form.sujet_propose}
                  onChange={handleChange}
                  placeholder="Ex: Introduction à dbt, Visualisation avec Plotly…"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="bio_courte" className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]">
                  Présentation courte <span className="text-[#c24b46]">*</span>
                </label>
                <textarea
                  id="bio_courte"
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
                {loading ? "Envoi…" : "Envoyer ma candidature"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function DataskillsClient({ appels }: { appels: Appel[] }) {
  const [selectedAppel, setSelectedAppel] = useState<Appel | null>(null);

  if (appels.length === 0) {
    return (
      <div className="border-2 border-[#2d3235] bg-white px-10 pt-10 pb-16 text-center shadow-[4px_4px_0px_0px_#2d3235] mb-1">
        <p className="text-[#5a5f63] text-lg mb-2">Aucun appel à contributeur ouvert pour le moment.</p>
        <p className="text-[#5a5f63] text-sm">Revenez bientôt ou suivez-nous sur nos réseaux.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {appels.map((appel) => (
          <div
            key={appel.id}
            className="border-2 border-[#2d3235] bg-white shadow-[4px_4px_0px_0px_#2d3235] p-6"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {appel.theme && (
                    <span className="text-xs font-black uppercase px-2 py-0.5 bg-[#e8b056] text-[#2d3235] border border-[#2d3235]">
                      {appel.theme}
                    </span>
                  )}
                  <span className="text-xs font-black uppercase px-2 py-0.5 bg-[#1d8f6d] text-white">
                    Appel ouvert
                  </span>
                </div>

                <h3 className="text-2xl font-black text-[#2d3235] mb-3">{appel.titre}</h3>
                <p className="text-[#5a5f63] leading-relaxed mb-4">{appel.description}</p>

                {appel.competences_recherchees && appel.competences_recherchees.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#2d3235] mb-2">
                      Compétences recherchées
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {appel.competences_recherchees.map((c) => (
                        <span
                          key={c}
                          className="text-xs font-semibold px-2.5 py-1 bg-[#2d3235]/10 border border-[#2d3235]/30 text-[#2d3235]"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {appel.date_workshop && (
                  <div className="flex items-center gap-2 text-sm text-[#5a5f63]">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>Session prévue le <strong className="text-[#2d3235]">{formatDate(appel.date_workshop)}</strong></span>
                  </div>
                )}
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={() => setSelectedAppel(appel)}
                  className="inline-flex items-center gap-2 bg-[#2d3235] text-[#efeadd] px-6 py-3 border-2 border-[#2d3235] shadow-[4px_4px_0px_0px_#1d8f6d] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#1d8f6d] transition-all font-semibold whitespace-nowrap"
                >
                  Je candidate
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAppel && (
        <CandidatureForm appel={selectedAppel} onClose={() => setSelectedAppel(null)} />
      )}
    </>
  );
}
