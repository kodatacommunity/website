import { GitBranch, Users, ArrowRight, PlusCircle, ExternalLink } from "lucide-react";
import Link from "next/link";

const projets = [
  {
    status: "En cours",
    statusColor: "bg-[#1d8f6d] text-white",
    title: "Open Data Madagascar",
    desc: "Collecte et visualisation de données ouvertes sur le développement humain à Madagascar — santé, éducation, économie.",
    tags: ["#open-data", "#dataviz", "#impact"],
    contributeurs: 8,
    ouvert: true,
  },
  {
    status: "Recherche contributeurs",
    statusColor: "bg-[#e8b056] text-[#2d3235]",
    title: "Dashboard Agri-Data",
    desc: "Tableau de bord analytique pour les acteurs du secteur agricole malgache, basé sur des données satellitaires et terrain.",
    tags: ["#agriculture", "#GIS", "#analytics"],
    contributeurs: 3,
    ouvert: true,
  },
  {
    status: "En cours",
    statusColor: "bg-[#1d8f6d] text-white",
    title: "NLP Malgache",
    desc: "Construction d'un corpus NLP en langue malgache pour des applications d'IA adaptées aux réalités locales.",
    tags: ["#NLP", "#ML", "#malgache"],
    contributeurs: 5,
    ouvert: true,
  },
  {
    status: "Terminé",
    statusColor: "bg-[#5a5f63] text-white",
    title: "Cartographie des compétences data",
    desc: "Première cartographie des profils et compétences data à Madagascar — 150 répondants, rapport publié.",
    tags: ["#cartographie", "#RH", "#rapport"],
    contributeurs: 6,
    ouvert: false,
  },
  {
    status: "Recherche contributeurs",
    statusColor: "bg-[#e8b056] text-[#2d3235]",
    title: "Data Pipeline Éducation",
    desc: "Mise en place d'un pipeline de données pour le suivi des indicateurs éducatifs dans les régions rurales.",
    tags: ["#éducation", "#ETL", "#impact"],
    contributeurs: 2,
    ouvert: true,
  },
  {
    status: "Terminé",
    statusColor: "bg-[#5a5f63] text-white",
    title: "Rapport Data Economy MG 2023",
    desc: "Analyse de l'écosystème data et tech à Madagascar — état des lieux, opportunités, recommandations.",
    tags: ["#rapport", "#économie", "#tech"],
    contributeurs: 4,
    ouvert: false,
  },
];

export default function ProjetsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#e8b056] text-[#2d3235] text-xs font-semibold tracking-widest uppercase mb-8">
              Projets collaboratifs
            </div>
            <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              Des initiatives <span className="italic text-[#1d8f6d]">concrètes</span>
            </h1>
            <p className="text-xl text-[#5a5f63] leading-relaxed max-w-xl">
              Des projets data portés par la communauté, pour un impact réel sur le développement de Madagascar.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#2d3235] text-[#efeadd] px-6 py-4 border-2 border-[#2d3235] retro-shadow-hover font-semibold flex-shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
            Proposer un projet
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="w-full border-y-2 border-[#2d3235] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { val: "6", label: "Projets lancés" },
            { val: "28", label: "Contributeurs" },
            { val: "3", label: "Rapports publiés" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold text-[#1d8f6d]">{s.val}</div>
              <div className="text-sm text-[#5a5f63] uppercase tracking-wide mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── GRILLE PROJETS ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projets.map((p) => (
            <div
              key={p.title}
              className="bg-white border-2 border-[#2d3235] retro-shadow flex flex-col hover:translate-y-[-4px] transition-transform duration-300"
            >
              {/* Header */}
              <div className="p-6 border-b-2 border-[#2d3235] flex items-start justify-between gap-4">
                <div>
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 border border-current mb-3 ${p.statusColor}`}>
                    {p.status}
                  </span>
                  <h3 className="text-xl font-semibold leading-snug">{p.title}</h3>
                </div>
                <GitBranch className="w-5 h-5 text-[#5a5f63] flex-shrink-0 mt-1" />
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1 gap-4">
                <p className="text-[#5a5f63] leading-relaxed text-sm flex-1">{p.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-[#efeadd] border border-[#2d3235] px-2 py-0.5 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-[#5a5f63]">
                    <Users className="w-4 h-4" />
                    <span>{p.contributeurs} contributeurs</span>
                  </div>
                  {p.ouvert ? (
                    <Link
                      href="/contact"
                      className="text-sm font-semibold text-[#1d8f6d] flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Rejoindre <ArrowRight className="w-3 h-3" />
                    </Link>
                  ) : (
                    <Link
                      href="/contact"
                      className="text-sm font-semibold text-[#5a5f63] flex items-center gap-1"
                    >
                      Voir le rapport <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-[#2d3235] text-[#efeadd] py-16 border-y-2 border-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Vous avez une idée de projet ?</h2>
          <p className="text-lg text-white/70 mb-8 leading-relaxed">
            Les projets Kodata: sont ouverts à tous les membres. Proposez votre initiative
            et trouvez des collaborateurs au sein de la communauté.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 border-2 border-[#efeadd] px-8 py-4 font-semibold hover:bg-[#efeadd] hover:text-[#2d3235] transition-colors text-lg"
          >
            Soumettre un projet <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
