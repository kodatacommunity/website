import { Calendar, MapPin, Video, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const TYPE_COLORS: Record<string, string> = {
  Workshop: "bg-[#d67035] text-white",
  Meetup: "bg-[#c24b46] text-white",
  Hackathon: "bg-[#1d8f6d] text-white",
  Conférence: "bg-[#e8b056] text-[#2d3235]",
};

function typeColor(type: string) {
  return TYPE_COLORS[type] ?? "bg-[#2d3235] text-white";
}

export default async function EvenementsPage() {
  const supabase = await createClient();

  const { data: tous } = await supabase
    .from("evenements")
    .select("*")
    .order("date", { ascending: true });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function isPasse(e: { date: string | null; passe: boolean }) {
    if (e.date) return new Date(e.date) < today;
    return e.passe;
  }

  const aVenir = (tous ?? []).filter((e) => !isPasse(e));
  const passes = (tous ?? []).filter((e) => isPasse(e)).reverse();

  const prochainEvent = aVenir[0] ?? null;
  const evenements = aVenir.slice(1);

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

      {/* ── PROCHAIN ÉVÉNEMENT ── */}
      {prochainEvent && (
        <section className="w-full bg-[#2d3235] border-y-2 border-black">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#1d8f6d] animate-pulse" />
              <span className="text-[#e8b056] text-sm font-semibold uppercase tracking-widest">
                Prochain événement
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-12 items-center">
              <div className="text-center md:text-left">
                <div className="inline-block bg-[#c24b46] border-2 border-[#efeadd] p-6 text-center min-w-[120px] shadow-[6px_6px_0px_0px_#e8b056]">
                  <div className="text-5xl font-bold text-white">{prochainEvent.jour}</div>
                  <div className="text-lg text-white/80 font-semibold uppercase tracking-widest">
                    {prochainEvent.mois}
                  </div>
                </div>
              </div>
              <div className="md:col-span-2 text-[#efeadd]">
                <span className="inline-block border border-[#e8b056] text-[#e8b056] text-xs px-2 py-0.5 font-semibold uppercase tracking-wide mb-4">
                  {prochainEvent.type}
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
                  {prochainEvent.titre}
                </h2>
                <p className="text-white/70 leading-relaxed mb-6 text-lg">
                  {prochainEvent.description}
                </p>
                <div className="flex flex-wrap gap-6 text-sm text-white/60 mb-8">
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />{prochainEvent.lieu}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />{prochainEvent.heure}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />{prochainEvent.format}
                  </span>
                </div>
                {prochainEvent.inscription_url ? (
                  <a
                    href={prochainEvent.inscription_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-[#e8b056] text-[#2d3235] px-8 py-4 border-2 border-[#efeadd] font-bold hover:bg-[#efeadd] transition-colors"
                  >
                    S&apos;inscrire <ArrowRight className="w-5 h-5" />
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 bg-[#e8b056] text-[#2d3235] px-8 py-4 border-2 border-[#efeadd] font-bold hover:bg-[#efeadd] transition-colors"
                  >
                    S&apos;inscrire <ArrowRight className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ÉVÉNEMENTS À VENIR ── */}
      {evenements.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-semibold mb-10">À venir</h2>
          <div className="flex flex-col gap-6">
            {evenements.map((e) => (
              <div
                key={e.id}
                className="bg-white border-2 border-[#2d3235] retro-shadow flex flex-col md:flex-row hover:translate-y-[-2px] transition-transform duration-300"
              >
                <div className="bg-[#efeadd] border-b-2 md:border-b-0 md:border-r-2 border-[#2d3235] px-6 py-5 flex md:flex-col items-center justify-center md:min-w-[100px] gap-4 md:gap-1">
                  <span className="text-4xl md:text-5xl font-bold text-[#2d3235]">{e.jour}</span>
                  <span className="text-sm font-semibold uppercase tracking-widest text-[#5a5f63]">
                    {e.mois}
                  </span>
                </div>
                <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">
                  <div className="flex-1">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 mb-2 ${typeColor(e.type)}`}>
                      {e.type}
                    </span>
                    <h3 className="text-xl font-semibold mb-1">{e.titre}</h3>
                    <p className="text-[#5a5f63] text-sm leading-relaxed">{e.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-[#5a5f63] mt-3">
                      <span className="flex items-center gap-1">
                        {e.format === "online" ? (
                          <Video className="w-3 h-3" />
                        ) : (
                          <MapPin className="w-3 h-3" />
                        )}
                        {e.lieu}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />{e.heure}
                      </span>
                    </div>
                  </div>
                  {e.inscription_url ? (
                    <a
                      href={e.inscription_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 bg-[#2d3235] text-[#efeadd] px-5 py-2.5 border-2 border-[#2d3235] retro-shadow-hover text-sm font-semibold"
                    >
                      S&apos;inscrire
                    </a>
                  ) : (
                    <Link
                      href="/contact"
                      className="flex-shrink-0 bg-[#2d3235] text-[#efeadd] px-5 py-2.5 border-2 border-[#2d3235] retro-shadow-hover text-sm font-semibold"
                    >
                      S&apos;inscrire
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── ÉVÉNEMENTS PASSÉS ── */}
      {passes.length > 0 && (
        <section className="w-full border-t-2 border-[#2d3235] bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h2 className="text-3xl font-semibold mb-8">Événements passés</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {passes.map((p) => (
                <div
                  key={p.id}
                  className="border-2 border-[#2d3235] p-5 hover:bg-[#efeadd] transition-colors"
                >
                  <div className="text-xs text-[#5a5f63] uppercase tracking-widest mb-2">
                    {p.jour} {p.mois}
                  </div>
                  <h3 className="font-semibold leading-snug mb-2">{p.titre}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#5a5f63]">{p.type}</span>
                    {p.participants && (
                      <span className="text-[#1d8f6d] font-semibold">
                        {p.participants} participants
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
