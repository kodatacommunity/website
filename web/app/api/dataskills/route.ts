import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { appel_id, prenom, nom, email, sujet_propose, bio_courte } = body;

  if (!appel_id || !prenom || !nom || !email || !sujet_propose || !bio_courte) {
    return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Vérifier que l'appel est bien ouvert
  const { data: appel } = await supabase
    .from("dataskills_appels")
    .select("id, statut")
    .eq("id", appel_id)
    .eq("statut", "ouvert")
    .single();

  if (!appel) {
    return NextResponse.json({ error: "Cet appel n'est plus disponible." }, { status: 404 });
  }

  const { error } = await supabase.from("dataskills_candidatures").insert({
    appel_id,
    prenom,
    nom,
    email,
    sujet_propose,
    bio_courte,
    statut: "en_attente",
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "Erreur lors de l'enregistrement." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
