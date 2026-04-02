"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ImageCropUpload from "@/components/ImageCropUpload";

type Membre = {
  id: string;
  nom: string;
  prenom: string;
  initiales: string;
  photo_url: string | null;
  color: string;
  langages: string[];
  linkedin: string;
  facebook: string;
};

const EMPTY: Omit<Membre, "id"> = {
  nom: "",
  prenom: "",
  initiales: "",
  photo_url: null,
  color: "bg-[#1d8f6d]",
  langages: [],
  linkedin: "",
  facebook: "",
};

const COLORS = [
  { value: "bg-[#1d8f6d]", label: "Vert" },
  { value: "bg-[#e8b056]", label: "Ambre" },
  { value: "bg-[#c24b46]", label: "Rouge" },
  { value: "bg-[#d67035]", label: "Orange" },
  { value: "bg-[#2d3235]", label: "Sombre" },
];

async function uploadFile(file: File) {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("bucket", "photos");
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json.url as string;
}

export default function MembresAdminPage() {
  const [items, setItems] = useState<Membre[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Membre, "id">>(EMPTY);
  const [langagesInput, setLangagesInput] = useState("");
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/membres");
    const json = await res.json();
    setItems(json.data || []);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  function startAdd() {
    setForm(EMPTY);
    setLangagesInput("");
    setPhotoFile(null);
    setEditingId(null);
    setError("");
    setShowForm(true);
  }

  function startEdit(item: Membre) {
    const { id, ...rest } = item;
    setForm(rest);
    setLangagesInput(item.langages.join(", "));
    setPhotoFile(null);
    setEditingId(id);
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      let photo_url = form.photo_url;
      if (photoFile) photo_url = await uploadFile(photoFile);
      const langages = langagesInput.split(",").map((l) => l.trim()).filter(Boolean);
      const payload = { ...form, photo_url, langages };
      const url = editingId ? `/api/admin/membres/${editingId}` : "/api/admin/membres";
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
    if (!confirm("Supprimer ce membre ?")) return;
    await fetch(`/api/admin/membres/${id}`, { method: "DELETE" });
    fetchItems();
  }

  const set = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-[#2d3235] uppercase">Membres</h1>
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
            {editingId ? "Modifier" : "Ajouter"} un membre
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Prénom *</label>
              <input type="text" required value={form.prenom} onChange={(e) => set("prenom", e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Nom *</label>
              <input type="text" required value={form.nom} onChange={(e) => set("nom", e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Initiales *</label>
              <input type="text" required maxLength={3} value={form.initiales} onChange={(e) => set("initiales", e.target.value.toUpperCase())}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Couleur avatar</label>
              <select value={form.color} onChange={(e) => set("color", e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none">
                {COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Compétences (séparées par virgule)</label>
              <input type="text" value={langagesInput} onChange={(e) => setLangagesInput(e.target.value)}
                placeholder="Python, SQL, Machine Learning"
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white" />
            </div>
            <ImageCropUpload
              label="Photo"
              aspect={1}
              currentUrl={photoFile ? null : form.photo_url}
              onFileReady={(file) => setPhotoFile(file)}
            />
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">LinkedIn (URL)</label>
              <input type="url" value={form.linkedin} onChange={(e) => set("linkedin", e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-[#2d3235] mb-1">Facebook (URL)</label>
              <input type="url" value={form.facebook} onChange={(e) => set("facebook", e.target.value)}
                className="w-full border-2 border-[#2d3235] px-3 py-2 bg-[#efeadd] text-[#2d3235] focus:outline-none focus:bg-white" />
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
        <p className="text-[#5a5f63]">Aucun membre.</p>
      ) : (
        <div className="border-2 border-[#2d3235] bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#2d3235] text-white">
              <tr>
                <th className="text-left px-4 py-2 font-black uppercase text-xs">Membre</th>
                <th className="text-left px-4 py-2 font-black uppercase text-xs hidden md:table-cell">Compétences</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-[#f5f2eb]"}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {item.photo_url ? (
                        <Image src={item.photo_url} alt={item.nom} width={32} height={32} className="w-8 h-8 rounded-full object-cover border border-[#2d3235]" />
                      ) : (
                        <div className={`w-8 h-8 ${item.color} flex items-center justify-center text-white text-xs font-black border border-[#2d3235]`}>
                          {item.initiales}
                        </div>
                      )}
                      <span className="font-bold text-[#2d3235]">{item.prenom} {item.nom}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#5a5f63] hidden md:table-cell">
                    {item.langages.join(", ") || "—"}
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
