import { Linkedin, Twitter, Mail, FlaskConical, Handshake, Megaphone, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { type LucideIcon } from "lucide-react";

const ROLE_ICONS: Record<string, LucideIcon> = {
  "Responsable Partenariat": Handshake,
  "Responsable Communication": Megaphone,
  "Responsable Logistique": Truck,
};

function getIcon(role: string): LucideIcon {
  for (const key of Object.keys(ROLE_ICONS)) {
    if (role.toLowerCase().includes(key.toLowerCase().split(" ")[1])) return ROLE_ICONS[key];
  }
  return Handshake;
}

export default async function BoardPage() {
  const supabase = await createClient();
  const { data: membres } = await supabase
    .from("board_members")
    .select("*")
    .order("ordre");

  const tous = membres ?? [];
  const executif = tous.filter((m) => m.equipe === "executif");
  const scientifique = tous.filter((m) => m.equipe === "scientifique");
  const organisationnel = tous.filter((m) => m.equipe === "operationnel");

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

      {/* ── COMITÉ EXÉCUTIF ── */}
      {executif.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-6 pb-24">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {executif.map((m) => (
              <div key={m.id} className="bg-white border-2 border-[#2d3235] retro-shadow flex flex-col hover:translate-y-[-4px] transition-transform duration-300">
                <div className={`${m.color} h-40 flex items-center justify-center border-b-2 border-[#2d3235]`}>
                  {m.photo_url ? (
                    <Image src={m.photo_url} alt={`${m.prenom} ${m.nom}`} width={80} height={80} className="w-20 h-20 rounded-full object-cover border-2 border-white" />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-3xl font-bold text-white">
                      {m.initiales}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1 gap-3">
                  <div>
                    <div className="inline-block border border-[#2d3235] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#5a5f63] mb-2">
                      {m.role}
                    </div>
                    <h3 className="text-xl font-semibold">{m.prenom} {m.nom}</h3>
                    <p className="text-sm text-[#5a5f63]">{m.job}</p>
                  </div>
                  <p className="text-sm text-[#5a5f63] leading-relaxed flex-1">{m.bio}</p>
                  <div className="flex gap-3 pt-2 border-t border-gray-100">
                    {m.linkedin ? (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="LinkedIn">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="p-2 border-2 border-gray-200 text-gray-300"><Linkedin className="w-4 h-4" /></span>
                    )}
                    {m.twitter ? (
                      <a href={m.twitter} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="Twitter">
                        <Twitter className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="p-2 border-2 border-gray-200 text-gray-300"><Twitter className="w-4 h-4" /></span>
                    )}
                    <a href="mailto:contact@kodata.mg" className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="Email">
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── RLC CONNECTION ── */}
      <section className="w-full bg-[#2d3235] text-[#efeadd] py-16 border-y-2 border-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Alumni du RLC Madagascar Chapter</h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Tous les membres du comité exécutif sont des alumni du{" "}
            <span className="text-[#e8b056] font-semibold">RLC Madagascar Chapter</span>, un réseau
            de leaders formés pour impulser le changement à Madagascar. Kodata: est l&apos;expression
            concrète de leur engagement collectif pour la data.
          </p>
        </div>
      </section>

      {/* ── COMITÉ ORGANISATIONNEL ── */}
      {organisationnel.length > 0 && (
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
              const Icon = getIcon(m.role);
              return (
                <div key={m.id} className="bg-white border-2 border-[#2d3235] retro-shadow hover:translate-y-[-4px] transition-transform duration-300 flex flex-col">
                  <div className={`${m.color} h-40 flex items-center justify-center border-b-2 border-[#2d3235]`}>
                    {m.photo_url ? (
                      <Image src={m.photo_url} alt={`${m.prenom} ${m.nom}`} width={80} height={80} className="w-20 h-20 rounded-full object-cover border-2 border-white" />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1 gap-3">
                    <div>
                      <div className="inline-block border border-[#2d3235] px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#5a5f63] mb-2">
                        {m.role}
                      </div>
                      <h3 className="text-xl font-semibold">{m.prenom} {m.nom}</h3>
                    </div>
                    <p className="text-sm text-[#5a5f63] leading-relaxed flex-1">{m.bio}</p>
                    <div className="flex gap-3 pt-2 border-t border-gray-100">
                      {m.linkedin ? (
                        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="LinkedIn">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="p-2 border-2 border-gray-200 text-gray-300"><Linkedin className="w-4 h-4" /></span>
                      )}
                      {m.twitter ? (
                        <a href={m.twitter} target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="Twitter">
                          <Twitter className="w-4 h-4" />
                        </a>
                      ) : (
                        <span className="p-2 border-2 border-gray-200 text-gray-300"><Twitter className="w-4 h-4" /></span>
                      )}
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
      )}

      {/* ── COMITÉ SCIENTIFIQUE ── */}
      {scientifique.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#1d8f6d] text-white border-2 border-[#2d3235] shadow-[4px_4px_0px_0px_#2d3235]">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63]">Expertise & Contenu</span>
              </div>
              <h2 className="text-4xl font-semibold tracking-tight mb-4">Comité scientifique et technique</h2>
              <p className="text-xl text-[#5a5f63] leading-relaxed max-w-xl">
                Composé de membres actifs de la communauté, ce comité oriente les contenus,
                valide les projets et garantit la qualité des productions de Kodata:
              </p>
            </div>
            <Link href="/rejoindre"
              className="flex-shrink-0 inline-flex items-center gap-2 border-2 border-[#2d3235] px-6 py-3 font-semibold hover:bg-[#e8b056] transition-colors">
              Rejoindre le comité
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {scientifique.map((m) => (
              <div key={m.id} className="bg-white border-2 border-[#2d3235] p-6 retro-shadow flex items-center gap-5 hover:translate-y-[-3px] transition-transform duration-300">
                <div className="w-14 h-14 flex-shrink-0 bg-[#efeadd] border-2 border-[#2d3235] flex items-center justify-center text-xl font-bold text-[#2d3235] overflow-hidden">
                  {m.photo_url ? (
                    <Image src={m.photo_url} alt={`${m.prenom} ${m.nom}`} width={56} height={56} className="w-full h-full object-cover" />
                  ) : (
                    m.initiales
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-block bg-[#1d8f6d]/10 border border-[#1d8f6d]/30 text-[#1d8f6d] text-xs font-semibold px-2 py-0.5 mb-1">
                    {m.role}
                  </div>
                  <h3 className="font-semibold leading-snug truncate">{m.prenom} {m.nom}</h3>
                  <p className="text-xs text-[#5a5f63] truncate">{m.job}</p>
                </div>
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 p-2 border-2 border-[#2d3235] hover:bg-[#2d3235] hover:text-white transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="w-full max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-4xl font-semibold tracking-tight mb-4">Vous souhaitez contribuer ?</h2>
        <p className="text-xl text-[#5a5f63] mb-10">
          Rejoignez la communauté et participez activement à la construction de Kodata:
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/rejoindre"
            className="bg-[#1d8f6d] text-white text-lg px-8 py-4 border-2 border-[#2d3235] retro-shadow-hard hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#2d3235] transition-all font-semibold">
            Rejoindre la communauté
          </Link>
          <Link href="/contact"
            className="bg-transparent text-[#2d3235] text-lg px-8 py-4 border-2 border-[#2d3235] hover:bg-[#e8b056] transition-colors font-semibold">
            Contacter le comité
          </Link>
        </div>
      </section>
    </>
  );
}
