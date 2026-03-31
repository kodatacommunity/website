import { Calendar, MapPin, Video, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const prochainEvent = {
  jour: "07",
  mois: "Mars",
  type: "Workshop",
  title: "Dataskills: #1 — Initiation à Python pour l'analyse de données",
  desc: "Rejoignez-nous pour une matinée de travail autour de Python et l'analyse de données : un atelier interactif et pratique + discussion ouverte.",
  lieu: "École 42 Andraharo",
  heure: "10h00 – 12h30",
  format: "Hybride",
  inscriptionUrl: "https://tally.so/r/LZpqzz",
};

const evenements = [
  {
    jour: "05",
    mois: "Avr",
    type: "Workshop",
    typeColor: "bg-[#d67035] text-white",
    title: "Atelier Python pour la data — Niveau débutant",
    lieu: "En ligne",
    heure: "14h00",
    format: "online",
    desc: "Initiation pratique à Python pour l'analyse de données, avec des cas d'usage locaux.",
  },
  {
    jour: "20",
    mois: "Avr",
    type: "Meetup",
    typeColor: "bg-[#c24b46] text-white",
    title: "Data & Santé publique à Madagascar",
    lieu: "Antananarivo",
    heure: "18h30",
    format: "Présentiel",
    desc: "Retours d'expérience sur l'utilisation des données pour améliorer les indicateurs de santé.",
  },
  {
    jour: "10",
    mois: "Mai",
    type: "Hackathon",
    typeColor: "bg-[#1d8f6d] text-white",
    title: "DataHack Madagascar 2025",
    lieu: "Antananarivo + En ligne",
    heure: "8h00",
    format: "hybride",
    desc: "48h pour construire des solutions data autour des défis du développement malgache.",
  },
];

const passes = [
  {
    mois: "Jan 2025",
    title: "Meetup #2 — Introduction au Machine Learning",
    type: "Meetup",
    participants: 35,
  },
  {
    mois: "Nov 2024",
    title: "Workshop Data Viz avec Power BI",
    type: "Workshop",
    participants: 22,
  },
  {
    mois: "Oct 2024",
    title: "Meetup #1 — Lancement de Kodata:",
    type: "Meetup",
    participants: 48,
  },
];

export default function EvenementsPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#e8b056] text-[#2d3235] text-xs font-semibold tracking-widest uppercase mb-8">
          Agenda
        </div>
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
            Événements <span className="italic text-[#1d8f6d]">Kodata:</span>
          </h1>
          <p className="text-xl text-[#5a5f63] leading-relaxed">
            Meetups, workshops, hackathons — des rendez-vous réguliers pour apprendre,
            échanger et construire ensemble.
          </p>
        </div>
      </section>

      {/* ── PROCHAIN ÉVÉNEMENT (hero card sombre) ── */}
      <section className="w-full bg-[#2d3235] border-y-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-2 rounded-full bg-[#1d8f6d] animate-pulse" />
            <span className="text-[#e8b056] text-sm font-semibold uppercase tracking-widest">Prochain événement</span>
          </div>
          <div className="grid md:grid-cols-3 gap-12 items-center">
            {/* Date block */}
            <div className="text-center md:text-left">
              <div className="inline-block bg-[#c24b46] border-2 border-[#efeadd] p-6 text-center min-w-[120px] shadow-[6px_6px_0px_0px_#e8b056]">
                <div className="text-5xl font-bold text-white">{prochainEvent.jour}</div>
                <div className="text-lg text-white/80 font-semibold uppercase tracking-widest">{prochainEvent.mois}</div>
              </div>
            </div>

            {/* Infos */}
            <div className="md:col-span-2 text-[#efeadd]">
              <span className="inline-block border border-[#e8b056] text-[#e8b056] text-xs px-2 py-0.5 font-semibold uppercase tracking-wide mb-4">
                {prochainEvent.type}
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                {prochainEvent.title}
              </h2>
              <p className="text-white/70 leading-relaxed mb-6 text-lg">{prochainEvent.desc}</p>
              <div className="flex flex-wrap gap-6 text-sm text-white/60 mb-8">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" />{prochainEvent.lieu}</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{prochainEvent.heure}</span>
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{prochainEvent.format}</span>
              </div>
              <a
                href={prochainEvent.inscriptionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#e8b056] text-[#2d3235] px-8 py-4 border-2 border-[#efeadd] font-bold hover:bg-[#efeadd] transition-colors"
              >
                S&apos;inscrire <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÉVÉNEMENTS À VENIR ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-semibold mb-10">À venir</h2>
        <div className="flex flex-col gap-6">
          {evenements.map((e) => (
            <div
              key={e.title}
              className="bg-white border-2 border-[#2d3235] retro-shadow flex flex-col md:flex-row hover:translate-y-[-2px] transition-transform duration-300"
            >
              {/* Date bloc */}
              <div className="bg-[#efeadd] border-b-2 md:border-b-0 md:border-r-2 border-[#2d3235] px-6 py-5 flex md:flex-col items-center justify-center md:min-w-[100px] gap-4 md:gap-1">
                <span className="text-4xl md:text-5xl font-bold text-[#2d3235]">{e.jour}</span>
                <span className="text-sm font-semibold uppercase tracking-widest text-[#5a5f63]">{e.mois}</span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">
                <div className="flex-1">
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 mb-2 ${e.typeColor}`}>
                    {e.type}
                  </span>
                  <h3 className="text-xl font-semibold mb-1">{e.title}</h3>
                  <p className="text-[#5a5f63] text-sm leading-relaxed">{e.desc}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-[#5a5f63] mt-3">
                    <span className="flex items-center gap-1">
                      {e.format === "online" ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                      {e.lieu}
                    </span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.heure}</span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="flex-shrink-0 bg-[#2d3235] text-[#efeadd] px-5 py-2.5 border-2 border-[#2d3235] retro-shadow-hover text-sm font-semibold"
                >
                  S&apos;inscrire
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ÉVÉNEMENTS PASSÉS ── */}
      <section className="w-full border-t-2 border-[#2d3235] bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold mb-8">Événements passés</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {passes.map((p) => (
              <div key={p.title} className="border-2 border-[#2d3235] p-5 hover:bg-[#efeadd] transition-colors">
                <div className="text-xs text-[#5a5f63] uppercase tracking-widest mb-2">{p.mois}</div>
                <h3 className="font-semibold leading-snug mb-2">{p.title}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#5a5f63]">{p.type}</span>
                  <span className="text-[#1d8f6d] font-semibold">{p.participants} participants</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
