"use client";

import { useEffect, useState } from "react";

type Projet = {
  id: string;
  titre: string;
  slug: string;
  description: string;
  tags: string[];
  status: string;
  status_color: string;
  contributeurs: number;
  ouvert: boolean;
  ordre: number;
};

const EMPTY: Omit<Projet, "id"> = {
  titre: "",
  slug: "",
  description: "",
  tags: [],
  status: "En cours",
  status_color: "bg-[#1d8f6d]",
  contributeurs: 0,
  ouvert: true,
  ordre: 0,
};

const STATUS_OPTIONS = [
  { value: "En cours", color: "bg-[#1d8f6d]" },
  { value: "Terminé", color: "bg-[#2d3235]" },
  { value: "En pause", color: "bg-[#e8b056]" },
  { value: "Recherche contributeurs", color: "bg-[#d67035]" },
];

function toSlug(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProjetsAdminPage() {
  const [items, setItems] = useState<Projet[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Projet, "id">>(EMPTY);
  const [tagsInput, setTagsInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/projets");
    const json = await res.json();
    setItems(json.data || []);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  function startAdd() {
    setForm(EMPTY);
    setTagsInput("");
    setEditingId(null);
    setError("");
    setShowForm(true);
  }

  function startEdit(item: Projet) {
    const { id, ...rest } = item;
    setForm(rest);
    setTagsInput(item.tags.join(", "));
    setEditingId(id);
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
      const payload = { ...form, tags };
      const url = editingId ? `/api/admin/projets/${editingId}` : "/api/admin/projets";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
    if (!confirm("Supprimer ce projet ?")) return;
    await fetch(`/api/admin/projets/${id}`, { method: "DELETE" });
    fetchItems();
  }

  const set = (field: string, value: string | number | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#2d3235] uppercase">Projets</h1>
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
            {editingId ? "Modifier" : "Ajouter"} un projet
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Titre *</label>
              <input
                type="text"
                value={form.titre}
                required
                onChange={(e) => {
                  set("titre", e.target.value);
                  if (!editingId) set("slug", toSlug(e.target.value));
                }}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Slug *</label>
              <input
                type="text"
                value={form.slug}
                required
                onChange={(e) => set("slug", e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Statut</label>
              <select
                value={form.status}
                onChange={(e) => {
                  const opt = STATUS_OPTIONS.find((s) => s.value === e.target.value);
                  set("status", e.target.value);
                  if (opt) set("status_color", opt.color);
                }}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s.value} value={s.value}>{s.value}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Contributeurs</label>
              <input
                type="number"
                min={0}
                value={form.contributeurs}
                onChange={(e) => set("contributeurs", Number(e.target.value))}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">
                Tags (séparés par des virgules)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="#open-data, #dataviz"
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Ordre d&apos;affichage</label>
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
          <div className="mt-4 flex items-center gap-3">
            <input
              id="ouvert"
              type="checkbox"
              checked={form.ouvert}
              onChange={(e) => set("ouvert", e.target.checked)}
              className="w-4 h-4 border-2 border-[#2d3235]"
            />
            <label htmlFor="ouvert" className="text-sm font-bold text-[#2d3235]">
              Ouvert aux contributions
            </label>
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
        <p className="text-[#5a5f63]">Aucun projet.</p>
      ) : (
        <div className="border-2 border-[#2d3235] bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#2d3235] text-white">
              <tr>
                <th className="text-left px-4 py-2 font-black uppercase text-xs">Titre</th>
                <th className="text-left px-4 py-2 font-black uppercase text-xs hidden sm:table-cell">Statut</th>
                <th className="text-left px-4 py-2 font-black uppercase text-xs hidden md:table-cell">Contrib.</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f2eb]"}>
                  <td className="px-4 py-3 font-bold text-[#2d3235]">
                    {item.titre}
                    <span className="block text-xs text-[#5a5f63] font-normal">{item.slug}</span>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`text-xs font-black uppercase text-white px-2 py-0.5 ${item.status_color}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#5a5f63] hidden md:table-cell">{item.contributeurs}</td>
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
