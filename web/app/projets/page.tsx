import { GitBranch, Users, ArrowRight, PlusCircle, ExternalLink } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ProjetsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("projets").select("*").order("ordre");
  const projets = data ?? [];

  const totalContributeurs = projets.reduce((sum, p) => sum + (p.contributeurs ?? 0), 0);
  const termines = projets.filter((p) => p.status === "Terminé").length;

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
          <Link href="/contact"
            className="inline-flex items-center gap-3 bg-[#2d3235] text-[#efeadd] px-6 py-4 border-2 border-[#2d3235] retro-shadow-hover font-semibold flex-shrink-0">
            <PlusCircle className="w-5 h-5" />
            Proposer un projet
          </Link>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="w-full border-y-2 border-[#2d3235] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-3 gap-4 text-center">
          {[
            { val: projets.length, label: "Projets lancés" },
            { val: totalContributeurs, label: "Contributeurs" },
            { val: termines, label: "Projets terminés" },
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
        {projets.length === 0 ? (
          <p className="text-[#5a5f63] text-center py-16">Aucun projet pour le moment.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projets.map((p) => (
              <div key={p.id} className="bg-white border-2 border-[#2d3235] retro-shadow flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
                <div className="p-6 border-b-2 border-[#2d3235] flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 border border-current mb-3 ${p.status_color}`}>
                      {p.status}
                    </span>
                    <h3 className="text-xl font-semibold leading-snug">{p.titre}</h3>
                  </div>
                  <GitBranch className="w-5 h-5 text-[#5a5f63] flex-shrink-0 mt-1" />
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <p className="text-[#5a5f63] leading-relaxed text-sm flex-1">{p.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {(p.tags ?? []).map((tag: string) => (
                      <span key={tag} className="text-xs bg-[#efeadd] border border-[#2d3235] px-2 py-0.5 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-[#5a5f63]">
                      <Users className="w-4 h-4" />
                      <span>{p.contributeurs} contributeurs</span>
                    </div>
                    {p.ouvert ? (
                      <Link href="/contact" className="text-sm font-semibold text-[#1d8f6d] flex items-center gap-1 hover:gap-2 transition-all">
                        Rejoindre <ArrowRight className="w-3 h-3" />
                      </Link>
                    ) : (
                      <Link href="/contact" className="text-sm font-semibold text-[#5a5f63] flex items-center gap-1">
                        Voir le rapport <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-[#2d3235] text-[#efeadd] py-16 border-y-2 border-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Vous avez une idée de projet ?</h2>
          <p className="text-lg text-white/70 mb-8 leading-relaxed">
            Les projets Kodata: sont ouverts à tous les membres. Proposez votre initiative
            et trouvez des collaborateurs au sein de la communauté.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-3 border-2 border-[#efeadd] px-8 py-4 font-semibold hover:bg-[#efeadd] hover:text-[#2d3235] transition-colors text-lg">
            Soumettre un projet <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
