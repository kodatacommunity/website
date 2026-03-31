import { Linkedin, Twitter, Mail, FlaskConical, Handshake, Megaphone, Truck } from "lucide-react";
import Link from "next/link";

const executif = [
  {
    name: "Prénom Nom",
    role: "Président",
    job: "Data Engineer · [Entreprise]",
    bio: "Passionné de data engineering et de cloud, il porte la vision stratégique de Kodata: avec le souci constant de l'impact sur Madagascar.",
    initials: "PN",
    color: "bg-[#c24b46]",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Prénom Nom",
    role: "Vice-Présidente",
    job: "Data Analyst · [Entreprise]",
    bio: "Spécialiste de la visualisation et de la data storytelling, elle coordonne les événements et les partenariats de la communauté.",
    initials: "PN",
    color: "bg-[#d67035]",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Prénom Nom",
    role: "Secrétaire Général",
    job: "Data Scientist · [Entreprise]",
    bio: "Expert en machine learning appliqué aux problématiques africaines, il anime les projets collaboratifs de la communauté.",
    initials: "PN",
    color: "bg-[#e8b056]",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Prénom Nom",
    role: "Trésorière",
    job: "BI Developer · [Entreprise]",
    bio: "Développeuse BI et passionnée d'open data, elle gère les ressources et développe les partenariats institutionnels.",
    initials: "PN",
    color: "bg-[#1d8f6d]",
    linkedin: "#",
    twitter: "#",
  },
];

const scientifique = [
  {
    name: "Prénom Nom",
    expertise: "Data Engineering",
    job: "Senior Data Engineer · [Entreprise]",
    initials: "PN",
    linkedin: "#",
  },
  {
    name: "Prénom Nom",
    expertise: "Machine Learning",
    job: "ML Engineer · [Entreprise]",
    initials: "PN",
    linkedin: "#",
  },
  {
    name: "Prénom Nom",
    expertise: "Data Analytics",
    job: "Data Analyst · [Entreprise]",
    initials: "PN",
    linkedin: "#",
  },
  {
    name: "Prénom Nom",
    expertise: "Data Visualisation",
    job: "BI Developer · [Entreprise]",
    initials: "PN",
    linkedin: "#",
  },
  {
    name: "Prénom Nom",
    expertise: "Open Data",
    job: "Consultant Data · [Entreprise]",
    initials: "PN",
    linkedin: "#",
  },
  {
    name: "Prénom Nom",
    expertise: "Data Science",
    job: "Data Scientist · [Entreprise]",
    initials: "PN",
    linkedin: "#",
  },
];

const organisationnel = [
  {
    role: "Responsable Partenariat",
    name: "Prénom Nom",
    initials: "PN",
    icon: Handshake,
    color: "bg-[#c24b46]",
    desc: "Développe et entretient les relations avec les partenaires techniques et institutionnels de Kodata:",
    linkedin: "#",
    twitter: "#",
  },
  {
    role: "Responsable Communication",
    name: "Prénom Nom",
    initials: "PN",
    icon: Megaphone,
    color: "bg-[#e8b056]",
    desc: "Pilote la stratégie de communication, gère les réseaux sociaux et la visibilité de la communauté.",
    linkedin: "#",
    twitter: "#",
  },
  {
    role: "Responsable Logistique",
    name: "Prénom Nom",
    initials: "PN",
    icon: Truck,
    color: "bg-[#d67035]",
    desc: "Coordonne l'organisation des événements et assure la bonne gestion des ressources matérielles.",
    linkedin: "#",
    twitter: "#",
  },
];

