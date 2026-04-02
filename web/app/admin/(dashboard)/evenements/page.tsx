"use client";

import { useEffect, useState } from "react";

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
};

const TYPES = ["Meetup", "Workshop", "Hackathon", "Conférence", "Autre"];
const FORMATS = ["Présentiel", "online", "hybride"];

export default function EvenementsAdminPage() {
  const [items, setItems] = useState<Evenement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Evenement, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/evenements");
    const json = await res.json();
    setItems(json.data || []);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  function startAdd() {
    setForm(EMPTY);
    setEditingId(null);
    setError("");
    setShowForm(true);
  }

  function startEdit(item: Evenement) {
    const { id, ...rest } = item;
    setForm(rest);
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

  const set = (field: string, value: string | number | boolean | null) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#2d3235] uppercase">Événements</h1>
        <button
          onClick={startAdd}
          className="bg-[#1d8f6d] text-white font-black uppercase px-4 py-2 border-2 border-[#2d3235] shadow-[4px_4px_0px_#2d3235] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-sm"
        >
          + Ajouter
        </button>
      </div>

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
    </div>
  );
}
