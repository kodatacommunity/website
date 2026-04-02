import { Target, Eye, Heart, Zap, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const valeurs = [
  { icon: <Heart className="w-6 h-6" />, color: "bg-[#c24b46]", title: "Ouverture", desc: "Nous accueillons tous les profils, niveaux et secteurs. La data est pour tout le monde." },
  { icon: <Users className="w-6 h-6" />, color: "bg-[#d67035]", title: "Collaboration", desc: "Ensemble, nous allons plus loin. La force de Kodata: vient de la diversité de ses membres." },
  { icon: <Zap className="w-6 h-6" />, color: "bg-[#e8b056]", iconClass: "text-[#2d3235]", title: "Excellence", desc: "Nous visons un haut niveau de qualité dans nos échanges, nos projets et nos événements." },
  { icon: <Target className="w-6 h-6" />, color: "bg-[#1d8f6d]", title: "Impact", desc: "Chaque action vise un bénéfice concret pour nos membres et pour Madagascar." },
];

export default function AProposPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#e8b056] text-[#2d3235] text-xs font-semibold tracking-widest uppercase mb-8">
          À propos
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              Qui sommes-<span className="italic text-[#1d8f6d]">nous ?</span>
            </h1>
            <p className="text-xl text-[#5a5f63] leading-relaxed">
              Kodata: est une communauté de passionnés de la data, créée pour connecter, former
              et faire grandir celles et ceux qui croient au pouvoir des données pour transformer Madagascar.
            </p>
          </div>
          <div className="bg-white border-2 border-[#2d3235] p-8 retro-shadow">
            <blockquote className="text-xl italic text-[#2d3235] leading-relaxed border-l-4 border-[#1d8f6d] pl-6">
              &ldquo;La donnée est le nouveau levier du développement. Kodata: est né de la conviction
              que Madagascar peut en être un acteur majeur.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm text-[#5a5f63] font-semibold">— Les fondateurs de Kodata:</p>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <div className="w-full border-y-2 border-[#2d3235] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
          <div className="flex gap-6">
            <div className="flex-shrink-0 p-3 bg-[#c24b46] text-white border-2 border-[#2d3235] h-fit shadow-[4px_4px_0px_0px_#2d3235]">
              <Target className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">Notre mission</h2>
              <p className="text-[#5a5f63] leading-relaxed text-lg">
                Créer un espace inclusif où les passionnés de la data à Madagascar peuvent apprendre, partager et collaborer — quel que soit leur niveau ou leur secteur.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 p-3 bg-[#1d8f6d] text-white border-2 border-[#2d3235] h-fit shadow-[4px_4px_0px_0px_#2d3235]">
              <Eye className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-3">Notre vision</h2>
              <p className="text-[#5a5f63] leading-relaxed text-lg">
                Faire de Madagascar un acteur de l&apos;économie de la donnée en Afrique, en bâtissant
                une communauté forte, engagée et reconnue à l&apos;échelle du continent.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── VALEURS ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-semibold tracking-tight mb-4">Nos valeurs</h2>
        <p className="text-xl text-[#5a5f63] mb-14 max-w-2xl leading-relaxed">
          Ces valeurs guident chacune de nos actions, de nos événements et de nos projets.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valeurs.map((v) => (
            <div key={v.title} className="bg-white border-2 border-[#2d3235] p-7 retro-shadow flex flex-col gap-4 hover:translate-y-[-4px] transition-transform duration-300">
              <div className={`p-3 ${v.color} ${v.iconClass ?? "text-white"} border-2 border-[#2d3235] shadow-[4px_4px_0px_0px_#2d3235] w-fit`}>
                {v.icon}
              </div>
              <h3 className="text-xl font-semibold">{v.title}</h3>
              <p className="text-[#5a5f63] leading-relaxed text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ORIGINE RLC (section sombre) ── */}
      <section className="w-full bg-[#2d3235] text-[#efeadd] py-24 border-y-2 border-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block border-2 border-[#e8b056] px-3 py-1 text-[#e8b056] text-xs font-semibold tracking-widest uppercase mb-6">
              Notre origine
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Le RLC Madagascar Chapter
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              Le <span className="text-[#e8b056] font-semibold">RLC (Regional Leadership Center) Madagascar Chapter</span> est
              un réseau regroupant les alumni des Centres régionaux de Leadership d&apos;Afrique du Sud et du Sénégal,
              engagés dans leurs communautés respectives et dans le développement de Madagascar.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              C&apos;est au sein de ce réseau qu&apos;est née l&apos;idée de Kodata: — avec la conviction
              que la maîtrise de la donnée est un levier stratégique pour le développement du pays.
            </p>
            <Link
              href="/board"
              className="inline-flex items-center gap-2 border-2 border-[#efeadd] px-6 py-3 font-semibold hover:bg-[#efeadd] hover:text-[#2d3235] transition-colors"
            >
              Rencontrer le Board <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Timeline */}
          <div className="space-y-0">
            {[
              { year: "2025", color: "bg-[#c24b46]", label: "Idée", desc: "L'idée germe parmi certains alumni du réseau." },
              { year: "2026", color: "bg-[#d67035]", label: "Lancement", desc: "Kodata: est officiellement lancée avec sa première activité." },
            ].map((item, i) => (
              <div key={item.year} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full ${item.color} border-2 border-[#efeadd] flex-shrink-0 mt-1`} />
                  {i < 1 && <div className="w-0.5 bg-white/20 flex-1 my-1" />}
                </div>
                <div className="pb-8">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 ${item.color} text-[#efeadd] border border-white/20`}>{item.year}</span>
                    <span className="font-semibold text-[#efeadd]">{item.label}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-semibold tracking-tight mb-4">Rejoignez l&apos;aventure</h2>
        <p className="text-xl text-[#5a5f63] mb-10">Faites partie de la communauté qui construit la culture data à Madagascar.</p>
        <Link
          href="/rejoindre"
          className="inline-flex items-center gap-3 bg-[#1d8f6d] text-white text-xl px-10 py-4 border-2 border-[#2d3235] retro-shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d3235] transition-all font-semibold"
        >
          Rejoindre Kodata: <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </>
  );
}
