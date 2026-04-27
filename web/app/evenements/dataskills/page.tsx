import { createAdminClient } from "@/lib/supabase/admin";
import DataskillsClient from "./DataskillsClient";
import InterventionForm from "./InterventionForm";

export const revalidate = 60;

const THEMES = [
  {
    category: "Fondamentaux & techniques data",
    accent: "#1d8f6d",
    items: [
      "Data science, machine learning, statistiques",
      "Data mining & knowledge discovery",
      "Prétraitement des données",
      "Explainability & interprétabilité des modèles",
    ],
  },
  {
    category: "Data & Intelligence Artificielle",
    accent: "#e8b056",
    items: [
      "Écosystèmes Data & IA (Data4AI)",
      "Modèles d'IA (foundation models, modèles métiers, multimodalité…)",
      "IA industrielle",
      "Cycle de vie et infrastructures IA",
    ],
  },
  {
    category: "Gouvernance & infrastructures",
    accent: "#c24b46",
    items: [
      "Data governance",
      "Infrastructures de données interopérables",
      "Compliance & reporting",
      "Sécurité des données et privacy (synthetic data, secure processing…)",
    ],
  },
  {
    category: "Analytics & Big Data",
    accent: "#d67035",
    items: [
      "Big data",
      "Analytics avancé et temps réel",
      "Data-centric AI",
      "Streaming analytics",
    ],
  },
  {
    category: "Applications & interdisciplinarité",
    accent: "#1d8f6d",
    items: [
      "Santé, éducation, agriculture, environnement",
      "Économie, politiques publiques, industrie 4.0",
      "Mobilité, logistique, transport",
      "Développement durable & climat",
    ],
  },
  {
    category: "Écosystème & impact",
    accent: "#e8b056",
    items: [
      "DataLabs & environnements d'expérimentation",
      "Formation, développement des talents",
      "Business models & création de valeur",
      "Standards et politiques autour de la data et de l'IA",
    ],
  },
];

const OBJECTIFS = [
  { n: "01", label: "Des cas concrets" },
  { n: "02", label: "Des démonstrations" },
  { n: "03", label: "Des retours d'expérience terrain" },
];

