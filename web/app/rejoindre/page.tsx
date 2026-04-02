"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle, X, Plus, Camera } from "lucide-react";
import Image from "next/image";

const niveaux = [
  { value: "debutant", label: "Débutant", desc: "Je découvre la data" },
  { value: "intermediaire", label: "Intermédiaire", desc: "Je travaille avec la data" },
  { value: "avance", label: "Avancé", desc: "Expert data / ML / ingénierie" },
];

function StacksPicker({
  selected,
  onChange,
}: {
  selected: string[];
  onChange: (stacks: string[]) => void;
}) {
  const [allStacks, setAllStacks] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/stacks")
      .then((r) => r.json())
      .then((data) => setAllStacks(Array.isArray(data) ? data : []));
  }, []);

  // Ferme le dropdown si clic hors du composant
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const filtered = allStacks.filter(
    (s) =>
      s.toLowerCase().includes(query.toLowerCase()) &&
      !selected.includes(s)
  );

  const queryIsNew =
    query.trim() !== "" &&
    !allStacks.some((s) => s.toLowerCase() === query.trim().toLowerCase()) &&
    !selected.some((s) => s.toLowerCase() === query.trim().toLowerCase());

  function addStack(value: string) {
    const trimmed = value.trim();
    if (!trimmed || selected.includes(trimmed)) return;
    onChange([...selected, trimmed]);
    setQuery("");
    inputRef.current?.focus();
  }

  function removeStack(value: string) {
    onChange(selected.filter((s) => s !== value));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filtered.length > 0 && !queryIsNew) {
        addStack(filtered[0]);
      } else if (queryIsNew) {
        addStack(query);
      }
    }
    if (e.key === "Backspace" && query === "" && selected.length > 0) {
      removeStack(selected[selected.length - 1]);
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Zone tags + input */}
      <div
        className="min-h-[50px] border-2 border-[#2d3235] bg-[#efeadd] px-3 py-2 flex flex-wrap gap-2 items-center cursor-text focus-within:bg-white focus-within:shadow-[4px_4px_0px_0px_#2d3235] transition-all"
        onClick={() => inputRef.current?.focus()}
      >
        {selected.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1.5 bg-[#2d3235] text-[#efeadd] text-xs font-semibold px-2.5 py-1 border border-[#2d3235]"
          >
            {s}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeStack(s); }}
              className="hover:text-[#e8b056] transition-colors"
              aria-label={`Supprimer ${s}`}
            >
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={selected.length === 0 ? "Python, SQL, Power BI…" : ""}
          className="flex-1 min-w-[140px] bg-transparent outline-none text-sm placeholder:text-[#5a5f63]/60"
        />
      </div>

      {/* Dropdown */}
      {open && (query !== "" || filtered.length > 0) && (
        <div className="absolute z-20 top-full left-0 right-0 border-2 border-t-0 border-[#2d3235] bg-white max-h-52 overflow-y-auto">
          {filtered.map((s) => (
            <button
              key={s}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); addStack(s); }}
              className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#efeadd] transition-colors border-b border-gray-100 last:border-0"
            >
              {s}
            </button>
          ))}
          {queryIsNew && (
            <button
              type="button"
              onMouseDown={(e) => { e.preventDefault(); addStack(query); }}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#1d8f6d] hover:bg-[#efeadd] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Ajouter &ldquo;{query.trim()}&rdquo;
            </button>
          )}
          {filtered.length === 0 && !queryIsNew && query !== "" && (
            <p className="px-4 py-2.5 text-sm text-[#5a5f63]">Aucun résultat.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function RejoindrePage() {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    ville: "",
    profession: "",
    niveau: "",
    motivation: "",
  });
  const [stacks, setStacks] = useState<string[]>([]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setPhotoFile(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    let photo_url: string | null = null;

    if (photoFile) {
      const fd = new FormData();
      fd.append("file", photoFile);
      const uploadRes = await fetch("/api/rejoindre/upload", { method: "POST", body: fd });
      if (!uploadRes.ok) {
        const data = await uploadRes.json();
        setError(data.error || "Erreur lors de l'upload de la photo.");
        setLoading(false);
        return;
      }
      const uploadData = await uploadRes.json();
      photo_url = uploadData.url;
    }

    const res = await fetch("/api/rejoindre", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, stacks, photo_url }),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
    } else {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue. Réessayez.");
    }
  }

  const inputClass =
    "border-2 border-[#2d3235] px-4 py-3 bg-[#efeadd] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#2d3235] transition-all placeholder:text-[#5a5f63]/60 w-full";

  return (
    <>
      {/* ── HERO ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#1d8f6d] text-white text-xs font-semibold tracking-widest uppercase mb-8">
          Rejoindre
        </div>
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
            Intègre la{" "}
            <span className="italic text-[#1d8f6d]">communauté</span>
          </h1>
          <p className="text-xl text-[#5a5f63] leading-relaxed">
            Kodata: est ouverte à tous les passionnés de la data à Madagascar et dans la diaspora.
            L&apos;adhésion est gratuite.
          </p>
        </div>
      </section>

      {/* ── FORMULAIRE ── */}
      <section className="w-full border-t-2 border-[#2d3235] bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {success ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-[#1d8f6d]" />
              </div>
              <h2 className="text-3xl font-semibold mb-4">Candidature transmise !</h2>
              <p className="text-[#5a5f63] text-lg leading-relaxed max-w-md mx-auto">
                Merci ! L&apos;équipe Kodata: examinera ta candidature et te contactera par email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Identité */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2d3235] mb-4">
                  Identité
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="prenom" className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]">
                      Prénom <span className="text-[#c24b46]">*</span>
                    </label>
                    <input
                      id="prenom"
                      name="prenom"
                      type="text"
                      required
                      value={form.prenom}
                      onChange={handleChange}
                      placeholder="Ton prénom"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="nom" className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]">
                      Nom <span className="text-[#c24b46]">*</span>
                    </label>
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      value={form.nom}
                      onChange={handleChange}
                      placeholder="Ton nom"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2d3235] mb-4">
                  Contact
                </p>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]">
                      Email <span className="text-[#c24b46]">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="toi@exemple.com"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="ville" className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]">
                      Ville
                    </label>
                    <input
                      id="ville"
                      name="ville"
                      type="text"
                      value={form.ville}
                      onChange={handleChange}
                      placeholder="Antananarivo, Paris…"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              {/* Profil */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2d3235] mb-4">
                  Profil
                </p>
                <div className="flex flex-col gap-2 mb-6">
                  <label htmlFor="profession" className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]">
                    Profession / Domaine
                  </label>
                  <input
                    id="profession"
                    name="profession"
                    type="text"
                    value={form.profession}
                    onChange={handleChange}
                    placeholder="Data analyst, étudiant, développeur…"
                    className={inputClass}
                  />
                </div>

                <div className="mb-6">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#2d3235] mb-4">
                    Niveau en data
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {niveaux.map((n) => (
                      <button
                        key={n.value}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, niveau: n.value }))}
                        className={`flex flex-col items-start p-4 border-2 text-left transition-all ${
                          form.niveau === n.value
                            ? "border-[#2d3235] bg-[#2d3235] text-[#efeadd] shadow-[4px_4px_0px_0px_#1d8f6d]"
                            : "border-[#2d3235] hover:bg-[#efeadd]"
                        }`}
                      >
                        <p className="font-semibold text-sm">{n.label}</p>
                        <p className={`text-xs mt-1 ${form.niveau === n.value ? "text-white/70" : "text-[#5a5f63]"}`}>
                          {n.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]">
                    Stacks / Outils
                  </label>
                  <StacksPicker selected={stacks} onChange={setStacks} />
                  <p className="text-xs text-[#5a5f63]">
                    Tape pour chercher, Entrée pour confirmer. Si ton outil n&apos;existe pas, il sera ajouté automatiquement.
                  </p>
                </div>
              </div>

              {/* Photo */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]">
                  Photo de profil
                </label>
                <div className="flex items-center gap-5">
                  {photoPreview ? (
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={photoPreview}
                        alt="Aperçu"
                        fill
                        className="object-cover border-2 border-[#2d3235]"
                      />
                      <button
                        type="button"
                        onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                        className="absolute -top-2 -right-2 bg-[#c24b46] text-white border-2 border-[#2d3235] rounded-full p-0.5"
                        aria-label="Supprimer la photo"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 flex-shrink-0 border-2 border-dashed border-[#2d3235] bg-[#efeadd] flex items-center justify-center text-[#5a5f63]">
                      <Camera className="w-7 h-7" />
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="photo"
                      className="cursor-pointer inline-block border-2 border-[#2d3235] px-4 py-2 text-sm font-semibold hover:bg-[#efeadd] transition-colors"
                    >
                      {photoPreview ? "Changer la photo" : "Choisir une photo"}
                    </label>
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                    <p className="text-xs text-[#5a5f63] mt-1.5">Optionnel · JPG, PNG, WEBP</p>
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div className="flex flex-col gap-2">
                <label htmlFor="motivation" className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]">
                  Motivation
                </label>
                <textarea
                  id="motivation"
                  name="motivation"
                  rows={5}
                  value={form.motivation}
                  onChange={handleChange}
                  placeholder="Pourquoi veux-tu rejoindre Kodata: ? Qu'est-ce que tu souhaites apporter ou apprendre ?"
                  className="border-2 border-[#2d3235] px-4 py-3 bg-[#efeadd] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#2d3235] transition-all resize-none placeholder:text-[#5a5f63]/60"
                />
              </div>

              {error && (
                <p className="text-[#c24b46] font-semibold border-2 border-[#c24b46] px-4 py-3 bg-[#c24b46]/10">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-3 bg-[#1d8f6d] text-white text-lg px-8 py-4 border-2 border-[#2d3235] retro-shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d3235] transition-all font-semibold disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
              >
                {loading ? "Envoi en cours…" : "Je veux devenir membre"}
                {!loading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
