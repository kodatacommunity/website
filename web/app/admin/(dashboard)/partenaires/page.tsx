"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageCropUpload from "@/components/ImageCropUpload";

type Partenaire = {
  id: string;
  nom: string;
  type: string;
  logo_url: string | null;
  bg_color: string;
  ordre: number;
};

const EMPTY: Omit<Partenaire, "id"> = {
  nom: "",
  type: "Technique",
  logo_url: null,
  bg_color: "bg-[#1d8f6d]",
  ordre: 0,
};

const COLORS = [
  { value: "bg-[#1d8f6d]", label: "Vert" },
  { value: "bg-[#2d3235]", label: "Sombre" },
  { value: "bg-[#e8b056]", label: "Ambre" },
  { value: "bg-[#c24b46]", label: "Rouge" },
  { value: "bg-[#d67035]", label: "Orange" },
];

const TYPES = ["Technique", "Institutionnel", "Académique", "Médias"];

async function uploadFile(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("bucket", "logos");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json.url as string;
}

export default function PartenairesAdminPage() {
  const [items, setItems] = useState<Partenaire[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Partenaire, "id">>(EMPTY);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/partenaires");
    const json = await res.json();
    setItems(json.data || []);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  function startAdd() {
    setForm(EMPTY);
    setLogoFile(null);
    setEditingId(null);
    setError("");
    setShowForm(true);
  }

  function startEdit(item: Partenaire) {
    const { id, ...rest } = item;
    setForm(rest);
    setLogoFile(null);
    setEditingId(id);
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      let logo_url = form.logo_url;
      if (logoFile) logo_url = await uploadFile(logoFile);
      const payload = { ...form, logo_url };
      const url = editingId ? `/api/admin/partenaires/${editingId}` : "/api/admin/partenaires";
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
    if (!confirm("Supprimer ce partenaire ?")) return;
    await fetch(`/api/admin/partenaires/${id}`, { method: "DELETE" });
    fetchItems();
  }

  const set = (field: string, value: string | number) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#2d3235] uppercase">Partenaires</h1>
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
            {editingId ? "Modifier" : "Ajouter"} un partenaire
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Nom *</label>
              <input type="text" required value={form.nom} onChange={(e) => set("nom", e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Type</label>
              <select value={form.type} onChange={(e) => set("type", e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none">
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Couleur de fond</label>
              <select value={form.bg_color} onChange={(e) => set("bg_color", e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none">
                {COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Ordre d&apos;affichage</label>
              <input type="number" value={form.ordre} onChange={(e) => set("ordre", Number(e.target.value))}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none" />
            </div>
            <div className="sm:col-span-2">
              <ImageCropUpload
                label="Logo (PNG, JPG)"
                currentUrl={logoFile ? null : form.logo_url}
                onFileReady={(file) => setLogoFile(file)}
              />
            </div>
          </div>
          {error && <p className="text-[#c24b46] text-sm font-bold mt-3">{error}</p>}
          <div className="flex gap-3 mt-4">
            <button type="submit" disabled={saving}
              className="bg-[#1d8f6d] text-white font-black uppercase px-6 py-2 border-2 border-[#2d3235] shadow-[3px_3px_0px_#2d3235] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 text-sm">
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="font-bold uppercase px-6 py-2 border-2 border-[#2d3235] text-[#2d3235] hover:bg-[#efeadd] transition-colors text-sm">
              Annuler
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-[#5a5f63]">Chargement…</p>
      ) : items.length === 0 ? (
        <p className="text-[#5a5f63]">Aucun partenaire.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <div key={item.id} className="border-2 border-[#2d3235] bg-white flex items-center gap-4 p-4">
              <div className={`w-16 h-16 ${item.bg_color} border-2 border-[#2d3235] flex items-center justify-center shrink-0`}>
                {item.logo_url ? (
                  <Image src={item.logo_url} alt={item.nom} width={48} height={48} className="w-10 h-10 object-contain" />
                ) : (
                  <span className="text-white text-xs font-black">{item.nom.slice(0, 2).toUpperCase()}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-[#2d3235] truncate">{item.nom}</p>
                <p className="text-xs text-[#5a5f63]">{item.type} · ordre {item.ordre}</p>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => startEdit(item)} className="text-xs font-bold uppercase px-2 py-1 border-2 border-[#2d3235] hover:bg-[#efeadd] transition-colors">
                  Éditer
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-xs font-bold uppercase px-2 py-1 border-2 border-[#c24b46] text-[#c24b46] hover:bg-[#c24b46] hover:text-white transition-colors">
                  Suppr.
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
