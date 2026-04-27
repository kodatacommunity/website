"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";

type Candidature = {
  id: string;
  created_at: string;
  prenom: string;
  nom: string;
  email: string;
  sujet_propose: string;
  bio_courte: string;
  statut: "en_attente" | "accepte" | "refuse";
};

type Appel = {
  id: string;
  titre: string;
  statut: string;
  date_workshop: string | null;
};

const STATUT_LABEL: Record<string, { label: string; color: string }> = {
  en_attente: { label: "En attente", color: "bg-[#e8b056] text-[#2d3235]" },
  accepte: { label: "Accepté", color: "bg-[#1d8f6d] text-white" },
  refuse: { label: "Refusé", color: "bg-[#c24b46] text-white" },
};

export default function DataskillsCandidaturesPage() {
  const { id } = useParams<{ id: string }>();
  const [appel, setAppel] = useState<Appel | null>(null);
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [filtre, setFiltre] = useState<"tous" | "en_attente" | "accepte" | "refuse">("en_attente");

  async function fetchData() {
    setLoading(true);
    const [appelRes, candidaturesRes] = await Promise.all([
      fetch("/api/admin/dataskills"),
      fetch(`/api/admin/dataskills/${id}/candidatures`),
    ]);
    const appelJson = await appelRes.json();
    const candidaturesJson = await candidaturesRes.json();
    const found = (appelJson.data || []).find((a: Appel) => a.id === id) || null;
    setAppel(found);
    setCandidatures(candidaturesJson.data || []);
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, [id]);

  async function handleAction(candidatureId: string, action: "accepter" | "refuser") {
    const label = action === "accepter" ? "Accepter cette candidature ?" : "Refuser cette candidature ?";
    if (!confirm(label)) return;
    setProcessing(candidatureId);
    await fetch(`/api/admin/dataskills/candidatures/${candidatureId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    setProcessing(null);
    fetchData();
  }

  const filtered = filtre === "tous" ? candidatures : candidatures.filter((c) => c.statut === filtre);
  const counts = {
    tous: candidatures.length,
    en_attente: candidatures.filter((c) => c.statut === "en_attente").length,
    accepte: candidatures.filter((c) => c.statut === "accepte").length,
    refuse: candidatures.filter((c) => c.statut === "refuse").length,
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Link
        href="/admin/dataskills"
        className="inline-flex items-center gap-2 text-sm text-[#5a5f63] hover:text-[#2d3235] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux appels
      </Link>

      {appel && (
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h1 className="text-2xl font-black text-[#2d3235] uppercase">{appel.titre}</h1>
            <span className={`text-xs font-black uppercase px-2 py-0.5 ${appel.statut === "ouvert" ? "bg-[#1d8f6d] text-white" : "bg-[#5a5f63] text-white"}`}>
              {appel.statut === "ouvert" ? "Ouvert" : "Fermé"}
            </span>
          </div>
          <p className="text-[#5a5f63] text-sm">
            {counts.en_attente} candidature{counts.en_attente !== 1 ? "s" : ""} en attente
            {appel.date_workshop && ` · Session prévue le ${new Date(appel.date_workshop).toLocaleDateString("fr-FR")}`}
          </p>
        </div>
      )}

      {/* Filtres */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["en_attente", "accepte", "refuse", "tous"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFiltre(f)}
            className={`px-4 py-2 text-xs font-black uppercase border-2 border-[#2d3235] transition-all ${
              filtre === f ? "bg-[#2d3235] text-[#efeadd]" : "bg-white text-[#2d3235] hover:bg-[#efeadd]"
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
              <div key={c.id} className="border-2 border-[#2d3235] bg-white shadow-[4px_4px_0px_#2d3235] p-5">
                <div className="flex flex-col md:flex-row md:items-start gap-5">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h2 className="font-black text-[#2d3235] text-lg">
                        {c.prenom} {c.nom}
                      </h2>
                      <span className={`text-xs font-black uppercase px-2 py-0.5 ${statut.color}`}>
                        {statut.label}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-[#5a5f63] mb-3">
                      <span>
                        <span className="font-bold text-[#2d3235]">Email :</span>{" "}
                        <a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a>
                      </span>
                      <span>
                        <span className="font-bold text-[#2d3235]">Date :</span>{" "}
                        {new Date(c.created_at).toLocaleDateString("fr-FR")}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#2d3235] mb-1">Sujet proposé</p>
                      <p className="text-sm font-semibold text-[#2d3235] border-l-2 border-[#e8b056] pl-3">{c.sujet_propose}</p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#2d3235] mb-1">Présentation</p>
                      <p className="text-sm text-[#5a5f63] leading-relaxed border-l-2 border-[#2d3235]/20 pl-3">{c.bio_courte}</p>
                    </div>
                  </div>

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
