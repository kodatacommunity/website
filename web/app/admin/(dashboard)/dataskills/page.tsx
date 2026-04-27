"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, ChevronRight, ToggleLeft, ToggleRight, Trash2, X } from "lucide-react";

type Appel = {
  id: string;
  created_at: string;
  titre: string;
  description: string;
  theme: string | null;
  competences_recherchees: string[];
  date_workshop: string | null;
  statut: "ouvert" | "ferme";
  dataskills_candidatures: { count: number }[];
};

const inputClass =
  "border-2 border-[#2d3235] px-4 py-3 bg-[#efeadd] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#2d3235] transition-all placeholder:text-[#5a5f63]/60 w-full";

function NouvelAppelModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({
    titre: "",
    description: "",
    theme: "",
    date_workshop: "",
    competences_input: "",
  });
  const [competences, setCompetences] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function addCompetence() {
    const val = form.competences_input.trim();
    if (val && !competences.includes(val)) {
      setCompetences((c) => [...c, val]);
    }
    setForm((f) => ({ ...f, competences_input: "" }));
  }

  function removeCompetence(val: string) {
    setCompetences((c) => c.filter((x) => x !== val));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/dataskills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titre: form.titre,
        description: form.description,
        theme: form.theme || null,
        date_workshop: form.date_workshop || null,
        competences_recherchees: competences,
      }),
    });

    setLoading(false);
    if (res.ok) {
      onCreated();
      onClose();
    } else {
      const data = await res.json();
      setError(data.error || "Erreur lors de la création.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2d3235]/60">
      <div className="bg-[#efeadd] border-2 border-[#2d3235] shadow-[8px_8px_0px_0px_#2d3235] w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b-2 border-[#2d3235]">
          <h3 className="text-xl font-black text-[#2d3235] uppercase">Nouvel appel</h3>
          <button
            onClick={onClose}
            className="border-2 border-[#2d3235] p-1.5 hover:bg-[#2d3235] hover:text-[#efeadd] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]">
              Titre <span className="text-[#c24b46]">*</span>
            </label>
            <input name="titre" required value={form.titre} onChange={handleChange} placeholder="Ex: Appel DataSkills #4 — Mai 2026" className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]">
              Description <span className="text-[#c24b46]">*</span>
            </label>
            <textarea name="description" required rows={4} value={form.description} onChange={handleChange} placeholder="Décrivez le contexte et ce que vous cherchez…" className="border-2 border-[#2d3235] px-4 py-3 bg-[#efeadd] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#2d3235] transition-all resize-none placeholder:text-[#5a5f63]/60 w-full" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]">
                Thème
              </label>
              <input name="theme" value={form.theme} onChange={handleChange} placeholder="Ex: Machine Learning" className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]">
                Date du workshop
              </label>
              <input name="date_workshop" type="date" value={form.date_workshop} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-[#2d3235]">
              Compétences recherchées
            </label>
            <div className="flex gap-2">
              <input
                name="competences_input"
                value={form.competences_input}
                onChange={handleChange}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCompetence(); } }}
                placeholder="Ex: Python, dbt…"
                className={inputClass}
              />
              <button type="button" onClick={addCompetence} className="border-2 border-[#2d3235] px-3 hover:bg-[#2d3235] hover:text-[#efeadd] transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {competences.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {competences.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 bg-[#2d3235] text-[#efeadd] text-xs font-semibold px-2.5 py-1 border border-[#2d3235]">
                    {c}
                    <button type="button" onClick={() => removeCompetence(c)} className="hover:text-[#e8b056]">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {error && (
            <p className="text-[#c24b46] font-semibold border-2 border-[#c24b46] px-4 py-3 bg-[#c24b46]/10 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1d8f6d] text-white font-black uppercase px-6 py-3 border-2 border-[#2d3235] shadow-[4px_4px_0px_#2d3235] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
          >
            {loading ? "Création…" : "Créer l'appel"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function DataskillsAdminPage() {
  const [appels, setAppels] = useState<Appel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [processing, setProcessing] = useState<string | null>(null);

  async function fetchAppels() {
    setLoading(true);
    const res = await fetch("/api/admin/dataskills");
    const json = await res.json();
    setAppels(json.data || []);
    setLoading(false);
  }

  useEffect(() => { fetchAppels(); }, []);

  async function toggleStatut(appel: Appel) {
    const newStatut = appel.statut === "ouvert" ? "ferme" : "ouvert";
    const label = newStatut === "ferme" ? "Fermer cet appel ?" : "Rouvrir cet appel ?";
    if (!confirm(label)) return;
    setProcessing(appel.id);
    await fetch(`/api/admin/dataskills/${appel.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut: newStatut }),
    });
    setProcessing(null);
    fetchAppels();
  }

  async function deleteAppel(id: string) {
    if (!confirm("Supprimer cet appel et toutes ses candidatures ?")) return;
    setProcessing(id);
    await fetch(`/api/admin/dataskills/${id}`, { method: "DELETE" });
    setProcessing(null);
    fetchAppels();
  }

  const ouverts = appels.filter((a) => a.statut === "ouvert").length;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#2d3235] uppercase">DataSkills</h1>
          <p className="text-[#5a5f63] text-sm mt-1">{ouverts} appel{ouverts !== 1 ? "s" : ""} ouvert{ouverts !== 1 ? "s" : ""}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-[#1d8f6d] text-white text-sm font-black uppercase px-5 py-2.5 border-2 border-[#2d3235] shadow-[3px_3px_0px_#2d3235] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          Nouvel appel
        </button>
      </div>

      {loading ? (
        <p className="text-[#5a5f63]">Chargement…</p>
      ) : appels.length === 0 ? (
        <p className="text-[#5a5f63]">Aucun appel créé.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {appels.map((appel) => {
            const count = appel.dataskills_candidatures?.[0]?.count ?? 0;
            return (
              <div key={appel.id} className="border-2 border-[#2d3235] bg-white shadow-[4px_4px_0px_#2d3235] p-5">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`text-xs font-black uppercase px-2 py-0.5 ${appel.statut === "ouvert" ? "bg-[#1d8f6d] text-white" : "bg-[#5a5f63] text-white"}`}>
                        {appel.statut === "ouvert" ? "Ouvert" : "Fermé"}
                      </span>
                      {appel.theme && (
                        <span className="text-xs font-semibold px-2 py-0.5 bg-[#e8b056] text-[#2d3235] border border-[#2d3235]">
                          {appel.theme}
                        </span>
                      )}
                    </div>
                    <h2 className="font-black text-[#2d3235] text-lg mb-1">{appel.titre}</h2>
                    <p className="text-sm text-[#5a5f63] line-clamp-2 mb-2">{appel.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-[#5a5f63]">
                      {appel.date_workshop && (
                        <span>Session : <strong className="text-[#2d3235]">{new Date(appel.date_workshop).toLocaleDateString("fr-FR")}</strong></span>
                      )}
                      <span>Créé le <strong className="text-[#2d3235]">{new Date(appel.created_at).toLocaleDateString("fr-FR")}</strong></span>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2 flex-shrink-0 items-start">
                    <Link
                      href={`/admin/dataskills/${appel.id}`}
                      className="flex items-center gap-2 text-xs font-black uppercase px-4 py-2 border-2 border-[#2d3235] hover:bg-[#efeadd] transition-colors"
                    >
                      {count} candidature{count !== 1 ? "s" : ""}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => toggleStatut(appel)}
                      disabled={processing === appel.id}
                      className={`flex items-center gap-2 text-xs font-black uppercase px-4 py-2 border-2 transition-colors disabled:opacity-50 ${
                        appel.statut === "ouvert"
                          ? "border-[#e8b056] text-[#2d3235] hover:bg-[#e8b056]"
                          : "border-[#1d8f6d] text-[#1d8f6d] hover:bg-[#1d8f6d] hover:text-white"
                      }`}
                    >
                      {appel.statut === "ouvert" ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      {appel.statut === "ouvert" ? "Fermer" : "Rouvrir"}
                    </button>
                    <button
                      onClick={() => deleteAppel(appel.id)}
                      disabled={processing === appel.id}
                      className="flex items-center gap-2 text-xs font-black uppercase px-4 py-2 border-2 border-[#c24b46] text-[#c24b46] hover:bg-[#c24b46] hover:text-white transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showModal && (
        <NouvelAppelModal onClose={() => setShowModal(false)} onCreated={fetchAppels} />
      )}
    </div>
  );
}
