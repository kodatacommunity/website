"use client";

import { useState, useMemo } from "react";
import { Linkedin, Facebook, Filter, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Membre = {
  id: string;
  nom: string;
  prenom: string;
  initiales: string;
  photo_url: string | null;
  color: string;
  langages: string[];
  linkedin: string | null;
  facebook: string | null;
};

const PAR_PAGE = 12;
const LIEN_REJOINDRE = "https://tally.so/r/7RW189";

const langageColors: Record<string, string> = {
  Python: "bg-[#1d8f6d]/10 border-[#1d8f6d]/40 text-[#1d8f6d]",
  SQL: "bg-[#2d3235]/10 border-[#2d3235]/40 text-[#2d3235]",
  R: "bg-[#c24b46]/10 border-[#c24b46]/40 text-[#c24b46]",
  Tableau: "bg-[#e8b056]/10 border-[#e8b056]/40 text-[#2d3235]",
  "Power BI": "bg-[#d67035]/10 border-[#d67035]/40 text-[#d67035]",
  Excel: "bg-[#1d8f6d]/10 border-[#1d8f6d]/40 text-[#1d8f6d]",
  "Machine Learning": "bg-[#c24b46]/10 border-[#c24b46]/40 text-[#c24b46]",
  "Data Engineering": "bg-[#2d3235]/10 border-[#2d3235]/40 text-[#2d3235]",
  JavaScript: "bg-[#e8b056]/10 border-[#e8b056]/40 text-[#2d3235]",
  DataViz: "bg-[#d67035]/10 border-[#d67035]/40 text-[#d67035]",
  NLP: "bg-[#1d8f6d]/10 border-[#1d8f6d]/40 text-[#1d8f6d]",
  Scala: "bg-[#c24b46]/10 border-[#c24b46]/40 text-[#c24b46]",
  Spark: "bg-[#d67035]/10 border-[#d67035]/40 text-[#d67035]",
  Statistics: "bg-[#2d3235]/10 border-[#2d3235]/40 text-[#2d3235]",
};

function getBadgeClass(lang: string) {
  return langageColors[lang] ?? "bg-gray-100 border-gray-300 text-gray-600";
}

export default function AnnuaireClient({ membres }: { membres: Membre[] }) {
  const [filtres, setFiltres] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const tousLesTags = useMemo(() => {
    const tags = new Set<string>();
    membres.forEach((m) => m.langages.forEach((l) => tags.add(l)));
    return Array.from(tags).sort();
  }, [membres]);

  const membresFiltres = useMemo(() => {
    if (filtres.length === 0) return membres;
    return membres.filter((m) => filtres.every((f) => m.langages.includes(f)));
  }, [filtres, membres]);

  const totalPages = Math.ceil(membresFiltres.length / PAR_PAGE);
  const membresPage = membresFiltres.slice((page - 1) * PAR_PAGE, page * PAR_PAGE);

  function toggleFiltre(tag: string) {
    setFiltres((prev) => prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]);
    setPage(1);
  }

  return (
    <>
      {/* HERO */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#1d8f6d] text-white text-xs font-semibold tracking-widest uppercase mb-8">
          Communauté
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              L&apos;annuaire <span className="italic text-[#1d8f6d]">Kodata:</span>
            </h1>
            <p className="text-xl text-[#5a5f63] leading-relaxed">
              Découvrez les membres de la communauté, leurs compétences et connectez-vous avec eux.
            </p>
          </div>
          <Link href={LIEN_REJOINDRE} target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 bg-[#1d8f6d] text-white px-6 py-4 border-2 border-[#2d3235] retro-shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d3235] transition-all font-semibold">
            Rejoindre la communauté
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-4">
        <div className="flex justify-center gap-16 border-2 border-[#2d3235] py-6 bg-white retro-shadow">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#2d3235]">{membres.length}</div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mt-1">Membres</div>
          </div>
          <div className="w-px bg-[#2d3235]" />
          <div className="text-center">
            <div className="text-4xl font-bold text-[#2d3235]">{tousLesTags.length}</div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mt-1">Compétences</div>
          </div>
        </div>
      </section>

      {/* FILTRES */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-16 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-4 h-4 text-[#5a5f63]" />
          <span className="text-sm font-semibold uppercase tracking-widest text-[#5a5f63]">Filtrer par compétence</span>
          {filtres.length > 0 && (
            <button onClick={() => { setFiltres([]); setPage(1); }}
              className="ml-auto flex items-center gap-1 text-xs text-[#c24b46] border border-[#c24b46] px-2 py-1 hover:bg-[#c24b46] hover:text-white transition-colors">
              <X className="w-3 h-3" /> Réinitialiser
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {tousLesTags.map((tag) => (
            <button key={tag} onClick={() => toggleFiltre(tag)}
              className={`px-3 py-1.5 text-sm font-medium border-2 transition-colors ${filtres.includes(tag) ? "bg-[#2d3235] text-[#efeadd] border-[#2d3235]" : "bg-white text-[#2d3235] border-[#2d3235] hover:bg-[#efeadd]"}`}>
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* RÉSULTATS */}
      <section className="w-full max-w-7xl mx-auto px-6 py-6">
        <p className="text-sm text-[#5a5f63] mb-8">
          {membresFiltres.length} membre{membresFiltres.length > 1 ? "s" : ""} trouvé{membresFiltres.length > 1 ? "s" : ""}
        </p>

        {membresPage.length === 0 ? (
          <div className="text-center py-24 text-[#5a5f63]">
            Aucun membre ne correspond aux filtres sélectionnés.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {membresPage.map((m) => (
              <div key={m.id} className="bg-white border-2 border-[#2d3235] retro-shadow flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
                <div className={`${m.color} h-32 flex items-center justify-center border-b-2 border-[#2d3235]`}>
                  {m.photo_url ? (
                    <Image src={m.photo_url} alt={`${m.prenom} ${m.nom}`} width={80} height={80} className="w-20 h-20 rounded-full object-cover border-2 border-white" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-2xl font-bold text-white">
                      {m.initiales}
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-1 gap-3">
                  <h3 className="font-semibold text-[#2d3235] leading-snug">{m.prenom} {m.nom}</h3>
                  <div className="flex flex-wrap gap-1 flex-1">
                    {m.langages.map((lang) => (
                      <span key={lang} className={`text-xs px-2 py-0.5 border font-medium ${getBadgeClass(lang)}`}>
                        {lang}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-gray-100">
                    {m.linkedin ? (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="p-2 border-2 border-gray-200 text-gray-300"><Linkedin className="w-4 h-4" /></span>
                    )}
                    {m.facebook ? (
                      <a href={m.facebook} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="Facebook">
                        <Facebook className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="p-2 border-2 border-gray-200 text-gray-300"><Facebook className="w-4 h-4" /></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-14">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
              className="px-4 py-2 border-2 border-[#2d3235] font-semibold disabled:opacity-30 hover:bg-[#efeadd] transition-colors">
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-10 h-10 border-2 border-[#2d3235] font-semibold transition-colors ${p === page ? "bg-[#2d3235] text-[#efeadd]" : "bg-white hover:bg-[#efeadd]"}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="px-4 py-2 border-2 border-[#2d3235] font-semibold disabled:opacity-30 hover:bg-[#efeadd] transition-colors">
              →
            </button>
          </div>
        )}
      </section>
    </>
  );
}