function MemberCard({ member }: { member: typeof executif[0] }) {
  return (
    <div className="bg-white border-2 border-[#2d3235] retro-shadow flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
      <div className={`${member.color} h-40 flex items-center justify-center border-b-2 border-[#2d3235]`}>
        <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-3xl font-bold text-white">
          {member.initials}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1 gap-3">
        <div>
          <div className="inline-block border border-[#2d3235] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#5a5f63] mb-2">
            {member.role}
          </div>
          <h3 className="text-xl font-semibold">{member.name}</h3>
          <p className="text-sm text-[#5a5f63]">{member.job}</p>
        </div>
        <p className="text-sm text-[#5a5f63] leading-relaxed flex-1">{member.bio}</p>
        <div className="flex gap-3 pt-2 border-t border-gray-100">
          <a href={member.linkedin} className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="LinkedIn">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={member.twitter} className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="Twitter">
            <Twitter className="w-4 h-4" />
          </a>
          <a href="mailto:contact@kodata.mg" className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="Email">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function BoardPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#e8b056] text-[#2d3235] text-xs font-semibold tracking-widest uppercase mb-8">
          Gouvernance
        </div>
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
            Le comité <span className="italic text-[#1d8f6d]">exécutif</span> de Kodata:
          </h1>
          <p className="text-xl text-[#5a5f63] leading-relaxed">
            L&apos;équipe fondatrice et dirigeante de la communauté. Des alumni du YALI RLC Madagascar
            Chapter engagés pour faire de Kodata: un catalyseur de la culture data à Madagascar.
          </p>
        </div>
      </section>

      {/* ── GRILLE COMITÉ EXÉCUTIF ── */}
      <section className="w-full max-w-7xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {executif.map((member) => (
            <MemberCard key={member.name + member.role} member={member} />
          ))}
        </div>
      </section>

      {/* ── RLC CONNECTION ── */}
      <section className="w-full bg-[#2d3235] text-[#efeadd] py-16 border-y-2 border-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Alumni du YALI RLC Madagascar Chapter</h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Tous les membres du comité exécutif sont des alumni du{" "}
            <span className="text-[#e8b056] font-semibold">YALI RLC Madagascar Chapter</span>, un réseau
            de leaders formés pour impulser le changement à Madagascar. Kodata: est l&apos;expression
            concrète de leur engagement collectif pour la data.
          </p>
        </div>
      </section>

      {/* ── COMITÉ ORGANISATIONNEL ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#c24b46] text-white border-2 border-[#2d3235] shadow-[4px_4px_0px_0px_#2d3235]">
            <Handshake className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63]">Organisation & Opérations</span>
        </div>
        <h2 className="text-4xl font-semibold tracking-tight mb-4">Comité organisationnel</h2>
        <p className="text-xl text-[#5a5f63] leading-relaxed max-w-xl mb-14">
          Ce comité assure le bon fonctionnement opérationnel de la communauté, des partenariats à la logistique en passant par la communication.
        </p>
        <div className="grid sm:grid-cols-3 gap-8">
          {organisationnel.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.role}
                className="bg-white border-2 border-[#2d3235] retro-shadow hover:translate-y-[-4px] transition-transform duration-300 flex flex-col"
              >
                <div className={`${m.color} h-40 flex items-center justify-center border-b-2 border-[#2d3235]`}>
                  <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div>
                    <div className="inline-block border border-[#2d3235] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#5a5f63] mb-2">
                      {m.role}
                    </div>
                    <h3 className="text-xl font-semibold">{m.name}</h3>
                  </div>
                  <p className="text-sm text-[#5a5f63] leading-relaxed flex-1">{m.desc}</p>
                  <div className="flex gap-3 pt-2 border-t border-gray-100">
                    <a href={m.linkedin} className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="LinkedIn">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href={m.twitter} className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="Twitter">
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a href="mailto:contact@kodata.mg" className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="Email">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── COMITÉ SCIENTIFIQUE ET TECHNIQUE ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#1d8f6d] text-white border-2 border-[#2d3235] shadow-[4px_4px_0px_0px_#2d3235]">
                <FlaskConical className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63]">Expertise & Contenu</span>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight mb-4">
              Comité scientifique et technique
            </h2>
            <p className="text-xl text-[#5a5f63] leading-relaxed max-w-xl">
              Composé de membres actifs de la communauté, ce comité oriente les contenus,
              valide les projets et garantit la qualité des productions de Kodata:
            </p>
          </div>
          <Link
            href="https://tally.so/r/7RW189" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-2 border-2 border-[#2d3235] px-6 py-3 font-semibold hover:bg-[#e8b056] transition-colors"
          >
            Rejoindre le comité
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {scientifique.map((m) => (
            <div
              key={m.name + m.expertise}
              className="bg-white border-2 border-[#2d3235] p-6 retro-shadow flex items-center gap-5 hover:translate-y-[-3px] transition-transform duration-300"
            >
              {/* Avatar compact */}
              <div className="w-14 h-14 flex-shrink-0 bg-[#efeadd] border-2 border-[#2d3235] flex items-center justify-center text-xl font-bold text-[#2d3235]">
                {m.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-block bg-[#1d8f6d]/10 border border-[#1d8f6d]/30 text-[#1d8f6d] text-xs font-semibold px-2 py-0.5 mb-1">
                  {m.expertise}
                </div>
                <h3 className="font-semibold leading-snug truncate">{m.name}</h3>
                <p className="text-xs text-[#5a5f63] truncate">{m.job}</p>
              </div>
              <a
                href={m.linkedin}
                className="flex-shrink-0 p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-semibold tracking-tight mb-4">Vous souhaitez contribuer ?</h2>
        <p className="text-xl text-[#5a5f63] mb-10">
          Rejoignez la communauté et participez activement à la construction de Kodata:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="https://tally.so/r/7RW189" target="_blank" rel="noopener noreferrer"
            className="bg-[#1d8f6d] text-white text-lg px-8 py-4 border-2 border-[#2d3235] retro-shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d3235] transition-all font-semibold"
          >
            Rejoindre la communauté
          </Link>
          <Link
            href="/contact"
            className="bg-transparent text-[#2d3235] text-lg px-8 py-4 border-2 border-[#2d3235] hover:bg-[#e8b056] transition-colors font-semibold"
          >
            Contacter le comité
          </Link>
        </div>
      </section>
    </>
  );
}
