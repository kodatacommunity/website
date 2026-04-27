import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prenom, nom, email, sujet_propose, bio_courte, thematique } = body;

    if (!prenom || !nom || !email || !sujet_propose || !bio_courte) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("dataskills_demandes_intervention").insert({
      prenom,
      nom,
      email,
      sujet_propose,
      bio_courte,
      thematique: thematique || null,
    });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
