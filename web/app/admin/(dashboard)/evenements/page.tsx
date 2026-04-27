"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, XCircle, Clock, Upload, X, Image as ImageIcon } from "lucide-react";

type Evenement = {
  id: string;
  titre: string;
  description: string;
  jour: string;
  mois: string;
  date: string | null;
  type: string;
  lieu: string;
  heure: string;
  format: string;
  inscription_url: string;
  passe: boolean;
  participants: number | null;
  ordre: number;
  photos: string[];
};

type Demande = {
  id: string;
  created_at: string;
  prenom: string;
  nom: string;
  email: string;
  thematique: string | null;
  sujet_propose: string;
  bio_courte: string;
  statut: "en_attente" | "contacte" | "refuse";
};

const MOIS_FR = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"];

function dateToJourMois(dateStr: string): { jour: string; mois: string } {
  const d = new Date(dateStr + "T12:00:00");
  return {
    jour: String(d.getDate()).padStart(2, "0"),
    mois: MOIS_FR[d.getMonth()],
  };
}

const EMPTY: Omit<Evenement, "id"> = {
  titre: "",
  description: "",
  jour: "",
  mois: "",
  date: null,
  type: "Meetup",
  lieu: "",
  heure: "",
  format: "Présentiel",
  inscription_url: "",
  passe: false,
  participants: null,
  ordre: 0,
  photos: [],
};

const TYPES = ["Meetup", "Workshop", "Hackathon", "Conférence", "Autre"];
const FORMATS = ["Présentiel", "online", "hybride"];

const STATUT_DEMANDE: Record<string, { label: string; color: string }> = {
  en_attente: { label: "En attente", color: "bg-[#e8b056] text-[#2d3235]" },
  contacte: { label: "Contacté", color: "bg-[#1d8f6d] text-white" },
  refuse: { label: "Refusé", color: "bg-[#c24b46] text-white" },
};