export default async function DataskillsPage() {
  const supabase = createAdminClient();
  const { data: appels } = await supabase
    .from("dataskills_appels")
    .select("*")
    .eq("statut", "ouvert")
    .order("date_workshop", { ascending: true });

  return (
    <>
      {/* Hero */}
      <section className="w-full border-b-2 border-[#2d3235]">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="inline-block border-2 border-[#2d3235] px-3 py-1 bg-[#e8b056] text-[#2d3235] text-xs font-semibold tracking-widest uppercase mb-10">
            Événements · DataSkills
          </div>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-end">
            <div>
              <h1 className="text-5xl md:text-6xl font-semibold leading-[1.08] tracking-tight mb-4">
                DataSkills
              </h1>
              <p className="text-lg text-[#5a5f63] leading-relaxed">
                des sessions d&apos;apprentissage pratiques et utiles
              </p>
            </div>
            <div className="flex flex-col gap-3 pb-1">
              {OBJECTIFS.map((item) => (
                <div
                  key={item.n}
                  className="border-2 border-[#2d3235] bg-white px-5 py-4 flex items-center gap-4 shadow-[3px_3px_0px_0px_#2d3235]"
                >
                  <span className="text-xl font-black text-[#1d8f6d] opacity-30 w-8 flex-shrink-0">
                    {item.n}
                  </span>
                  <p className="font-semibold text-[#2d3235]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Format */}
      <section className="w-full border-b-2 border-[#2d3235] bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mb-10">
            Le format
          </p>
          <div className="grid sm:grid-cols-3 gap-6 pb-2">
            {[
              { label: "Fréquence", value: "1er samedi du mois" },
              { label: "Durée", value: "2h30 par session" },
              { label: "Format", value: "Pratique & interactif" },
            ].map((item) => (
              <div
                key={item.label}
                className="border-2 border-[#2d3235] px-6 pt-6 pb-10 shadow-[4px_4px_0px_0px_#2d3235]"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mb-2">
                  {item.label}
                </p>
                <p className="text-2xl font-black text-[#2d3235]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profil intervenants */}
      <section className="w-full border-b-2 border-[#2d3235] bg-[#efeadd]">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mb-2">
            Qui peut proposer ?
          </p>
          <h2 className="text-3xl font-black text-[#2d3235] mb-10">
            Profil des intervenants recherchés
          </h2>
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {[
              "Professionnels, chercheurs, praticiens ou passionnés de la data",
              "Désireux de transmettre bénévolement leurs connaissances",
              "Sensibles au partage, à la pédagogie et à l'impact communautaire",
              "Engagés pour la parité et la diversité des intervenants",
              "Points de vue neutres, sans promotion de produits spécifiques",
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 border-2 border-[#2d3235] bg-white px-5 py-4"
              >
                <span className="w-2 h-2 rounded-full bg-[#1d8f6d] flex-shrink-0 mt-1.5" />
                <p className="text-[#2d3235] leading-relaxed text-sm">{item}</p>
              </div>
            ))}
          </div>
          <div className="border-l-4 border-[#e8b056] pl-5 py-1">
            <p className="text-[#5a5f63] leading-relaxed text-sm">
              Cet appel est ouvert à toutes les organisations souhaitant s&apos;impliquer
              dans les activités de la communauté.
            </p>
          </div>
        </div>
      </section>

      {/* Thématiques */}
      <section className="w-full border-b-2 border-[#2d3235] bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mb-2">
            Sujets
          </p>
          <h2 className="text-3xl font-black text-[#2d3235] mb-4">
            Thématiques proposées
          </h2>
          <p className="text-[#5a5f63] leading-relaxed mb-10 max-w-xl text-sm">
            Les sujets peuvent inclure, sans s&apos;y limiter :
          </p>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 pb-2">
            {THEMES.map((theme) => (
              <div
                key={theme.category}
                className="border-2 border-[#2d3235] bg-[#efeadd] shadow-[4px_4px_0px_0px_#2d3235] overflow-hidden"
              >
                <div
                  className="h-1 w-full"
                  style={{ backgroundColor: theme.accent }}
                />
                <div className="px-6 pt-5 pb-8">
                  <p className="text-xs font-black uppercase tracking-widest text-[#2d3235] mb-4">
                    {theme.category}
                  </p>
                  <ul className="space-y-2">
                    {theme.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-[#5a5f63] leading-relaxed"
                      >
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0 mt-2"
                          style={{ backgroundColor: theme.accent }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi intervenir */}
      <section className="w-full border-b-2 border-[#2d3235] bg-[#2d3235]">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#efeadd]/40 mb-2">
            Motivations
          </p>
          <h2 className="text-3xl font-black text-[#efeadd] mb-10">
            Pourquoi intervenir ?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 pb-2">
            {[
              {
                n: "01",
                title: "Visibilité & expertise",
                body: "Partagez votre expertise et renforcez votre visibilité au sein de l'écosystème data.",
              },
              {
                n: "02",
                title: "Impact local",
                body: "Contribuez au développement de l'écosystème data à Madagascar.",
              },
              {
                n: "03",
                title: "Transmission",
                body: "Inspirez et accompagnez la prochaine génération de talents data.",
              },
            ].map((item) => (
              <div
                key={item.n}
                className="border-2 border-[#efeadd]/20 px-6 pt-6 pb-10 hover:border-[#1d8f6d] transition-colors shadow-[4px_4px_0px_0px_rgba(29,143,109,0.3)]"
              >
                <span className="text-3xl font-black text-[#1d8f6d] opacity-50 block mb-4">
                  {item.n}
                </span>
                <p className="text-xs font-black uppercase tracking-widest text-[#e8b056] mb-3">
                  {item.title}
                </p>
                <p className="text-[#efeadd]/70 leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appels ouverts */}
      <section className="w-full bg-[#efeadd]">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#5a5f63] mb-2">
            Appels à contributeurs
          </p>
          <h2 className="text-3xl font-black text-[#2d3235] mb-4">
            Sessions ouvertes
          </h2>
          <p className="text-[#5a5f63] leading-relaxed mb-10 max-w-xl text-sm">
            Proposez votre workshop — thématique, format, niveau, cas pratique envisagé —
            et rejoignez l&apos;aventure DataSkills.
          </p>
          <div className="pb-2">
            <DataskillsClient appels={appels ?? []} />
          </div>

          <div className="mt-12 pt-10 border-t-2 border-[#2d3235]">
            <InterventionForm />
          </div>
        </div>
      </section>
    </>
  );
}
