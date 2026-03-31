export const metadata = {
  title: "Mentions légales — Kodata:",
  description: "Mentions légales du site kodata.mg",
};

const sections = [
  {
    title: "Éditeur du site",
    content: [
      "Le site Kodata: est édité par l'initiative communautaire Kodata:, une communauté informelle de passionnés de la data à Madagascar, née au sein du réseau YALI RLC (Regional Leadership Center) Madagascar Chapter.",
      "Kodata: n'est pas une entité juridique enregistrée. Il s'agit d'une initiative citoyenne à but non lucratif, portée par des alumni engagés dans le développement de Madagascar.",
      "Contact : contact@kodata.mg",
    ],
  },
  {
    title: "Hébergement",
    content: [
      "Ce site est hébergé par :",
      "Vercel Inc.\n440 N Barranca Ave #4133\nCovina, CA 91723\nÉtats-Unis\nSite web : vercel.com",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "L'ensemble des contenus présents sur ce site (textes, graphismes, logo, charte graphique) sont la propriété de Kodata: ou de leurs auteurs respectifs.",
      "Toute reproduction, représentation, modification ou exploitation de ces contenus, sans autorisation préalable écrite, est interdite et constitue une contrefaçon.",
      "Les marques et logos tiers mentionnés sur ce site restent la propriété de leurs titulaires respectifs.",
    ],
  },
  {
    title: "Données personnelles",
    content: [
      "Kodata: s'engage à respecter la confidentialité des données personnelles de ses membres et visiteurs, conformément aux principes du Règlement Général sur la Protection des Données (RGPD) et aux bonnes pratiques en vigueur.",
      "Les données collectées (via les formulaires d'adhésion ou de contact) sont utilisées exclusivement pour la gestion de la communauté et la communication avec ses membres. Elles ne sont jamais vendues ni transmises à des tiers à des fins commerciales.",
      "Conformément à la réglementation applicable, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ce droit, contactez-nous à : contact@kodata.mg",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de traçage tiers n'est utilisé à ce jour.",
    ],
  },
  {
    title: "Responsabilité",
    content: [
      "Kodata: s'efforce de maintenir les informations publiées sur ce site aussi exactes et à jour que possible. Toutefois, l'initiative ne saurait être tenue responsable des erreurs, omissions ou de l'indisponibilité temporaire du site.",
      "Les liens hypertextes présents sur ce site pointant vers des sites tiers sont fournis à titre indicatif. Kodata: n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
    ],
  },
  {
    title: "Droit applicable",
    content: [
      "Les présentes mentions légales sont soumises au droit malgache. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#e8b056] text-[#2d3235] text-xs font-semibold tracking-widest uppercase mb-8">
          Légal
        </div>
        <h1 className="text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
          Mentions <span className="italic text-[#1d8f6d]">légales</span>
        </h1>
        <p className="text-xl text-[#5a5f63] leading-relaxed max-w-2xl">
          Informations légales relatives à l&apos;édition et à l&apos;hébergement du site Kodata:
        </p>
        <p className="text-sm text-[#5a5f63] mt-4">
          Dernière mise à jour : mars 2026
        </p>
      </section>

      {/* ── CONTENU ── */}
      <section className="w-full border-t-2 border-[#2d3235] bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
          {sections.map((section, i) => (
            <div key={section.title} className="flex gap-8">
              {/* Numéro */}
              <div className="flex-shrink-0 text-4xl font-bold text-[#2d3235]/10 w-12 text-right leading-none pt-1">
                {String(i + 1).padStart(2, "0")}
              </div>
              {/* Contenu */}
              <div className="flex-1 border-l-2 border-[#2d3235] pl-8">
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.map((para, j) => (
                    <p key={j} className="text-[#5a5f63] leading-relaxed whitespace-pre-line">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section className="w-full max-w-4xl mx-auto px-6 py-16">
        <div className="bg-[#2d3235] text-[#efeadd] p-8 border-2 border-[#2d3235] retro-shadow">
          <h2 className="text-xl font-semibold mb-2">Une question ?</h2>
          <p className="text-white/70 leading-relaxed">
            Pour toute question relative à ces mentions légales ou à vos données personnelles,
            contactez-nous à{" "}
            <a href="mailto:contact@kodata.mg" className="text-[#e8b056] hover:underline">
              contact@kodata.mg
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
