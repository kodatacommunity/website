import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Calendar,
  GitBranch,
  Users,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { count: nbMembres },
    { count: nbProjets },
    { count: nbEvenements },
    { data: dernierMembre },
  ] = await Promise.all([
    supabase.from("membres").select("*", { count: "exact", head: true }),
    supabase.from("projets").select("*", { count: "exact", head: true }),
    supabase.from("evenements").select("*", { count: "exact", head: true }),
    supabase.from("membres").select("prenom").order("created_at", { ascending: false }).limit(1),
  ]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div className="space-y-7">
          <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#e8b056] text-[#2d3235] text-xs font-semibold tracking-widest uppercase">
            Communauté data · Madagascar
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
            La communauté où les{" "}
            <span className="italic text-[#1d8f6d]">passionnés de la data</span>{" "}
            grandissent ensemble.
          </h1>

          <p className="text-lg md:text-xl text-[#5a5f63] leading-relaxed max-w-lg">
            Discussions, événements et projets collaboratifs — Kodata: réunit data analysts,
            data engineers, data scientists et curieux du numérique, à Madagascar et au-delà.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/rejoindre"
              className="bg-[#1d8f6d] text-white text-lg px-8 py-4 border-2 border-[#2d3235] retro-shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d3235] transition-all font-semibold flex items-center justify-center gap-3"
            >
              Rejoindre la communauté
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/projets"
              className="bg-transparent text-[#2d3235] text-lg px-8 py-4 border-2 border-[#2d3235] hover:bg-[#e8b056] transition-colors font-semibold text-center"
            >
              Voir les projets
            </Link>
          </div>

          <p className="text-sm text-[#5a5f63]">Gratuit · Ouvert à tous les passionnés de data</p>
        </div>

        {/* Right — pseudo-terminal card */}
        <div className="relative w-full flex justify-center md:justify-end">
          <div className="absolute top-0 right-0 w-3/4 h-full bg-[#d67035] opacity-20 -z-10 translate-x-4 translate-y-4" />

          <div className="bg-[#2d3235] border-2 border-[#2d3235] p-8 w-full max-w-md shadow-[8px_8px_0px_0px_#e8b056]">
            {/* Terminal header */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <span className="text-[#efeadd] font-semibold text-lg">kodata://community</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#c24b46] border border-white/20" />
                <div className="w-3 h-3 rounded-full bg-[#e8b056] border border-white/20" />
                <div className="w-3 h-3 rounded-full bg-[#1d8f6d] border border-white/20" />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["#data-mada", "#analytics", "#open-data", "#dataviz", "#ML"].map((tag) => (
                <span key={tag} className="bg-[#1d8f6d]/20 text-[#e8b056] border border-[#1d8f6d]/40 px-2 py-0.5 text-sm font-mono">
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                { label: "membres", value: nbMembres ?? 0 },
                { label: "projets", value: nbProjets ?? 0 },
                { label: "événements", value: nbEvenements ?? 0 },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold text-[#e8b056]">{s.value}</div>
                  <div className="text-xs text-white/50 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Last activity */}
            {dernierMembre?.[0] && (
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1d8f6d] mt-1.5 flex-shrink-0 animate-pulse" />
                  <p className="text-sm text-white/60 font-mono">
                    <span className="text-[#1d8f6d]">{dernierMembre[0].prenom}</span> a rejoint la communauté
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ── */}
      <div className="w-full border-y-2 border-[#2d3235] bg-white overflow-hidden py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
          {[
            { icon: <Users className="w-6 h-6 text-[#1d8f6d]" />, label: "Communauté active" },
            { icon: <Calendar className="w-6 h-6 text-[#e8b056]" />, label: "Événements réguliers" },
            { icon: <GitBranch className="w-6 h-6 text-[#1d8f6d]" />, label: "Projets collaboratifs" },
            { icon: <MessageCircle className="w-6 h-6 text-[#d67035]" />, label: "Discussions ouvertes" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm font-semibold uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── PILIERS ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="mb-14">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">Pourquoi rejoindre Kodata: ?</h2>
          <p className="text-xl text-[#5a5f63] max-w-2xl leading-relaxed">
            Née du réseau RLC Madagascar, Kodata: est la première communauté dédiée à transformer
            la culture data à Madagascar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <MessageCircle className="w-8 h-8" />,
              color: "bg-[#c24b46]",
              title: "Discussions",
              desc: "Échangez sur les meilleures pratiques, les outils et les tendances data avec des pairs qui partagent vos passions.",
              href: "/a-propos",
            },
            {
              icon: <Calendar className="w-8 h-8" />,
              color: "bg-[#e8b056]",
              iconClass: "text-[#2d3235]",
              title: "Événements",
              desc: "Participez à des meetups, workshops et hackathons organisés par et pour la communauté data malgache.",
              href: "/evenements",
            },
            {
              icon: <GitBranch className="w-8 h-8" />,
              color: "bg-[#1d8f6d]",
              title: "Projets collaboratifs",
              desc: "Contribuez à des projets data concrets qui ont un impact réel sur le développement de Madagascar.",
              href: "/projets",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border-2 border-[#2d3235] p-8 retro-shadow flex flex-col items-start gap-4 hover:translate-y-[-4px] transition-transform duration-300"
            >
              <div className={`p-3 ${card.color} ${card.iconClass ?? "text-white"} border-2 border-[#2d3235] shadow-[4px_4px_0px_0px_#2d3235]`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-semibold mt-2">{card.title}</h3>
              <p className="text-[#5a5f63] leading-relaxed flex-1">{card.desc}</p>
              <Link href={card.href} className="flex items-center gap-2 text-[#1d8f6d] font-semibold hover:gap-3 transition-all text-sm uppercase tracking-wide">
                En savoir plus <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── ORIGINE RLC (section sombre) ── */}
      <section className="w-full bg-[#2d3235] text-[#efeadd] py-24 border-y-2 border-black">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
              Née du RLC Madagascar, portée par la data.
            </h2>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              Kodata: est une initiative des alumnis du{" "}
              <span className="text-[#e8b056] font-semibold">RLC Madagascar Chapter</span> — un réseau
              de leaders engagés dans le développement de Madagascar. Partageant la conviction que
              la maîtrise de la data est un levier de transformation, ils ont créé Kodata: pour
              fédérer tous les passionnés.
            </p>
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-2 border-2 border-[#efeadd] px-6 py-3 font-semibold hover:bg-[#efeadd] hover:text-[#2d3235] transition-colors"
            >
              Notre histoire <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Steps */}
          <div className="space-y-8">
            {[
              { n: "1", color: "bg-[#c24b46]", title: "Rejoindre", desc: "Créez votre profil et intégrez les canaux de discussion de la communauté." },
              { n: "2", color: "bg-[#d67035]", title: "Apprendre", desc: "Accédez aux ressources, événements et retours d'expérience des membres." },
              { n: "3", color: "bg-[#e8b056] text-[#2d3235]", title: "Contribuer", desc: "Lancez ou rejoignez un projet data, mentorez d'autres membres." },
            ].map((step) => (
              <div key={step.n} className="flex gap-6">
                <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center ${step.color} border-2 border-[#efeadd] text-xl font-bold`}>
                  {step.n}
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-1">{step.title}</h4>
                  <p className="text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="w-full max-w-3xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
          Prêt à rejoindre l&apos;aventure data ?
        </h2>
        <p className="text-xl text-[#5a5f63] mb-10 leading-relaxed">
          L&apos;adhésion est gratuite. La communauté vous attend.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/rejoindre"
            className="bg-[#1d8f6d] text-white text-xl px-10 py-4 border-2 border-[#2d3235] retro-shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d3235] transition-all font-semibold flex items-center justify-center gap-3"
          >
            Rejoindre <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/a-propos"
            className="bg-transparent text-[#2d3235] text-xl px-10 py-4 border-2 border-[#2d3235] hover:bg-[#e8b056] transition-colors font-semibold"
          >
            En savoir plus
          </Link>
        </div>
      </section>
    </>
  );
}