export default function EvenementsAdminPage() {
  const [activeTab, setActiveTab] = useState<"evenements" | "intervenants">("evenements");

  // --- Événements state ---
  const [items, setItems] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Evenement, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  // --- Demandes state ---
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loadingDemandes, setLoadingDemandes] = useState(false);
  const [processingDemande, setProcessingDemande] = useState<string | null>(null);
  const [filtreStatut, setFiltreStatut] = useState<"tous" | "en_attente" | "contacte" | "refuse">("en_attente");

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/evenements");
    const json = await res.json();
    setItems(json.data || []);
    setLoading(false);
  }

  async function fetchDemandes() {
    setLoadingDemandes(true);
    const res = await fetch("/api/admin/evenements/intervenants");
    const json = await res.json();
    setDemandes(json.data || []);
    setLoadingDemandes(false);
  }

  useEffect(() => { fetchItems(); }, []);

  useEffect(() => {
    if (activeTab === "intervenants" && demandes.length === 0) {
      fetchDemandes();
    }
  }, [activeTab]);

  function startAdd() {
    setForm(EMPTY);
    setEditingId(null);
    setError("");
    setShowForm(true);
  }

  function startEdit(item: Evenement) {
    const { id, ...rest } = item;
    setForm({ ...rest, photos: rest.photos ?? [] });
    setEditingId(id);
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = editingId ? `/api/admin/evenements/${editingId}` : "/api/admin/evenements";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setShowForm(false);
      fetchItems();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet événement ?")) return;
    await fetch(`/api/admin/evenements/${id}`, { method: "DELETE" });
    fetchItems();
  }

  async function handleDemandeStatut(id: string, statut: "contacte" | "refuse") {
    const label = statut === "contacte" ? "Marquer comme contacté ?" : "Refuser cette demande ?";
    if (!confirm(label)) return;
    setProcessingDemande(id);
    await fetch(`/api/admin/evenements/intervenants/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ statut }),
    });
    setProcessingDemande(null);
    fetchDemandes();
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setUploadingPhoto(true);
    try {
      const urls: string[] = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("bucket", "evenements");
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error);
        urls.push(json.url);
      }
      setForm((f) => ({ ...f, photos: [...(f.photos ?? []), ...urls] }));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur upload photo");
    } finally {
      setUploadingPhoto(false);
      if (photoInputRef.current) photoInputRef.current.value = "";
    }
  }

  function removePhoto(url: string) {
    setForm((f) => ({ ...f, photos: (f.photos ?? []).filter((p) => p !== url) }));
  }

  const set = (field: string, value: string | number | boolean | null) =>
    setForm((f) => ({ ...f, [field]: value }));

  const filteredDemandes =
    filtreStatut === "tous" ? demandes : demandes.filter((d) => d.statut === filtreStatut);

  const countsDemandes = {
    tous: demandes.length,
    en_attente: demandes.filter((d) => d.statut === "en_attente").length,
    contacte: demandes.filter((d) => d.statut === "contacte").length,
    refuse: demandes.filter((d) => d.statut === "refuse").length,
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#2d3235] uppercase">Événements</h1>
          {activeTab === "intervenants" && (
            <p className="text-[#5a5f63] text-sm mt-1">
              {countsDemandes.en_attente} demande{countsDemandes.en_attente !== 1 ? "s" : ""} en attente
            </p>
          )}
        </div>
        {activeTab === "evenements" && (
          <button
            onClick={startAdd}
            className="bg-[#1d8f6d] text-white font-black uppercase px-4 py-2 border-2 border-[#2d3235] shadow-[4px_4px_0px_#2d3235] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-sm"
          >
            + Ajouter
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-2 border-[#2d3235] w-fit mb-6">
        <button
          onClick={() => setActiveTab("evenements")}
          className={`px-5 py-2 text-xs font-black uppercase transition-colors ${
            activeTab === "evenements"
              ? "bg-[#2d3235] text-[#efeadd]"
              : "bg-white text-[#2d3235] hover:bg-[#efeadd]"
          }`}
        >
          Événements
        </button>
        <button
          onClick={() => setActiveTab("intervenants")}
          className={`px-5 py-2 text-xs font-black uppercase border-l-2 border-[#2d3235] transition-colors ${
            activeTab === "intervenants"
              ? "bg-[#2d3235] text-[#efeadd]"
              : "bg-white text-[#2d3235] hover:bg-[#efeadd]"
          }`}
        >
          Demandes DataSkills
          {countsDemandes.en_attente > 0 && (
            <span className="ml-2 bg-[#c24b46] text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm">
              {countsDemandes.en_attente}
            </span>
          )}
        </button>
      </div>

      {/* ─── Onglet Événements ─── */}
      {activeTab === "evenements" && (
        <>
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="border-2 border-[#2d3235] bg-white shadow-[6px_6px_0px_#2d3235] p-6 mb-6"
            >
              <h2 className="font-black uppercase text-[#2d3235] mb-4">
                {editingId ? "Modifier" : "Ajouter"} un événement
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Titre *</label>
                  <input
                    type="text"
                    value={form.titre}
                    required
                    onChange={(e) => set("titre", e.target.value)}
                    className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Date *</label>
                  <input
                    type="date"
                    value={form.date ?? ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val) {
                        const { jour, mois } = dateToJourMois(val);
                        setForm((f) => ({ ...f, date: val, jour, mois }));
                      } else {
                        setForm((f) => ({ ...f, date: null, jour: "", mois: "" }));
                      }
                    }}
                    className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white"
                  />
                  {form.jour && form.mois && (
                    <p className="text-xs text-[#5a5f63] mt-1">Affiché : {form.jour} {form.mois}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => set("type", e.target.value)}
                    className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none"
                  >
                    {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Format</label>
                  <select
                    value={form.format}
                    onChange={(e) => set("format", e.target.value)}
                    className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none"
                  >
                    {FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Lieu</label>
                  <input
                    type="text"
                    value={form.lieu}
                    onChange={(e) => set("lieu", e.target.value)}
                    className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Heure</label>
                  <input
                    type="text"
                    value={form.heure}
                    onChange={(e) => set("heure", e.target.value)}
                    placeholder="14h00"
                    className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">URL d&apos;inscription</label>
                  <input
                    type="url"
                    value={form.inscription_url}
                    onChange={(e) => set("inscription_url", e.target.value)}
                    className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Ordre</label>
                  <input
                    type="number"
                    value={form.ordre}
                    onChange={(e) => set("ordre", Number(e.target.value))}
                    className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={3}
                  className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none resize-none"
                />
              </div>
              <div className="mt-4 flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.passe}
                    onChange={(e) => set("passe", e.target.checked)}
                    className="w-4 h-4 border-2 border-[#2d3235]"
                  />
                  <span className="text-sm font-bold text-[#2d3235]">Événement passé</span>
                </label>
                {form.passe && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Participants</label>
                    <input
                      type="number"
                      min={0}
                      value={form.participants ?? ""}
                      onChange={(e) => set("participants", e.target.value ? Number(e.target.value) : null)}
                      className="w-32 border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none"
                    />
                  </div>
                )}
              </div>
              {form.passe && (
                <div className="mt-5">
                  <label className="block text-xs font-bold uppercase text-[#2d3235] mb-3">Photos</label>
                  {(form.photos ?? []).length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
                      {(form.photos ?? []).map((url) => (
                        <div key={url} className="relative group aspect-square border-2 border-[#2d3235]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removePhoto(url)}
                            className="absolute top-1 right-1 bg-[#c24b46] text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity border border-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={uploadingPhoto}
                    className="flex items-center gap-2 text-xs font-bold uppercase px-4 py-2 border-2 border-dashed border-[#2d3235] text-[#2d3235] hover:bg-[#efeadd] transition-colors disabled:opacity-50"
                  >
                    {uploadingPhoto ? (
                      <>
                        <ImageIcon className="w-4 h-4 animate-pulse" />
                        Upload en cours…
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Ajouter des photos
                      </>
                    )}
                  </button>
                </div>
              )}
              {error && <p className="text-[#c24b46] text-sm font-bold mt-3">{error}</p>}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#1d8f6d] text-white font-black uppercase px-6 py-2 border-2 border-[#2d3235] shadow-[3px_3px_0px_#2d3235] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 text-sm"
                >
                  {saving ? "Enregistrement…" : "Enregistrer"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="font-bold uppercase px-6 py-2 border-2 border-[#2d3235] text-[#2d3235] hover:bg-[#efeadd] transition-colors text-sm"
                >
                  Annuler
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <p className="text-[#5a5f63]">Chargement…</p>
          ) : items.length === 0 ? (
            <p className="text-[#5a5f63]">Aucun événement.</p>
          ) : (
            <div className="border-2 border-[#2d3235] bg-white overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-[#2d3235] text-white">
                  <tr>
                    <th className="text-left px-4 py-2 font-black uppercase text-xs">Titre</th>
                    <th className="text-left px-4 py-2 font-black uppercase text-xs hidden sm:table-cell">Date</th>
                    <th className="text-left px-4 py-2 font-black uppercase text-xs hidden md:table-cell">Type</th>
                    <th className="text-left px-4 py-2 font-black uppercase text-xs hidden md:table-cell">Statut</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f2eb]"}>
                      <td className="px-4 py-3 font-bold text-[#2d3235]">{item.titre}</td>
                      <td className="px-4 py-3 text-[#5a5f63] hidden sm:table-cell">
                        {item.jour} {item.mois}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-xs font-bold bg-[#efeadd] border border-[#2d3235] px-2 py-0.5">{item.type}</span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className={`text-xs font-black uppercase text-white px-2 py-0.5 ${item.passe ? "bg-[#2d3235]" : "bg-[#1d8f6d]"}`}>
                          {item.passe ? "Passé" : "À venir"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-end">
                          <button onClick={() => startEdit(item)} className="text-xs font-bold uppercase px-3 py-1 border-2 border-[#2d3235] hover:bg-[#efeadd] transition-colors">
                            Éditer
                          </button>
                          <button onClick={() => handleDelete(item.id)} className="text-xs font-bold uppercase px-3 py-1 border-2 border-[#c24b46] text-[#c24b46] hover:bg-[#c24b46] hover:text-white transition-colors">
                            Suppr.
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ─── Onglet Demandes DataSkills ─── */}
      {activeTab === "intervenants" && (
        <>
          {/* Filtres */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(["en_attente", "contacte", "refuse", "tous"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltreStatut(f)}
                className={`px-4 py-2 text-xs font-black uppercase border-2 border-[#2d3235] transition-all ${
                  filtreStatut === f ? "bg-[#2d3235] text-[#efeadd]" : "bg-white text-[#2d3235] hover:bg-[#efeadd]"
                }`}
              >
                {f === "tous" ? "Tous" : STATUT_DEMANDE[f].label} ({countsDemandes[f]})
              </button>
            ))}
          </div>

          {loadingDemandes ? (
            <p className="text-[#5a5f63]">Chargement…</p>
          ) : filteredDemandes.length === 0 ? (
            <p className="text-[#5a5f63]">Aucune demande.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredDemandes.map((d) => {
                const statut = STATUT_DEMANDE[d.statut] ?? STATUT_DEMANDE.en_attente;
                const isPending = d.statut === "en_attente";
                return (
                  <div key={d.id} className="border-2 border-[#2d3235] bg-white shadow-[4px_4px_0px_#2d3235] p-5">
                    <div className="flex flex-col md:flex-row md:items-start gap-5">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h2 className="font-black text-[#2d3235] text-lg">
                            {d.prenom} {d.nom}
                          </h2>
                          <span className={`text-xs font-black uppercase px-2 py-0.5 ${statut.color}`}>
                            {statut.label}
                          </span>
                          {d.thematique && (
                            <span className="text-xs font-semibold px-2 py-0.5 bg-[#e8b056] text-[#2d3235] border border-[#2d3235]">
                              {d.thematique}
                            </span>
                          )}
                        </div>

                        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-[#5a5f63] mb-3">
                          <span>
                            <span className="font-bold text-[#2d3235]">Email :</span>{" "}
                            <a href={`mailto:${d.email}`} className="hover:underline">{d.email}</a>
                          </span>
                          <span>
                            <span className="font-bold text-[#2d3235]">Date :</span>{" "}
                            {new Date(d.created_at).toLocaleDateString("fr-FR")}
                          </span>
                        </div>

                        <div className="mb-3">
                          <p className="text-xs font-semibold uppercase tracking-widest text-[#2d3235] mb-1">Sujet proposé</p>
                          <p className="text-sm font-semibold text-[#2d3235] border-l-2 border-[#e8b056] pl-3">{d.sujet_propose}</p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-widest text-[#2d3235] mb-1">Présentation</p>
                          <p className="text-sm text-[#5a5f63] leading-relaxed border-l-2 border-[#2d3235]/20 pl-3">{d.bio_courte}</p>
                        </div>
                      </div>

                      <div className="flex md:flex-col gap-2 flex-shrink-0">
                        {isPending ? (
                          <>
                            <button
                              onClick={() => handleDemandeStatut(d.id, "contacte")}
                              disabled={processingDemande === d.id}
                              className="flex items-center gap-2 bg-[#1d8f6d] text-white text-xs font-black uppercase px-4 py-2 border-2 border-[#2d3235] shadow-[3px_3px_0px_#2d3235] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Contacté
                            </button>
                            <button
                              onClick={() => handleDemandeStatut(d.id, "refuse")}
                              disabled={processingDemande === d.id}
                              className="flex items-center gap-2 text-xs font-black uppercase px-4 py-2 border-2 border-[#c24b46] text-[#c24b46] hover:bg-[#c24b46] hover:text-white transition-colors disabled:opacity-50"
                            >
                              <XCircle className="w-4 h-4" />
                              Refuser
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center gap-2 text-xs text-[#5a5f63]">
                            <Clock className="w-4 h-4" />
                            Traité
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
