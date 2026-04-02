"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CheckCircle, XCircle, Clock } from "lucide-react";

type Candidature = {
  id: string;
  created_at: string;
  prenom: string;
  nom: string;
  email: string;
  ville: string | null;
  profession: string | null;
  niveau: string | null;
  motivation: string | null;
  stacks: string[];
  photo_url: string | null;
  statut: string;
};

const STATUT_LABEL: Record<string, { label: string; color: string }> = {
  en_attente: { label: "En attente", color: "bg-[#e8b056] text-[#2d3235]" },
  acceptee: { label: "Acceptée", color: "bg-[#1d8f6d] text-white" },
  refusee: { label: "Refusée", color: "bg-[#c24b46] text-white" },
};

const NIVEAU_LABEL: Record<string, string> = {
  debutant: "Débutant",
  intermediaire: "Intermédiaire",
  avance: "Avancé",
};

export default function CandidaturesAdminPage() {
  const [items, setItems] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [filtre, setFiltre] = useState<"tous" | "en_attente" | "acceptee" | "refusee">("en_attente");

  async function fetchItems() {
    setLoading(true);
    const res = await fetch("/api/admin/candidatures");
    const json = await res.json();
    setItems(json.data || []);
    setLoading(false);
  }

  useEffect(() => { fetchItems(); }, []);

  async function handleAction(id: string, action: "accepter" | "refuser") {
    const label = action === "accepter" ? "Accepter ce membre ?" : "Refuser cette candidature ?";
    if (!confirm(label)) return;
    setProcessing(id);
    await fetch(`/api/admin/candidatures/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setProcessing(null);
    fetchItems();
  }

  const filtered = filtre === "tous" ? items : items.filter((c) => c.statut === filtre);

  const counts = {
    tous: items.length,
    en_attente: items.filter((c) => c.statut === "en_attente").length,
    acceptee: items.filter((c) => c.statut === "acceptee").length,
    refusee: items.filter((c) => c.statut === "refusee").length,
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#2d3235] uppercase">Candidatures</h1>
          <p className="text-[#5a5f63] text-sm mt-1">{counts.en_attente} en attente de traitement</p>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["en_attente", "acceptee", "refusee", "tous"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`px-4 py-2 text-xs font-black uppercase border-2 border-[#2d3235] transition-all ${
              filtre === f
                ? "bg-[#2d3235] text-[#efeadd]"
                : "bg-white text-[#2d3235] hover:bg-[#efeadd]"
            }`}
          >
            {f === "tous" ? "Tous" : STATUT_LABEL[f].label} ({counts[f]})
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-[#5a5f63]">Chargement…</p>
      ) : filtered.length === 0 ? (
        <p className="text-[#5a5f63]">Aucune candidature.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((c) => {
            const statut = STATUT_LABEL[c.statut] ?? STATUT_LABEL.en_attente;
            const isPending = c.statut === "en_attente";
            return (
              <div
                key={c.id}
                className="border-2 border-[#2d3235] bg-white shadow-[4px_4px_0px_#2d3235] p-5"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    {c.photo_url ? (
                      <Image
                        src={c.photo_url}
                        alt={`${c.prenom} ${c.nom}`}
                        width={72}
                        height={72}
                        className="w-18 h-18 object-cover border-2 border-[#2d3235]"
                        style={{ width: 72, height: 72 }}
                      />
                    ) : (
                      <div className="w-[72px] h-[72px] bg-[#efeadd] border-2 border-[#2d3235] flex items-center justify-center text-xl font-black text-[#2d3235]">
                        {(c.prenom?.[0] ?? "") + (c.nom?.[0] ?? "")}
                      </div>
                    )}
                  </div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="font-black text-[#2d3235] text-lg">
                        {c.prenom} {c.nom}
                      </h2>
                      <span className={`text-xs font-black uppercase px-2 py-0.5 ${statut.color}`}>
                        {statut.label}
                      </span>
                      {c.niveau && (
                        <span className="text-xs font-bold uppercase px-2 py-0.5 border border-[#2d3235] text-[#2d3235]">
                          {NIVEAU_LABEL[c.niveau] ?? c.niveau}
                        </span>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-[#5a5f63] mb-3">
                      <span>
                        <span className="font-bold text-[#2d3235]">Email :</span>{" "}
                        <a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a>
                      </span>
                      {c.ville && (
                        <span>
                          <span className="font-bold text-[#2d3235]">Ville :</span> {c.ville}
                        </span>
                      )}
                      {c.profession && (
                        <span>
                          <span className="font-bold text-[#2d3235]">Profession :</span> {c.profession}
                        </span>
                      )}
                      <span>
                        <span className="font-bold text-[#2d3235]">Date :</span>{" "}
                        {new Date(c.created_at).toLocaleDateString("fr-FR")}
                      </span>
                    </div>

                    {c.stacks && c.stacks.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {c.stacks.map((s) => (
                          <span
                            key={s}
                            className="text-xs font-semibold px-2 py-0.5 bg-[#2d3235]/10 border border-[#2d3235]/30 text-[#2d3235]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {c.motivation && (
                      <p className="text-sm text-[#5a5f63] leading-relaxed border-l-2 border-[#e8b056] pl-3 italic">
                        {c.motivation}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2 flex-shrink-0">
                    {isPending ? (
                      <>
                        <button
                          onClick={() => handleAction(c.id, "accepter")}
                          disabled={processing === c.id}
                          className="flex items-center gap-2 bg-[#1d8f6d] text-white text-xs font-black uppercase px-4 py-2 border-2 border-[#2d3235] shadow-[3px_3px_0px_#2d3235] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Accepter
                        </button>
                        <button
                          onClick={() => handleAction(c.id, "refuser")}
                          disabled={processing === c.id}
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
    </div>
  );
}
