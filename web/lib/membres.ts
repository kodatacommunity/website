export type Membre = {
  nom: string;
  prenom: string;
  initiales: string;
  photo: string | null;
  color: string;
  langages: string[];
  linkedin: string | null;
  facebook: string | null;
};

const colors = [
  "bg-[#c24b46]",
  "bg-[#1d8f6d]",
  "bg-[#e8b056]",
  "bg-[#d67035]",
  "bg-[#2d3235]",
];

const tousLangages = [
  ["Python", "SQL"],
  ["R", "Tableau"],
  ["Power BI", "Excel"],
  ["Python", "Machine Learning"],
  ["SQL", "Data Engineering"],
  ["JavaScript", "DataViz"],
  ["Python", "NLP"],
  ["SQL", "Power BI"],
  ["Scala", "Spark"],
  ["Python", "Statistics"],
  ["Excel", "SQL"],
  ["R", "Statistics"],
];

function makeMembre(index: number): Membre {
  return {
    nom: "Nom",
    prenom: "Prénom",
    initiales: "PN",
    photo: null,
    color: colors[index % colors.length],
    langages: tousLangages[index % tousLangages.length],
    linkedin: null,
    facebook: null,
  };
}

export const membres: Membre[] = Array.from({ length: 57 }, (_, i) =>
  makeMembre(i)
);

export const tousLesTags: string[] = Array.from(
  new Set(membres.flatMap((m) => m.langages))
).sort();
