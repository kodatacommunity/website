import { ArrowRight, Building2, GraduationCap, Laptop, Network } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const partenaires = [
  {
    nom: "RLC Madagascar Chapter",
    type: "Fondateur",
    typeColor: "bg-[#c24b46] text-white",
    desc: "Réseau de leaders à l'initiative de Kodata:. Partenaire fondateur et soutien stratégique de la communauté.",
    logo: "/logo_rlc2.svg",
    logoBg: "bg-transparent",
    initiales: "RLC",
    color: "bg-[#c24b46]",
  },
  {
    nom: "École 42",
    type: "Technique",
    typeColor: "bg-[#1d8f6d] text-white",
    desc: "École de coding partenaire, hébergeant les événements Kodata: et fournissant un cadre technique d'excellence.",
    logo: "/logo_42.svg",
    logoBg: "bg-transparent",
    initiales: "42",
    color: "bg-[#1d8f6d]",
  },
  {
    nom: "Dabilio",
    type: "Technique",
    typeColor: "bg-[#1d8f6d] text-white",
    desc: "Partenaire technique soutenant Kodata: avec ses outils et son expertise au service de la communauté data.",
    logo: "/logo_dabilio2.svg",
    logoBg: "bg-transparent",
    initiales: "DA",
    color: "bg-[#1d8f6d]",
  },
  {
    nom: "Databridge Madagascar",
    type: "Technique",
    typeColor: "bg-[#1d8f6d] text-white",
    desc: "Partenaire technique soutenant Kodata: avec ses outils et son expertise au service de la communauté data.",
    logo: "/logo_databridge.svg",
    logoBg: "bg-transparent",
    initiales: "DB",
    color: "bg-[#1d8f6d]",
  },
  {
    nom: "Partenaire Institutionnel",
    type: "Institutionnel",
    typeColor: "bg-[#d67035] text-white",
    desc: "Organisations gouvernementales et institutions publiques soutenant la culture data à Madagascar.",
    logo: null,
    logoBg: null,
    initiales: "PI",
    color: "bg-[#d67035]",
  },
  {
    nom: "Université Partenaire",
    type: "Académique",
    typeColor: "bg-[#e8b056] text-[#2d3235]",
    desc: "Établissements d'enseignement supérieur et de recherche collaborant avec la communauté Kodata:.",
    logo: null,
    logoBg: null,
    initiales: "UP",
    color: "bg-[#e8b056]",
  },
];

const typesPartenariat = [
  {
    icon: <Building2 className="w-7 h-7" />,
    color: "bg-[#c24b46]",
    title: "Institutionnel",
    desc: "Organismes publics, ministères, agences de développement.",
    avantages: ["Co-organisation d'événements", "Accès aux données publiques", "Visibilité dans la communauté"],
  },
  {
    icon: <GraduationCap className="w-7 h-7" />,
    color: "bg-[#d67035]",
    title: "Académique",
    desc: "Universités, grandes écoles, centres de recherche.",
    avantages: ["Projets de recherche communs", "Accès aux talents", "Publications et rapports"],
  },
  {
    icon: <Laptop className="w-7 h-7" />,
    color: "bg-[#e8b056]",
    iconClass: "text-[#2d3235]",
    title: "Technique",
    desc: "Startups, entreprises tech, éditeurs de logiciels.",
    avantages: ["Accès aux outils et licences", "Ateliers techniques", "Recrutement de talents"],
  },
  {
    icon: <Network className="w-7 h-7" />,
    color: "bg-[#1d8f6d]",
    title: "Communauté",
    desc: "Associations, ONG, réseaux de professionnels.",
    avantages: ["Co-organisation d'événements", "Échanges de bonnes pratiques", "Réseautage"],
  },
];

export default function PartenairesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#e8b056] text-[#2d3235] text-xs font-semibold tracking-widest uppercase mb-8">
          Partenaires
        </div>
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
            Ils soutiennent <span className="italic text-[#1d8f6d]">Kodata:</span>
          </h1>
          <p className="text-xl text-[#5a5f63] leading-relaxed">
            Institutions, universités, entreprises tech et associations — nos partenaires croient
            au pouvoir de la data pour développer Madagascar.
          </p>
        </div>
      </section>

      {/* ── GRILLE PARTENAIRES ── */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partenaires.map((p) => (
            <div
              key={p.nom}
              className="bg-white border-2 border-[#2d3235] retro-shadow flex flex-col hover:translate-y-[-4px] transition-transform duration-300"
            >
              {/* Logo */}
              <div className={`${p.color} h-36 flex items-center justify-center border-b-2 border-[#2d3235]`}>
                {p.logo ? (
                  <div className={`${p.logoBg} p-4 flex items-center justify-center`}>
                    <Image src={p.logo} alt={p.nom} width={p.nom === "École 42" || p.nom === "Databridge Madagascar" || p.nom === "Dabilio" || p.nom === "RLC Madagascar Chapter" ? 200 : 100} height={p.nom === "École 42" || p.nom === "Databridge Madagascar" || p.nom === "Dabilio" || p.nom === "RLC Madagascar Chapter" ? 120 : 60} className="object-contain" />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-white/20 border-2 border-white flex items-center justify-center text-2xl font-bold text-white font-mono">
                    {p.initiales}
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1 gap-3">
                <span className={`inline-block text-xs font-semibold px-2 py-0.5 w-fit ${p.typeColor}`}>
                  {p.type}
                </span>
                <h3 className="text-lg font-semibold">{p.nom}</h3>
                <p className="text-[#5a5f63] text-sm leading-relaxed flex-1">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION DEVENIR PARTENAIRE ── */}
      <section className="w-full bg-[#2d3235] text-[#efeadd] py-24 border-y-2 border-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block border-2 border-[#e8b056] px-3 py-1 text-[#e8b056] text-xs font-semibold tracking-widest uppercase mb-6">
              Partenariat
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
              Devenez partenaire de Kodata:
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Rejoignez un écosystème en pleine croissance et contribuez à la transformation
              de la culture data à Madagascar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {typesPartenariat.map((t) => (
              <div key={t.title} className="bg-white/5 border-2 border-white/20 p-6 hover:bg-white/10 transition-colors">
                <div className={`p-3 ${t.color} ${t.iconClass ?? "text-white"} border-2 border-[#efeadd] shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] w-fit mb-5`}>
                  {t.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{t.title}</h3>
                <p className="text-white/60 text-sm mb-4">{t.desc}</p>
                <ul className="space-y-1">
                  {t.avantages.map((a) => (
                    <li key={a} className="text-sm text-white/50 flex items-start gap-2">
                      <span className="text-[#e8b056] mt-0.5">›</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#e8b056] text-[#2d3235] px-10 py-4 border-2 border-[#efeadd] font-bold hover:bg-[#efeadd] transition-colors text-lg"
            >
              Proposer un partenariat <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
