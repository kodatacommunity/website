"use client";

import { useState } from "react";
import { ArrowRight, Mail, Users, Handshake, Newspaper, Send, CheckCircle } from "lucide-react";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const sujets = [
  {
    value: "general",
    label: "Question générale",
    icon: <Mail className="w-5 h-5" />,
    color: "bg-[#1d8f6d]",
    email: "contact@kodata.mg",
    desc: "Toute question sur la communauté, nos activités ou notre démarche.",
  },
  {
    value: "rejoindre",
    label: "Rejoindre la communauté",
    icon: <Users className="w-5 h-5" />,
    color: "bg-[#c24b46]",
    email: "contact@kodata.mg",
    desc: "Vous souhaitez intégrer Kodata: et en savoir plus sur le processus.",
  },
  {
    value: "partenariat",
    label: "Proposition de partenariat",
    icon: <Handshake className="w-5 h-5" />,
    color: "bg-[#d67035]",
    email: "contact@kodata.mg",
    desc: "Entreprise, institution ou association souhaitant collaborer avec Kodata:.",
  },
  {
    value: "presse",
    label: "Presse & médias",
    icon: <Newspaper className="w-5 h-5" />,
    color: "bg-[#e8b056]",
    email: "contact@kodata.mg",
    desc: "Journalistes souhaitant en savoir plus sur Kodata: ou interviewer nos membres.",
  },
];

export default function ContactPage() {
  const [sujet, setSujet] = useState("general");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const sujetActif = sujets.find((s) => s.value === sujet)!;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const sujetLabel = sujetActif.label;
    const body = `Nom : ${nom}\nEmail : ${email}\n\n${message}`;
    const mailto = `mailto:${sujetActif.email}?subject=[Kodata:] ${encodeURIComponent(sujetLabel)} — ${encodeURIComponent(nom)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#e8b056] text-[#2d3235] text-xs font-semibold tracking-widest uppercase mb-8">
          Contact
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              Écrivez-<span className="italic text-[#1d8f6d]">nous</span>
            </h1>
            <p className="text-xl text-[#5a5f63] leading-relaxed">
              Une question, une idée, une proposition de partenariat ? L&apos;équipe
              Kodata: vous répondra dans les plus brefs délais.
            </p>
          </div>

          {/* Carte email direct */}
          <div className="bg-white border-2 border-[#2d3235] p-8 retro-shadow">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mb-3">
              Contact direct
            </p>
            <a
              href="mailto:contact@kodata.mg"
              className="text-2xl font-semibold text-[#2d3235] hover:text-[#1d8f6d] transition-colors flex items-center gap-3"
            >
              <Mail className="w-6 h-6 text-[#1d8f6d] flex-shrink-0" />
              contact@kodata.mg
            </a>
            <p className="text-sm text-[#5a5f63] mt-4 leading-relaxed">
              Ou utilisez le formulaire ci-dessous — il prépare automatiquement
              votre email avec les bonnes informations.
            </p>
            <div className="mt-5 pt-5 border-t border-gray-200">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mb-3">
                Réseaux sociaux
              </p>
              <a
                href="https://www.facebook.com/profile.php?id=61587101146608"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border-2 border-[#2d3235] px-4 py-2 font-semibold text-sm hover:bg-[#2d3235] hover:text-[#efeadd] transition-colors"
              >
                <FacebookIcon />
                Kodata: sur Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE ── */}
      <section className="w-full border-t-2 border-[#2d3235] bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {sent ? (
            /* ── État envoyé ── */
            <div className="text-center py-16">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-[#1d8f6d]" />
              </div>
              <h2 className="text-3xl font-semibold mb-4">Votre email est prêt !</h2>
              <p className="text-[#5a5f63] text-lg leading-relaxed max-w-md mx-auto">
                Votre client mail s&apos;est ouvert avec le message pré-rempli.
                Il ne vous reste plus qu&apos;à l&apos;envoyer.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-8 border-2 border-[#2d3235] px-6 py-3 font-semibold hover:bg-[#e8b056] transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Choix du sujet */}
              <div>
                <label className="block text-sm font-semibold uppercase tracking-widest text-[#2d3235] mb-4">
                  Objet de votre message
                </label>
                <div className="grid sm:grid-cols-2 gap-3">
                  {sujets.map((s) => (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => setSujet(s.value)}
                      className={`flex items-start gap-4 p-4 border-2 text-left transition-all ${
                        sujet === s.value
                          ? "border-[#2d3235] bg-[#2d3235] text-[#efeadd] shadow-[4px_4px_0px_0px_#e8b056]"
                          : "border-[#2d3235] hover:bg-[#efeadd]"
                      }`}
                    >
                      <div
                        className={`p-2 flex-shrink-0 border-2 ${
                          sujet === s.value
                            ? "border-[#efeadd] " + s.color + " text-white"
                            : "border-[#2d3235] " + s.color + " text-white"
                        }`}
                      >
                        {s.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{s.label}</p>
                        <p
                          className={`text-xs mt-1 leading-relaxed ${
                            sujet === s.value ? "text-white/70" : "text-[#5a5f63]"
                          }`}
                        >
                          {s.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Nom & Email */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="nom"
                    className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]"
                  >
                    Nom complet <span className="text-[#c24b46]">*</span>
                  </label>
                  <input
                    id="nom"
                    type="text"
                    required
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    placeholder="Votre nom"
                    className="border-2 border-[#2d3235] px-4 py-3 bg-[#efeadd] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#2d3235] transition-all placeholder:text-[#5a5f63]/60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]"
                  >
                    Adresse email <span className="text-[#c24b46]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@exemple.com"
                    className="border-2 border-[#2d3235] px-4 py-3 bg-[#efeadd] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#2d3235] transition-all placeholder:text-[#5a5f63]/60"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold uppercase tracking-widest text-[#2d3235]"
                >
                  Votre message <span className="text-[#c24b46]">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={7}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre demande..."
                  className="border-2 border-[#2d3235] px-4 py-3 bg-[#efeadd] focus:outline-none focus:bg-white focus:shadow-[4px_4px_0px_0px_#2d3235] transition-all resize-none placeholder:text-[#5a5f63]/60"
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <button
                  type="submit"
                  className="inline-flex items-center gap-3 bg-[#1d8f6d] text-white text-lg px-8 py-4 border-2 border-[#2d3235] retro-shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d3235] transition-all font-semibold"
                >
                  <Send className="w-5 h-5" />
                  Envoyer le message
                </button>
                <p className="text-xs text-[#5a5f63] leading-relaxed max-w-xs">
                  Ce formulaire ouvre votre client mail avec le message pré-rempli.
                  Aucune donnée n&apos;est envoyée directement depuis ce site.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── CTA REJOINDRE ── */}
      <section className="w-full bg-[#2d3235] text-[#efeadd] py-16 border-y-2 border-black">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Vous souhaitez rejoindre la communauté ?
            </h2>
            <p className="text-white/70">
              L&apos;adhésion est gratuite et ouverte à tous les passionnés de data.
            </p>
          </div>
          <a
            href="https://tally.so/r/7RW189"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-3 bg-[#e8b056] text-[#2d3235] px-8 py-4 border-2 border-[#efeadd] font-bold hover:bg-[#efeadd] transition-colors text-lg"
          >
            Rejoindre Kodata: <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </>
  );
}
